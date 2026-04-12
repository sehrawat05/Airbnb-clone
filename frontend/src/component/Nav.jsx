import React from 'react'
import logo from '../assets/logo.png'
import { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdWhatshot } from "react-icons/md";
import { GiVillage } from "react-icons/gi";
import { PiFarm } from "react-icons/pi";
import { MdOutlinePool } from "react-icons/md";
import { MdFamilyRestroom } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { FaBuildingColumns } from "react-icons/fa6";
import { GiWoodCabin } from "react-icons/gi";
import { FaShoppingBag } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';
import { ListingDataContext } from '../context/ListingContext';
import { toast } from "sonner";
const Nav = () => {
    let [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    let { serverUrl } = useContext(authDataContext);
    let { userData, setUserData } = useContext(userDataContext);
    let [cate, setCate] = useState();
    let [input, setInput] = useState("")
    let { handleViewCard, listingData, setListingData, filteredData, setFilteredData, searchData, setSearchData, handleSearch } = useContext(ListingDataContext);
    const handleLogout = async () => {
        try {
            let result = await fetch(`${serverUrl}/api/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            setUserData(null);
            toast.success("Logout successful");
        } catch (error) {

            toast.error(error.response.data.message);
        }
    }

    const handleCategory = (category) => {
        setCate(category);
        if (category === "Trending") {
            setFilteredData(listingData);
        } else {
            const filtered = listingData.filter((list) =>
                list.category && list.category.toLowerCase() === category.toLowerCase()
            );
            setFilteredData(filtered);
        }
    }
    useEffect(() => {
        handleSearch(input)
    }, [input])
    const handleClick = (id) => {
        if (userData)
            handleViewCard(id);
        else navigate("/login");
    }
    return (
        <div className='z-10'>
            <div className='w-full min-h-[80px] bg-slate-200 border-b border-slate-400 flex flex-col md:flex-row items-center justify-between px-4 py-2 gap-4'>

                {/* LOGO */}
                <div className='flex items-center justify-center w-full md:w-auto'>
                    <img src={logo} alt="logo" className='h-12 w-auto' />
                </div>

                {/* SEARCH BAR */}
                <div className='relative w-full md:w-[400px]'>
                    <input
                        type="text"
                        placeholder='Anywhere | Any Location | Any City'
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        className='w-full border-2 border-red-400 rounded-full px-4 py-2 pr-12 text-sm'
                    />

                    <button className='text-white bg-red-400 rounded-full p-2 absolute right-2 top-1/2 transform -translate-y-1/2'>
                        <FaSearch size={16} />
                    </button>
                    {searchData && searchData.length > 0 && (
                        <div className='absolute top-full left-0 w-full mt-2 z-20'>
                            <div className='max-h-[300px] overflow-auto bg-white p-4 rounded-lg border border-gray-300 shadow-lg'>
                                {searchData.map((search, index) => (
                                    <div key={index} className='border-b border-[black] p-[10px] cursor-pointer hover:bg-gray-100' onClick={() => {
                                        handleClick(search._id)
                                    }}>
                                        {search.title} in {search.landmark},{search.city}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT SECTION */}
                <div className='flex items-center justify-end gap-3 w-full md:w-auto relative'>
                    <span onClick={() => navigate("/listingpage1")} className='hidden sm:block text-sm cursor-pointer rounded-md hover:bg-red-500 hover:text-white text-gray-700 px-3 py-1'>
                        List your home
                    </span>

                    {/* MENU BUTTON */}
                    <button
                        className='hover:bg-red-500 hover:text-white p-2 rounded-full'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <GiHamburgerMenu />
                    </button>

                    {/* DROPDOWN */}
                    <div className={`z-10 w-[200px] absolute top-12 right-0 bg-white border rounded-lg shadow-md ${isMenuOpen ? 'block' : 'hidden'}`}>
                        <ul className='p-2 text-sm'>
                            {!userData && <li className='cursor-pointer hover:bg-gray-200 p-2 rounded-md' onClick={() => {
                                setIsMenuOpen(false)
                                navigate('/login')
                            }}>Login</li>
                            }
                            {userData && <li className='cursor-pointer hover:bg-gray-200 p-2 rounded-md' onClick={() => {
                                setIsMenuOpen(false)
                                handleLogout()
                            }}>Logout</li>}
                            <div className='w-full h-[1px] bg-gray-200 my-1'></div>
                            <li className='cursor-pointer hover:bg-gray-200 p-2 rounded-md' onClick={() => {
                                setIsMenuOpen(false)
                                navigate("/listingpage1")
                            }}>List your Home</li>
                            <li className='cursor-pointer hover:bg-gray-200 p-2 rounded-md' onClick={() => {
                                setIsMenuOpen(false)
                                navigate("/mylisting")
                            }}>My Listing</li>
                            <li className='cursor-pointer hover:bg-gray-200 p-2 rounded-md' onClick={() => {
                                setIsMenuOpen(false)
                                // navigate("/checkbooking")
                                navigate("/mybooking")
                            }}>My Booking</li>
                        </ul>

                    </div>


                    {/* PROFILE */}
                    {userData ? (
                        <span className='rounded-full flex items-center justify-center bg-black text-white w-[30px] h-[30px]'>{userData?.name?.charAt(0).toUpperCase()}</span>
                    ) : (
                        <span><CgProfile /></span>
                    )}
                </div>

            </div>

            <div className='w-full flex overflow-x-auto gap-6 px-4 py-3 scrollbar-hide justify-center'>
                {[
                    { icon: <MdWhatshot />, label: "Trending" },
                    { icon: <GiVillage />, label: "Villa" },
                    { icon: <PiFarm />, label: "FarmHouse" },
                    { icon: <MdOutlinePool />, label: "Pool" },
                    { icon: <MdFamilyRestroom />, label: "Rooms" },
                    { icon: <FaBuilding />, label: "Flats" },
                    { icon: <FaBuildingColumns />, label: "PG" },
                    { icon: <GiWoodCabin />, label: "Cabins" },
                    { icon: <FaShoppingBag />, label: "Shops" }
                ].map((item, i) => (
                    <div key={i} className='flex flex-col items-center min-w-[70px] cursor-pointer hover:border-b border-red-500' onClick={() => handleCategory(item.label)}>
                        <div className='text-xl'>{item.icon}</div>
                        <h3 className='text-xs'>{item.label}</h3>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Nav

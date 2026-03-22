import React from 'react'
import logo from '../assets/logo.png'
import { useState } from 'react';
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
const Nav = () => {
    let [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    let { serverUrl } = useContext(authDataContext);
    const handleLogout = async () => {
        try {
            let result = await fetch(`${serverUrl}/api/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className='w-full min-h-[80px] bg-slate-200 border-b-1 border-slate-400  flex items-center justify-between flex-col md:flex-row gap-4'>
                <div className='flex items-center justify-center'><img src={logo} alt="logo" className='h-14 w-auto m-6' /></div>
                <div className='relative'>
                    <input type="text" placeholder='Any Where | Any Location | Any City' className='border-2 border-red-400 rounded-md p-2 m-1 w-96' />
                    <button className='text-white bg-red-400 border border-red-400 rounded-full p-2 absolute right-2 top-1/2 transform -translate-y-1/2'>
                        <FaSearch size={20} />
                    </button>
                </div>
                <div className='flex items-center justify-center gap-4 relative'>
                    <span className='text-md cursor-pointer rounded-md hover:bg-red-500 hover:text-white text-gray-700 p-2'>List your home</span>
                    <button className='hover:bg-red-500 hover:text-white p-2 rounded-full' onClick={() => setIsMenuOpen(!isMenuOpen)}><GiHamburgerMenu /></button>
                    <div className={` w-[220px] h-[250px] absolute top-full right-5 bg-white border-gray-200 border rounded-lg ${isMenuOpen ? 'block' : 'hidden'}`}>
                        <ul className='p-4'>
                            <li className='cursor-pointer hover:bg-gray-200  p-2 rounded-md ' onClick={() => navigate('/login')}>Login</li>
                            <li className='cursor-pointer hover:bg-gray-200  p-2 rounded-md ' onClick={handleLogout}>Logout</li>
                            <div className='w-[100%] h-[1px] bg-gray-200'></div>
                            <li className='cursor-pointer hover:bg-gray-200  p-2 rounded-md '>List your Home</li>
                            <li className='cursor-pointer hover:bg-gray-200  p-2 rounded-md '>My Listing</li>
                            <li className='cursor-pointer hover:bg-gray-200  p-2 rounded-md '>Check Booking</li>
                        </ul>
                    </div>
                    <button className='hover:bg-red-500 hover:text-white p-2 rounded-full'><CgProfile /></button>
                </div>

            </div>
            <div className='w-full min-h-[70px]  border-slate-400 flex items-center justify-center gap-5  px-2 cursor-pointer'>
                <div className='flex flex-col justify-center items-center hover:border-b-1 border-red-500'><MdWhatshot size={25} />
                    <h3 className='text-sm'>Trending</h3></div>
                <div className='flex flex-col justify-center items-center hover:border-b-1 border-red-500'><GiVillage size={25} />
                    <h3 className='text-sm'>Villa</h3></div>
                <div className='flex flex-col justify-center items-center hover:border-b-1 border-red-500'><PiFarm size={25} />
                    <h3 className='text-sm'>Farm House</h3></div>
                <div className='flex flex-col justify-center items-center hover:border-b-1 border-red-500'><MdOutlinePool size={25} />
                    <h3 className='text-sm'>Pool House</h3></div>
                <div className='flex flex-col justify-center items-center hover:border-b-1 border-red-500'><MdFamilyRestroom size={25} />
                    <h3 className='text-sm'>Rooms</h3></div>
                <div className='flex flex-col justify-center items-center hover:border-b-1 border-red-500'><FaBuilding size={25} />
                    <h3 className='text-sm'>Flats</h3></div>
                <div className='flex flex-col justify-center items-center hover:border-b-1 border-red-500'><FaBuildingColumns size={25} />
                    <h3 className='text-sm'>PG</h3></div>
                <div className='flex flex-col justify-center items-center hover:border-b-1 border-red-500'><GiWoodCabin size={25} />
                    <h3 className='text-sm'>Cabins</h3></div>
                <div className='flex flex-col justify-center items-center hover:border-b-1 border-red-500'><FaShoppingBag size={25} />
                    <h3 className='text-sm'>Shops</h3></div>
            </div>

        </div>
    )
}

export default Nav

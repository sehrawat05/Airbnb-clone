import React, { useContext } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { GiFamilyHouse } from 'react-icons/gi'
import { PiFarmFill } from 'react-icons/pi'
import { FaWarehouse } from 'react-icons/fa'
import { MdWarehouse } from 'react-icons/md'
import { GiHouse } from 'react-icons/gi'
import { ImOffice } from 'react-icons/im'
import { CiShop } from 'react-icons/ci'
import { FaPersonSwimming } from 'react-icons/fa6'
import { ListingDataContext } from '../context/ListingContext'

const ListingPage2 = () => {
    const navigate = useNavigate()
    const { category, setCategory } = useContext(ListingDataContext)
    return (
        <div className='w-full min-h-[100vh] bg-white flex items-center justify-center absolute overflow-y-auto'>
            <div className='w-[50px] h-[50px] cursor-pointer absolute top-[10%] left-[5%] ' onClick={() => navigate("/listingpage1")}>
                <FaArrowLeft />
            </div>
            <div className='w-[200px] h-[50px] text-[20px] bg-red-400 text-white flex items-center justify-center rounded-full absolute top-[15px] right-[10px] shadow-lg'>Set Your Category   </div>
            <div className='max-w-[900px] w-[100%] h-[100%] overflow-auto bg-white flex items-center justify-start flex-col gap-[40px] mt-20'><h1 className='text-[24px] font-semibold mb-[20px]'>Which of these best describes your place?</h1>
                <div className='max-w-[900px] w-[90%] h-[550px] flex flex-wrap items-center justify-center  gap-[15px] md:w-[70%] '>
                    <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-gray-300 text-[16px] rounded-lg ${category === "villa" ? "border-gray-300" : ""}`} onClick={() => setCategory("villa")}>
                        <GiFamilyHouse className='w-[30px] h-[30px] text-black' />
                        <h3>House</h3>
                    </div>
                    <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-gray-300 text-[16px] rounded-lg ${category === "farmHouse" ? "border-gray-300" : ""}`} onClick={() => setCategory("farmHouse")}>
                        <PiFarmFill className='w-[30px] h-[30px] text-black' />
                        <h3>Farm House</h3>
                    </div>
                    <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-gray-300 text-[16px] rounded-lg ${category === "rooms" ? "border-gray-300" : ""}`} onClick={() => setCategory("rooms")}>
                        <FaWarehouse className='w-[30px] h-[30px] text-black' />
                        <h3>Rooms</h3>
                    </div>
                    <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-gray-300 text-[16px] rounded-lg ${category === "flat" ? "border-gray-300" : ""}`} onClick={() => setCategory("flat")}>
                        <MdWarehouse className='w-[30px] h-[30px] text-black' />
                        <h3>Flat</h3>
                    </div>
                    <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-gray-300 text-[16px] rounded-lg ${category === "pg" ? "border-gray-300" : ""}`} onClick={() => setCategory("pg")}>
                        <GiHouse className='w-[30px] h-[30px] text-black' />
                        <h3>PG</h3>
                    </div>
                    <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-gray-300 text-[16px] rounded-lg ${category === "cabin" ? "border-gray-300" : ""}`} onClick={() => setCategory("cabin")}>
                        <ImOffice className='w-[30px] h-[30px] text-black' />
                        <h3>Cabin</h3>
                    </div>
                    <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-gray-300 text-[16px] rounded-lg ${category === "shop" ? "border-gray-300" : ""}`} onClick={() => setCategory("shop")}>
                        <CiShop className='w-[30px] h-[30px] text-black' />
                        <h3>Shop</h3>
                    </div>
                    <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-gray-300 text-[16px] rounded-lg ${category === "poolHouse" ? "border-gray-300" : ""}`} onClick={() => setCategory("poolHouse")}>
                        <FaPersonSwimming className='w-[30px] h-[30px] text-black' />
                        <h3>Pool House</h3>
                    </div>
                    <button className='w-[90%] bg-red-500 text-white py-2 rounded-md mt-4' disabled={!category} onClick={() => navigate('/listingpage3')}>Next</button>
                </div>

            </div>
        </div>
    )
}

export default ListingPage2
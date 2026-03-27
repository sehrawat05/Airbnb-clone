import React, { useContext } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ListingDataContext } from '../context/ListingContext'
const ListingPage1 = () => {
    const navigate = useNavigate()
    let {
        title,
        setTitle,
        description,
        setDescription,
        frontEndImage1,
        setFrontEndImage1,
        frontEndImage2,
        setFrontEndImage2,
        frontEndImage3,
        setFrontEndImage3,
        backEndImage1,
        setBackEndImage1,
        backEndImage2,
        setBackEndImage2,
        backEndImage3,
        setBackEndImage3,
        rent,
        setRent,
        city,
        setCity,
        landmark,
        setLandmark,
        category,
        setCategory,
        handleAddListing

    } = useContext(ListingDataContext)

    const handleImage1 = (e) => {
        let file = e.target.files[0];
        setBackEndImage1(file);
        setFrontEndImage1(URL.createObjectURL(file));

    }
    const handleImage2 = (e) => {
        let file = e.target.files[0];
        setBackEndImage2(file);
        setFrontEndImage2(URL.createObjectURL(file));

    }
    const handleImage3 = (e) => {
        let file = e.target.files[0];
        setBackEndImage3(file);
        setFrontEndImage3(URL.createObjectURL(file));

    }
    return (
        <div className='w-full min-h-[100vh] bg-white flex items-center justify-center absolute overflow-y-auto'>
            <form action="" className='max-w-[900px] w-[90%] h-[600px] flex items-center flex-col items-center justify-start overflow-auto md:items-start gap-[10px]' onSubmit={(e) => {
                e.preventDefault()
                navigate("/listingpage2")
            }}>
                <div className='w-[50px] h-[50px] cursor-pointer absolute top-[10%] left-[5%] ' onClick={() => navigate("/")}>
                    <FaArrowLeft />
                </div>
                <div className='w-[200px] h-[50px] text-[20px] bg-red-400 text-white flex items-center justify-center rounded-full absolute top-[15px] right-[10px] shadow-lg'>SetUp Your Home</div>
                <div className='w-full flex items-start justify-start flex-col  gap-[10px] '>
                    <label htmlFor="title" className='text-lg font-semibold'>Title</label>
                    <input type="text" id='title' className='w-[90%] h-[40px] border border-gray-300 rounded-md px-2 required' onChange={(e) => setTitle(e.target.value)} value={title} />
                </div>
                <div className='w-full flex items-start justify-start flex-col  gap-[10px] '>
                    <label htmlFor="des" className='text-lg font-semibold'>Description</label>
                    <textarea name="des" id="des" className='w-[90%] h-[100px] border border-gray-300 rounded-md px-2 required' onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                </div>
                <div className='w-full flex items-start justify-start flex-col  gap-[10px] '>
                    <label htmlFor="image1" className='text-lg font-semibold'>Image 1</label>
                    <input type="file" id='image1' className='w-[90%] border border-gray-300 rounded-md px-2 required text-[15px] px-[10px]' onChange={handleImage1} />
                </div>

                <div className='w-full flex items-start justify-start flex-col  gap-[10px] '>
                    <label htmlFor="image2" className='text-lg font-semibold'>Image 2</label>
                    <input type="file" id='image2' className='w-[90%] border border-gray-300 rounded-md px-2 required text-[15px] px-[10px]' onChange={handleImage2} />
                </div>
                <div className='w-full flex items-start justify-start flex-col  gap-[10px] '>
                    <label htmlFor="image3" className='text-lg font-semibold'>Image 3</label>
                    <input type="file" id='image3' className='w-[90%] border border-gray-300 rounded-md px-2 required text-[15px] px-[10px]' onChange={handleImage3} />
                </div>

                <div className='w-full flex items-start justify-start flex-col  gap-[10px] '>
                    <label htmlFor="rent" className='text-lg font-semibold'>Rent</label>
                    <input type="number" id='rent' className='w-[90%] h-[40px] border border-gray-300 rounded-md px-2 required' onChange={(e) => setRent(e.target.value)} value={rent} />
                </div>

                <div className='w-full flex items-start justify-start flex-col  gap-[10px] '>
                    <label htmlFor="city" className='text-lg font-semibold'>City</label>
                    <input type="text" id='city' className='w-[90%] h-[40px] border border-gray-300 rounded-md px-2 required' onChange={(e) => setCity(e.target.value)} value={city} />
                </div>

                <div className='w-full flex items-start justify-start flex-col  gap-[10px] '>
                    <label htmlFor="landmark" className='text-lg font-semibold'>Landmark</label>
                    <input type="text" id='landmark' className='w-[90%] h-[40px] border border-gray-300 rounded-md px-2 required' onChange={(e) => setLandmark(e.target.value)} value={landmark} />
                </div>

                <button className='w-[90%] bg-red-500 text-white py-2 rounded-md mt-4' type='submit' >Next</button>
            </form>
        </div >
    )
}

export default ListingPage1
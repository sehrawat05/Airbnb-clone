import React, { useContext, useEffect, useState } from 'react'
import { ListingDataContext } from '../context/ListingContext'
import { FaArrowLeft } from 'react-icons/fa'
import { userDataContext } from '../context/UserContext';
import { GiCrossedBones } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
const ViewCard = () => {
    let { cardDetails, updating, handleUpdateListing, handleImage1, handleImage2, handleImage3, deleting, handleDeleteListing } = useContext(ListingDataContext);
    let { userData } = useContext(userDataContext);
    let [updatePopUp, setUpdatePopUp] = useState(false);
    let navigate = useNavigate();
    let [title, setTitle] = useState(cardDetails.title);
    let [description, setDescription] = useState(cardDetails.description);

    let [rent, setRent] = useState(cardDetails.rent);
    let [city, setCity] = useState(cardDetails.city);

    let [landmark, setLandmark] = useState(cardDetails.landmark);

    return (
        <div className='w-[100%] h-[100vh] bg-white flex items-center justify-center gap-[10px] flex-col overflow-auto relative'>
            <div className='w-[50px] h-[50px] cursor-pointer absolute top-[10%] left-[5%] ' onClick={() => navigate("/")}>
                <FaArrowLeft />
            </div>
            <div className='w-[95%] flex items-center justify-start text-[25px] md:w-[80%] mb-[10px]'>
                <h1 className='text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden'>{`In ${cardDetails.landmark.toUpperCase()} , ${cardDetails.city.toUpperCase()}`}</h1>
            </div>
            <div className='w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row'>
                <div className='w-[90%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white'>
                    <img src={cardDetails.image1} alt="" className='w-full' />
                </div>
                <div className='w-[90%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex flex-col items-center justify-center border-[2px] border-white'>
                    <div className='h-1/2'>
                        <img src={cardDetails.image2} alt="" className='w-[100%]' />
                    </div>
                    <div className='h-1/2'>
                        <img src={cardDetails.image3} alt="" className='w-[100%]' />
                    </div>
                </div>

            </div>
            <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]'>{`${cardDetails.title.toUpperCase()} ${cardDetails.category.toUpperCase()} , ${cardDetails.landmark.toUpperCase()}`}</div>
            <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] text-gray-800'>{`${cardDetails.description}`}</div>
            <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]'>Rs.{`${cardDetails.rent}`}/day</div>
            <div>
                {userData._id != cardDetails.host && <button className='w-full p-4 bg-red-500 text-white rounded-md mt-4'>Reserve</button>}
                {userData._id === cardDetails.host && <button className='w-full p-4 bg-red-500 text-white rounded-md mt-4' onClick={() => setUpdatePopUp(true)}>Edit</button>}
            </div >

            {/* Update Listing page */}
            {updatePopUp && <div className='w-[100%] h-[100%] flex items-center justify-center bg-[#000000a9] absolute top-[0px] z-[100] backdrop-blur-sm'>
                <div className='w-[30px] h-[30px] cursor-pointer absolute top-[10%] left-[5%] ' onClick={() => setUpdatePopUp(false)}>
                    <GiCrossedBones />
                </div>
                <form action="" className='p-5 max-w-[900px] w-[90%] h-[600px] flex flex-col items-center justify-start overflow-auto md:items-start gap-[10px] text-white bg-[#272727]' onSubmit={(e) => {
                    e.preventDefault()
                    handleUpdateListing();
                    setUpdatePopUp(false);
                    // navigate("/listingpage2")
                }}>
                    <div className='w-[200px] h-[50px] text-[20px] bg-red-400 text-white flex items-center justify-center rounded-full absolute top-[15px] right-[10px] shadow-lg'>Update Your Details</div>
                    <div className='w-full flex items-start justify-start flex-col  gap-[10px] '>
                        <label htmlFor="title" className='text-lg font-semibold'>Title</label>
                        <input type="text" id='title' className='w-[90%] h-[40px] border border-gray-300 rounded-md px-2 required' placeholder='Enter title' onChange={(e) => setTitle(e.target.value)} value={title} />
                    </div>
                    <div className='w-full flex items-start justify-start flex-col  gap-[10px] '>
                        <label htmlFor="des" className='text-lg font-semibold'>Description</label>
                        <textarea name="des" id="des" className='w-[90%] h-[100px] border border-gray-300 rounded-md px-2 required' placeholder='Enter description' onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                    </div>
                    <div className='w-full flex items-start justify-start flex-col  gap-[10px] '>
                        <label htmlFor="image1" className='text-lg font-semibold'>Image 1</label>
                        <input type="file" id='image1' className='w-[90%] border border-gray-300 rounded-md px-2 required text-[15px] px-[10px]' placeholder='Upload image 1' onChange={handleImage1} />
                    </div>

                    <div className='w-full flex items-start justify-start flex-col  gap-[10px] '>
                        <label htmlFor="image2" className='text-lg font-semibold'>Image 2</label>
                        <input type="file" id='image2' className='w-[90%] border border-gray-300 rounded-md px-2 required text-[15px] px-[10px]' placeholder='Upload image 2' onChange={handleImage2} />
                    </div>
                    <div className='w-full flex items-start justify-start flex-col  gap-[10px] '>
                        <label htmlFor="image3" className='text-lg font-semibold'>Image 3</label>
                        <input type="file" id='image3' className='w-[90%] border border-gray-300 rounded-md px-2 required text-[15px] px-[10px]' placeholder='Upload image 3' onChange={handleImage3} />
                    </div>

                    <div className='w-full flex items-start justify-start flex-col  gap-[10px] '>
                        <label htmlFor="rent" className='text-lg font-semibold'>Rent</label>
                        <input type="number" id='rent' className='w-[90%] h-[40px] border border-gray-300 rounded-md px-2 required' placeholder='Enter rent' onChange={(e) => setRent(e.target.value)} value={rent} />
                    </div>

                    <div className='w-full flex items-start justify-start flex-col  gap-[10px] '>
                        <label htmlFor="city" className='text-lg font-semibold'>City</label>
                        <input type="text" id='city' className='w-[90%] h-[40px] border border-gray-300 rounded-md px-2 required' placeholder='Enter city' onChange={(e) => setCity(e.target.value)} value={city} />
                    </div>

                    <div className='w-full flex items-start justify-start flex-col  gap-[10px] '>
                        <label htmlFor="landmark" className='text-lg font-semibold'>Landmark</label>
                        <input type="text" id='landmark' className='w-[90%] h-[40px] border border-gray-300 rounded-md px-2 required' placeholder='Enter landmark' onChange={(e) => setLandmark(e.target.value)} value={landmark} />
                    </div>

                    <button className='w-[90%] bg-red-500 text-white py-2 rounded-md mt-4' disabled={updating} type='submit' >{updating ? "Updating..." : "Update"}</button>
                    <button className='w-[90%] bg-red-500 text-white py-2 rounded-md mt-4' disabled={deleting} onClick={handleDeleteListing}  >{deleting ? "Deleting" : "Delete"}</button>

                </form>

            </div>}
        </div >
    )
}

export default ViewCard
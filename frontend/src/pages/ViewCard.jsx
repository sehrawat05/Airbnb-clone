import React, { useContext, useEffect, useState } from 'react'
import { ListingDataContext } from '../context/ListingContext'
import { FaArrowLeft, FaStar } from 'react-icons/fa'
import { userDataContext } from '../context/UserContext';
import { GiCrossedBones } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { BookingDataContext } from '../context/BookingContext';
const ViewCard = () => {
    let { cardDetails, updating, handleUpdateListing, handleImage1, handleImage2, handleImage3, deleting, handleDeleteListing } = useContext(ListingDataContext);
    let { userData } = useContext(userDataContext);
    let [updatePopUp, setUpdatePopUp] = useState(false);
    let [bookingPopUp, setBookingPopUp] = useState(false);
    let navigate = useNavigate();
    let [title, setTitle] = useState(cardDetails.title);
    let [description, setDescription] = useState(cardDetails.description);

    let [rent, setRent] = useState(cardDetails.rent);
    let [city, setCity] = useState(cardDetails.city);

    let [landmark, setLandmark] = useState(cardDetails.landmark);
    let [minDate, setMinDate] = useState("");
    let { checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        total,
        setTotal,
        night,
        setNight, handleBooking, booking, setBooking } = useContext(BookingDataContext)

    useEffect(() => {
        if (checkIn && checkOut) {
            let inDate = new Date(checkIn);
            let outDate = new Date(checkOut);
            let n = (outDate - inDate) / (24 * 60 * 60 * 1000);
            setNight(n);
            let airBnbCharge = (cardDetails.rent * (7 / 100));
            let tax = (cardDetails.rent * (7 / 100))

            if (n > 0) {
                setTotal((cardDetails.rent * n) + airBnbCharge + tax);
            } else {
                setTotal(0);
            }
        }
    }, [checkIn, checkOut, cardDetails, rent, total])
    useEffect(() => {
        setMinDate(new Date().toISOString().split('T')[0]);
    }, []);
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
                {userData._id != cardDetails.host && <button className='w-full p-4 bg-red-500 text-white rounded-md mt-4' onClick={() => setBookingPopUp(true)}>Reserve</button>}
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
            {bookingPopUp && (
                <div className='w-full h-full flex items-center justify-center bg-[#000000a9] fixed top-0 left-0 z-[100] backdrop-blur-md p-4'>

                    {/* Close Button */}
                    <div
                        className='w-[35px] h-[35px] flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-md cursor-pointer absolute top-5 left-5 transition'
                        onClick={() => setBookingPopUp(false)}
                    >
                        <GiCrossedBones className='text-[14px]' />
                    </div>

                    {/* Container */}
                    <div className='w-full max-w-[950px] flex flex-col md:flex-row gap-6 items-center justify-center'>

                        {/* Form */}
                        <form className='max-w-[450px] w-full bg-white p-6 rounded-2xl shadow-xl flex flex-col gap-5 border border-gray-200'
                            onSubmit={(e) => {
                                e.preventDefault()
                            }}>

                            <h1 className='text-2xl font-bold text-center border-b pb-2'>
                                Confirm & Book
                            </h1>

                            <div className='w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 flex flex-col gap-5'>

                                <h3 className='text-lg font-semibold text-white'>
                                    Your Trip
                                </h3>

                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="checkIn" className='text-white text-sm font-medium'>
                                        Check-In
                                    </label>
                                    <input
                                        type="date"
                                        id='checkIn'
                                        min={minDate}
                                        className='w-full h-[42px] rounded-lg bg-transparent border border-gray-500 px-3 text-white outline-none focus:border-white focus:ring-1 focus:ring-white/40 transition'
                                        required
                                        onChange={(e) => setCheckIn(e.target.value)}
                                        value={checkIn}
                                    />
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="checkOut" className='text-white text-sm font-medium'>
                                        Check-Out
                                    </label>
                                    <input
                                        type="date"
                                        id='checkOut'
                                        min={minDate}
                                        className='w-full h-[42px] rounded-lg bg-transparent border border-gray-500 px-3 text-white outline-none focus:border-white focus:ring-1 focus:ring-white/40 transition'
                                        required
                                        onChange={(e) => setCheckOut(e.target.value)}
                                        value={checkOut}
                                    />
                                </div>

                            </div>

                            <button
                                type="submit"
                                className='w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 active:scale-[0.98] transition'
                                onClick={() => { handleBooking(cardDetails._id) }}
                                disabled={booking}
                            >
                                {booking ? "Booking..." : "Reserve Now"}
                            </button>

                        </form>

                        {/* Property Card */}
                        <div className='max-w-[450px] w-full bg-white p-6 rounded-2xl shadow-xl flex flex-col gap-5 border border-gray-200'>

                            <div className='w-full border border-[#e5e5e5] rounded-xl flex gap-4 p-4 hover:shadow-md transition'>

                                {/* Image */}
                                <div className='w-[100px] h-[100px] flex-shrink-0'>
                                    <img
                                        src={cardDetails.image1}
                                        alt=""
                                        className='w-full h-full object-cover rounded-lg'
                                    />
                                </div>

                                {/* Text */}
                                <div className='flex flex-col justify-between w-full overflow-hidden'>

                                    <div className='flex flex-col gap-[4px]'>

                                        <h1 className='text-sm text-gray-500 truncate'>
                                            {`IN ${cardDetails.landmark.toUpperCase()}, ${cardDetails.city.toUpperCase()}`}
                                        </h1>

                                        <h1 className='font-semibold text-[16px] truncate text-gray-800'>
                                            {cardDetails.title.toUpperCase()}
                                        </h1>

                                        <h1 className='text-sm text-gray-600 truncate'>
                                            {cardDetails.category.toUpperCase()}
                                        </h1>

                                    </div>

                                    <h1 className='flex items-center gap-[5px] text-sm font-medium text-gray-700'>
                                        <FaStar className='text-[#eb6262]' />
                                        {cardDetails.ratings}
                                    </h1>

                                </div>
                            </div>

                            <div className='w-full border border-[#e5e5e5] rounded-xl p-[20px] flex flex-col gap-[15px]'>
                                <h1 className='text-[22px] font-semibold'>Booking Price -</h1>
                                <p className='w-full flex justify-between items-center px-[20px]'>
                                    <span className='font-semibold'>{`₹ ${cardDetails.rent} X ${night} nights`}</span>
                                    <span>{cardDetails.rent * night}</span>
                                </p>
                                <p className='w-full flex justify-between items-center px-[20px]'>
                                    <span className='font-semibold'>Tax</span>
                                    <span>{cardDetails.rent * 7 / 100}</span>
                                </p>
                                <p className='w-full flex justify-between items-center px-[20px] border-b-[1px] border-gray-500 pb-[10px]'>
                                    <span className='font-semibold'>Airbnb Charge</span>
                                    <span >{cardDetails.rent * 7 / 100}</span>
                                </p>
                                <p className='w-full flex justify-between items-center px-[20px]'>
                                    <span className='font-semibold'>Total Price</span>
                                    <span>{total}</span>
                                </p>
                            </div>

                        </div>

                    </div>
                </div >
            )
            }
        </div >
    )
}

export default ViewCard
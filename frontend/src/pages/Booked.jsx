import React, { useContext, useState } from 'react'
import { GiConfirmed } from 'react-icons/gi'
import Star from '../component/Star'
import { useNavigate } from 'react-router-dom'
import { BookingDataContext } from '../context/BookingContext'
import { authDataContext } from '../context/AuthContext'
import { userDataContext } from '../context/UserContext'
import { ListingDataContext } from '../context/ListingContext'
const Booked = () => {
    let navigate = useNavigate()
    let [star, setStar] = useState(null)
    let { serverUrl } = useContext(authDataContext)
    let { getCurrentUser } = useContext(userDataContext)
    let { getListing, cardDetails } = useContext(ListingDataContext)

    const handleStar = async (value) => {
        setStar(value)
    }
    let { bookingData } = useContext(BookingDataContext)
    const handleRating = async (id) => {
        try {
            let result = await fetch(`${serverUrl}/api/listing/rating/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ratings: star }),
                credentials: "include"
            })
            let data = await result.json()
            await getListing()
            await getCurrentUser()
            navigate("/")
        } catch (error) {
        }
    }
    return (
        <div className='w-[100vw] min-h-[100vh] flex items-center justify-center gap-[30px] bg-slate-200 flex-col'>
            <div className='w-[95%] max-w-[500px] h-[400px] bg-white flex items-center justify-center border-1 border-[#b5b5b5] flex-col gap-[20px] p-[20px] md:w-[80%] rounded-lg'>
                <div className='w-full h-1/2 text-[30px] flex items-center justify-center flex-col gap-[20px] font-bold'><GiConfirmed size={100} className='text-[green]' /> Booking Confirmed</div>
                <div className='w-full flex items-center justify-between text-[16px] md:text-[18px]'>
                    <span className='font-semibold text-xl'>Booking Id: </span><span>{bookingData.booking._id}</span>
                </div>
                <div className='w-full flex items-center justify-between text-[16px] md:text-[18px]'>
                    <span className='font-semibold text-xl'>Owner Details: </span><span>{bookingData.booking.host?.email}</span>
                </div>


                <div className='w-full flex items-center justify-between text-[16px] md:text-[18px]'>
                    <span className='font-semibold text-xl'>Total Rent: </span><span>{bookingData.booking.totalRent}</span>
                </div>
            </div>
            <div className='w-[95%] max-w-[600px] bg-white flex items-center justify-center border-[1px] border-[#b5b5b5] flex-col gap-[20px] p-[20px] md:w-[80%] rounded-lg'>
                <h1>{star} out of 5 Rating</h1>
                <Star onRateChange={handleStar} />
                <button className='px-[30px] py-[10px] bg-red-500 text-white text-xl md:px-[100px] rounded-lg text-nowrap' onClick={() => handleRating(cardDetails._id)}>Submit Rating</button>
            </div>
            <button className='px-[30px] py-[10px] bg-red-500 text-white text-xl md:px-[100px] rounded-lg text-nowrap absolute top-[10px] right-[10px]' onClick={() => {
                navigate("/")
            }}>Back to Home</button>
        </div>
    )
}

export default Booked
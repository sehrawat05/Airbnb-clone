import React from 'react'
import { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import { ListingDataContext } from '../context/ListingContext'
import { useNavigate } from 'react-router-dom'
import { CiStar } from "react-icons/ci";
import { GiConfirmed } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";
import { BookingDataContext } from '../context/BookingContext'
const Card = (props) => {
    let { userData } = useContext(userDataContext);
    let { handleViewCard } = useContext(ListingDataContext);
    let { cancelBooking } = useContext(BookingDataContext)
    let [popUp, setPopUp] = useState(false);
    let navigate = useNavigate();
    const handleClick = () => {
        if (userData)
            handleViewCard(props.id);
        else navigate("/login");
    }
    return (
        <div className=' w-[330px] max-w-[85%] h-[460px] bg-slate-100 flex items-start justify-start flex-col relative rounded-lg cursor-pointer' onClick={() => props.isBooked ? null : handleClick()}>
            {props.isBooked && <div className='text-[green] bg-white rounded-lg absolute flex items-center justify-center right-1 top-1 gap-[5px] p-[5px] font-semibold'><GiConfirmed size={20} />Booked</div>}
            {props.isBooked && props.host == userData?._id && <div className='text-[red] bg-white rounded-lg absolute flex items-center justify-center right-1 top-[50px] gap-[5px] p-[5px] font-semibold' onClick={() => setPopUp(true)}><FcCancel size={20} />Cancel Booking</div>}
            {popUp && <div className='w-[300px] h-[100px] bg-[#ffffffdf] absolute top-[110px] left-[13px] rounded-lg'>
                <div className='w-full h-1/2 text-[#2e2d2d] flex items-start font-bold justify-center rounded-lg overflow-auto text-[20px] p-[10px]'>
                    Booking cancel!</div>
                <div className='w-full h-1/2 text-[18px] font-semibold flex items-start justify-center gap-[10px] text-[#986b6b]'>Are you sure?
                    <button className='px-[20px] bg-[red] text-white rounded-lg hover:bg-slate-600' onClick={() => {
                        setPopUp(false);
                        cancelBooking(props.id);
                    }}>Yes</button>
                    <button className='px-[20px] bg-[green] text-white rounded-lg hover:bg-slate-600' onClick={() => setPopUp(false)}>No</button></div>
            </div>}
            <div className='w-[100%] h-[67%] bg-[#2e2d2d] rounded-lg overflow-auto flex'>
                <img src={props.image1} alt="" className='w-[100%] flex-shrink-0' />
                <img src={props.image2} alt="" className='w-[100%] flex-shrink-0' />
                <img src={props.image3} alt="" className='w-[100%] flex-shrink-0' />
            </div>
            <div className='w-[100%] h-[33%] flex flex-col gap-[2px] py-[20px]'>
                <div>
                    <span className='w-[80%] text-ellipsis overflow-hidden font-semibold text-nowrap text-[#4a3434]'>{`In ${props.landmark.toUpperCase()}, ${props.city.toUpperCase()}`} </span>

                    <span className='flex items-center justify-end pr-[20px] gap-[5px]'><CiStar size={30} fill={"gold"}/>{props.rating}</span> </div>
                <span className='text-[15px] w-[80%] text-ellipsis overflow-hidden text-nowrap'>{props.title} </span>
                <span className='text-[18px] w-[80%] text-ellipsis overflow-hidden text-nowrap'>₹{props.rent}</span>

            </div>
        </div>
    )
}

export default Card
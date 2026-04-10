import React from 'react'
import { useContext } from 'react'
import { userDataContext } from '../context/UserContext'
import { ListingDataContext } from '../context/ListingContext'
import { useNavigate } from 'react-router-dom'
import { CiStar } from "react-icons/ci";
const Card = (props) => {
    let { userData } = useContext(userDataContext);
    let { handleViewCard } = useContext(ListingDataContext);
    let navigate = useNavigate();
    const handleClick = () => {
        if (userData)
            handleViewCard(props.id);
        else navigate("/login");
    }
    return (
        <div className='w-[330px] max-w-[85%] h-[460px] bg-slate-100 flex items-start justify-start flex-col rounded-lg cursor-pointer' onClick={handleClick}>
            <div className='w-[100%] h-[67%] bg-[#2e2d2d] rounded-lg overflow-auto flex'>
                <img src={props.image1} alt="" className='w-[100%] flex-shrink-0' />
                <img src={props.image2} alt="" className='w-[100%] flex-shrink-0' />
                <img src={props.image3} alt="" className='w-[100%] flex-shrink-0' />
            </div>
            <div className='w-[100%] h-[33%] flex flex-col gap-[2px] py-[20px]'>
                <div>
                    <span className='w-[80%] text-ellipsis overflow-hidden font-semibold text-nowrap text-[#4a3434]'>{`In ${props.landmark.toUpperCase()}, ${props.city.toUpperCase()}`} </span>

                    <span className='flex items-center justify-end pr-[20px] gap-[5px]'><CiStar size={30} />{props.ratings}</span> </div>
                <span className='text-[15px] w-[80%] text-ellipsis overflow-hidden text-nowrap'>{props.title} </span>
                <span className='text-[18px] w-[80%] text-ellipsis overflow-hidden text-nowrap'>₹{props.rent}</span>

            </div>
        </div>
    )
}

export default Card
import { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import Card from "../component/Card";

const MyBooking = () => {
    const navigate = useNavigate();
    const { userData } = useContext(userDataContext);

    return (

        <div className='w-[100vw] min-h-[100vh] flex items-center justify-start flex-col gap-[50px] relative'>

            <div className='w-[50px] h-[50px] cursor-pointer absolute top-[10%] left-[5%] ' onClick={() => navigate("/")}>

                <FaArrowLeft />

            </div>

            <div className="w-[50%] h-[10%] border-[2px] border-[#908c8c] p-[15px] flex items-center justify-center text-[30px] rounded-md text-[#613b3b] font-semibold mt-[20px] md:w-[600px]">MY BOOKINGS</div>

            <div className="w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]">
                {userData.booking.map((booking) => (
                    <Card
                        key={booking._id}
                        id={booking.listing._id}
                        title={booking.listing.title}
                        landmark={booking.listing.landmark}
                        city={booking.listing.city}
                        image1={booking.listing.image1}
                        image2={booking.listing.image2}
                        image3={booking.listing.image3}
                        rent={booking.listing.rent}
                        isBooked={booking.listing.isBooked}
                        host={booking.listing.host}
                        ratings={booking.listing.ratings}
                    />
                ))}

            </div>

        </div>

    )

}

export default MyBooking
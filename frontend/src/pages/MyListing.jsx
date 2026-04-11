import { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import Card from "../component/Card";


const MyListing = () => {

    const navigate = useNavigate();
    const { userData } = useContext(userDataContext);

    return (

        <div className='w-[100vw] min-h-[100vh] flex items-center justify-start flex-col gap-[50px] relative'>

            <div className='w-[50px] h-[50px] cursor-pointer absolute top-[10%] left-[5%] ' onClick={() => navigate("/")}>

                <FaArrowLeft />

            </div>

            <div className="w-[50%] h-[10%] border-[2px] border-[#908c8c] p-[15px] flex items-center justify-center text-[30px] rounded-md text-[#613b3b] font-semibold mt-[20px] md:w-[600px]">MY LISTING</div>

            <div className="w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]">
                <div className='w-[100vw] h-[77vh] flex items-center justify-center gap-[15px] flex-wrap mt-[25px] md:mt-[18px]'>
                    {userData.listing.map((listing) => (
                        <Card
                            key={listing._id}
                            id={listing._id}
                            title={listing.title}
                            landmark={listing.landmark}
                            city={listing.city}
                            image1={listing.image1}
                            image2={listing.image2}
                            image3={listing.image3}
                            rent={listing.rent}
                            isBooked={listing.isBooked}
                            host={listing.host}
                            ratings={listing.ratings}
                        />
                    ))}

                </div>

            </div>

        </div>

    )

}



export default MyListing
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { authDataContext } from '../context/AuthContext';
import Card from '../component/Card';

const MyListing = () => {
    const navigate = useNavigate();
    const [myListings, setMyListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { serverUrl } = useContext(authDataContext);

    const getMyListings = async () => {
        try {
            const response = await fetch(`${serverUrl}/api/listing/mylistings`, {
                method: "GET",
                credentials: "include"
            });
            const data = await response.json();
            if (data.success) {
                setMyListings(data.listings);
            }
        } catch (error) {
            console.log("Error fetching listings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMyListings();
    }, []);

    return (
        <div className='w-[100vw] min-h-[100vh] flex items-center justify-start flex-col gap-[50px] relative'>
            <div className='w-[50px] h-[50px] cursor-pointer absolute top-[10%] left-[5%] ' onClick={() => navigate("/")}>
                <FaArrowLeft />
            </div>
            <div className="w-[50%] h-[10%] border-[2px] border-[#908c8c] p-[15px] flex items-center justify-center text-[30px] rounded-md text-[#613b3b] font-semibold mt-[20px] md:w-[600px]">MY LISTING</div>
            <div className="w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]">
                {loading ? (
                    <div>Loading your listings...</div>
                ) : myListings.length === 0 ? (
                    <div className="text-gray-500 text-xl">You haven't created any listings yet</div>
                ) : (
                    myListings.map((listing) => (
                        <Card
                            key={listing._id}
                            title={listing.title}
                            landmark={listing.landmark}
                            city={listing.city}
                            image1={listing.image1}
                            image2={listing.image2}
                            image3={listing.image3}
                            rent={listing.rent}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default MyListing;
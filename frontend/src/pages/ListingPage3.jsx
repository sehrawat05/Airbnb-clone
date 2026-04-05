import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ListingDataContext } from '../context/ListingContext'
const ListingPage3 = () => {
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
        handleAddListing,
        adding,
        setAdding

    } = useContext(ListingDataContext)
    const navigate = useNavigate()
    return (
        <div className='w-[100%] h-[100vh] bg-white flex items-center justify-center gap-[10px] flex-col overflow-auto relative'>
            <div className='w-[50px] h-[50px] cursor-pointer absolute top-[10%] left-[5%] ' onClick={() => navigate("/listingpage2")}>
                <FaArrowLeft />
            </div>
            <div className='w-[95%] flex items-center justify-start text-[25px] md:w-[80%] mb-[10px]'>
                <h1 className='text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden'>{`In ${landmark.toUpperCase()} , ${city.toUpperCase()}`}</h1>
            </div>
            <div className='w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row'>
                <div className='w-[90%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white'>
                    <img src={frontEndImage1} alt="" className='w-full' />
                </div>
                <div className='w-[90%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex flex-col items-center justify-center border-[2px] border-white'>
                    <div className='h-1/2'>
                        <img src={frontEndImage2} alt="" className='w-[100%]' />
                    </div>
                    <div className='h-1/2'>
                        <img src={frontEndImage3} alt="" className='w-[100%]' />
                    </div>
                </div>

            </div>
            <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]'>{`${title.toUpperCase()} ${category.toUpperCase()} , ${landmark.toUpperCase()}`}</div>
            <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] text-gray-800'>{`${description}`}</div>
            <div className='w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]'>Rs.{`${rent}`}/day</div>
            <div>
                <button className='w-full p-4 bg-red-500 text-white rounded-md mt-4' disabled={adding} onClick={handleAddListing}>{adding ? "Adding..." : "Add Listing"}</button>
            </div>
        </div>
    )
}

export default ListingPage3

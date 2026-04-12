import { createContext, useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from './AuthContext'
import { userDataContext } from './UserContext';
import { ListingDataContext } from './ListingContext';
import { useNavigate } from 'react-router-dom';

import { toast } from "sonner";
export const BookingDataContext = createContext()
function BookingContext({ children }) {
    let { serverUrl } = useContext(authDataContext);
    let { getCurrentUser } = useContext(userDataContext);
    let { getListing, cardDetails } = useContext(ListingDataContext)
    let [checkIn, setCheckIn] = useState("")
    let [checkOut, setCheckOut] = useState("")
    let [total, setTotal] = useState(0)
    let [night, setNight] = useState(0)
    let [bookingData, setBookingData] = useState([])
    let [booking, setBooking] = useState(false)
    let navigate = useNavigate()
    const handleBooking = async () => {
        setBooking(true)
        try {
            let result = await fetch(`${serverUrl}/api/booking/create/${cardDetails._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    checkIn,
                    checkOut,
                    totalRent: total,

                }),
                credentials: "include"
            })
            await getCurrentUser()
            await getListing()
            let data = await result.json()

            setBookingData(data)

            navigate("/booked")
            toast.success("Booking created successfully")
        } catch (error) {

            setBookingData(null);
            toast.error(error.response.data.message)
        }
        setBooking(false)
    }
    const cancelBooking = async (id) => {
        try {
            let result = await fetch(`${serverUrl}/api/booking/cancel/${id}`, {
                method: "DELETE",
                credentials: "include"
            })
            let data = await result.json()

            await getCurrentUser()
            await getListing()
            toast.success("Booking cancelled successfully")
        } catch (error) {


            toast.error(error.response.data.message)
        }
    }
    let value = {
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        total,
        setTotal,
        night,
        setNight,
        handleBooking,
        bookingData,
        setBookingData,
        cancelBooking,
        booking,
        setBooking,
    }
    return (
        <BookingDataContext.Provider value={value}>
            {children}
        </BookingDataContext.Provider>
    )
}
export default BookingContext
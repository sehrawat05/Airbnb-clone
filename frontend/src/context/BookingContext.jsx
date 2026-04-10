import { createContext, useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from './AuthContext'
import { userDataContext } from './UserContext';
import { ListingDataContext } from './ListingContext';


export const BookingDataContext = createContext()
function BookingContext({ children }) {
    let { serverUrl } = useContext(authDataContext);
    let { getCurrentUser } = useContext(userDataContext);
    let { getListing } = useContext(ListingDataContext)
    let [checkIn, setCheckIn] = useState("")
    let [checkOut, setCheckOut] = useState("")
    let [total, setTotal] = useState(0)
    let [night, setNight] = useState(0)
    let [bookingData, setBookingData] = useState([])
    const handleBooking = async () => {
        try {
            let result = await fetch(`${serverUrl}/api/booking/create`, {
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

            let data = await result.json()
            await getListing()
            setBookingData(data)
            console.log(data)
        } catch (error) {
            console.log(error)
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
    }
    return (
        <BookingDataContext.Provider value={value}>
            {children}
        </BookingDataContext.Provider>
    )
}
export default BookingContext
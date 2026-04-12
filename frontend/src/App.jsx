
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ListingPage1 from './pages/ListingPage1'
import ListingPage2 from './pages/ListingPage2'
import ListingPage3 from './pages/ListingPage3'
import { useContext } from 'react'
import { userDataContext } from './context/UserContext'
import MyListing from './pages/MyListing'
import { Navigate } from 'react-router-dom'
import ViewCard from './pages/ViewCard'
import MyBooking from './pages/MyBooking'
import Booked from './pages/Booked'
import { Toaster } from "sonner";
const App = () => {
  const { userData } = useContext(userDataContext)
  return (
    <>
 <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/listingpage1" element={userData ? <ListingPage1 /> : <Navigate to={"/"} />} />
        <Route path="/listingpage2" element={userData ? <ListingPage2 /> : <Navigate to={"/"} />} />
        <Route path="/listingpage3" element={userData ? <ListingPage3 /> : <Navigate to={"/"} />} />
        <Route path="/mylisting" element={userData ? <MyListing /> : <Navigate to={"/"} />} />
        <Route path="/viewcard" element={userData ? <ViewCard /> : <Navigate to={"/"} />} />
        <Route path="/mybooking" element={userData ? <MyBooking /> : <Navigate to={"/"} />} />
        <Route path='/booked' element={userData ? <Booked /> : <Navigate to={"/booked"} />} />
      </Routes>
    </>
  )
}

export default App
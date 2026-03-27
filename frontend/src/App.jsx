
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

const App = () => {
  const { userData } = useContext(userDataContext)
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/listingpage1" element={userData ? <ListingPage1 /> : <Login />} />
        <Route path="/listingpage2" element={userData ? <ListingPage2 /> : <Login />} />
        <Route path="/listingpage3" element={userData ? <ListingPage3 /> : <Login />} />
      </Routes>
    </>
  )
}

export default App
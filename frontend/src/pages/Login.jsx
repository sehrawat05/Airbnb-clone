import React from 'react'
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let { userData, setUserData, getCurrentUser } = useContext(userDataContext);
    let { serverUrl, loading, setLoading } = useContext(authDataContext);
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            let result = await fetch(`${serverUrl}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                }),
                credentials: "include"
            })
            console.log(result);
            const data = await result.json();
            console.log(data);
            if (result.ok) {
                setLoading(true);
                await getCurrentUser();
                setLoading(false);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className='w-[100vw] h-[100vh] flex items-center justify-center relative'>
            <div className='w-[50px] h-[50px] cursor-pointer absolute top-[10%] left-[5%] ' onClick={() => navigate("/")}>
                <FaArrowLeft />
            </div>
            <form action="" className='max-w-[900px] w-[90%] h-[600px] flex items-center flex-col items-center justify-center md:items-start gap-[10px]'>
                <h1 className='text-2xl font-bold'>Welcome to Airbnb</h1>

                <div className='w-full flex items-start justify-start flex-col  gap-[10px] '>
                    <label htmlFor="email" className='text-lg font-semibold'>Email</label>
                    <input type="email" id='email' className='w-[90%] h-[40px] border border-gray-300 rounded-md px-2' onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className='w-full flex items-start justify-start flex-col gap-[10px]'>
                    <label htmlFor="password" className='text-lg font-semibold'>Password</label>
                    <div className='relative w-[90%]'>
                        <input type={showPassword ? "text" : "password"} id='password' className='w-full h-[40px] border border-gray-300 rounded-md px-2 ' value={password} onChange={(e) => setPassword(e.target.value)} />
                        {showPassword ? (
                            <FaEyeSlash onClick={() => setShowPassword(false)} className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500" />
                        ) : (
                            <FaEye onClick={() => setShowPassword(true)} className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500" />
                        )}

                    </div>
                </div>
                <button className='w-[90%] bg-red-500 text-white py-2 rounded-md mt-4' onClick={handleLogin} disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
                <p>Don't have an account? <a href="/signup" className='text-red-500'>Sign Up</a></p>
            </form>
        </div >
    )
}

export default Login
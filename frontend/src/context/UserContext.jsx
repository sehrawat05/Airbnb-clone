import { createContext, useContext, useEffect } from 'react'
import { authDataContext } from './AuthContext';
import { useState } from 'react';
export const userDataContext = createContext();
const UserContext = ({ children }) => {
    let { serverUrl } = useContext(authDataContext);
    let [userData, setUserData] = useState(null);
    const getCurrentUser = async () => {
        try {

            let result = await fetch(`${serverUrl}/api/users/currentuser`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            let data = await result.json()
            setUserData(data)
        } catch (error) {
            setUserData(null);
        }
    }
    useEffect(() => {
        getCurrentUser();
    }, []);

    let value = { userData, setUserData, getCurrentUser }
    return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    )
}

export default UserContext
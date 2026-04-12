
import { createContext, useState } from 'react';
export const authDataContext = createContext();
const AuthContext = ({ children }) => {
    let serverUrl = "https://airbnb-clone-backend-piyb.onrender.com";
    let [loading, setLoading] = useState(false);
    let value = { serverUrl, loading, setLoading }
    return (
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    )
}

export default AuthContext

import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect (() => {
        const stored = localStorage.getItem('user');
        if(stored) setUser(JSON.parse(stored));
        setIsLoading(false);
    }, []);

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    }

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    }

    return(
        <UserContext.Provider value={{user,login,logout, isLoading }}>
            {children}
        </UserContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);

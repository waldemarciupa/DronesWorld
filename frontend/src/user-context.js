import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export const ContextWrapper = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const user = {
        isLoggedIn,
        setIsLoggedIn
    }

    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    )
}
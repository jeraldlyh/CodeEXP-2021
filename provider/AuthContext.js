import React, { useState, createContext } from "react"

export const AuthContext = createContext()

function AuthContextProvider(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState("");
    const [username, setUsername] = useState("");
    const [avatar, setAvatar] = useState("");

    return (
        <AuthContext.Provider value={{
            isLoading, setIsLoggedIn, 
            isLoggedIn,
            username, setUsername,
            avatar, setAvatar
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
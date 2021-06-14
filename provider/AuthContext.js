import React, { useState, createContext } from "react"

export const AuthContext = createContext()

function AuthContextProvider(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState("")

    return (
        <AuthContext.Provider value={{
            isLoading, setIsLoggedIn, isLoggedIn
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
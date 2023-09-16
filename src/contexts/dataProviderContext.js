import io from 'socket.io-client'
import { loggedInUser } from 'apis/auth.api'
// import { getCartByUserId } from 'apis/cart.api'
import { getStorage, removeStorage, setStorage } from 'apis/loadStorage'
import { getCurrentLocation } from 'apis/location'
import React, { createContext, useEffect, useRef, useState } from 'react'
// import generateUniqueId from 'helpers/generateUniqueId'

export const ContextData = createContext()

export const ContextProvider = ({ children }) => {
    const socket = useRef()
    const [currentlyLoggedIn, setCurrentlyLoggedIn] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState(0)
    const [token, setToken] = useState(null)

    // Search Term amd Filter
    const [searchTerm, setSearchTerm] = useState('')
    const [category, setCategory] = useState([])
    const [type, setType] = useState([])
    const [style, setStyle] = useState([])
    const [fabric, setFabric] = useState([])
    const [value, setValue] = useState([0, 1000])
    const [cartUpdate, setCartUpdate] = useState('')


    useEffect(() => {
        const retrieveUser = async () => {
            // const location = await getCurrentLocation()
            // setLocation(location?.data)
            // if (location?.data?.country === 'United Arab Emirates') {
            //     setFromCurrency('AED')
            //     setToCurrency('AED')
            // } else {
            //     setFromCurrency('AED')
            //     setToCurrency('USD')
            // }

            const token = await getStorage('accessToken')
            // if token is expired then take refreshToken from cookie
            setToken(token)

            if (token) {
                const user = await loggedInUser(token)
                console.log('user', user);
                // !user clear local storage
                // if (!user) removeStorage('role')
                setCurrentlyLoggedIn(user?.data)

            } else {
                setCurrentlyLoggedIn(null)
            }
        }
        retrieveUser()
    }, [])


    const contextValues = {
        token,
        currentlyLoggedIn,
        setToken,
    }

    return (
        <ContextData.Provider value={contextValues}>
            {children}
        </ContextData.Provider>
    )
}

import {createContext, useContext, useState} from "react";
import React from "react";


const Context = createContext(null)


export const StateContext = ({children})=> {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState()
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState()
    const [qty, setQty] = useState(1)


    const incQty = () => {
        setQty(qty +1)
    }
    const decQty = () => {
        if(qty - 1 < 1) return 1
        setQty(qty -1)
    }
    const changeTotalPrice = (price) => {
        setTotalPrice(price * qty)
    }
    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                changeTotalPrice
            }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)
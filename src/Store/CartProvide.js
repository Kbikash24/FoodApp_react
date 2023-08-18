
import React, { useState } from "react";
import CartContext from "./CartContext";

const CartProvider = (props) => {
    const [cartItems, setCartItems] = useState([]);
    const [itemQuantities, setItemQuantities] = useState({});
    
    const addItemToCartHandler = (item) => {

        const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
        if (existingItemIndex !== -1) {
            // If the item exists, update its quantity
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].amount += item.amount;
            setCartItems(updatedCartItems);
        }
else{
        setCartItems((prevItems) => [...prevItems, item]);
}
    };

    const removeItemFromCartHandler = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
        setItemQuantities((prevQuantities) => {
            const updatedQuantities = { ...prevQuantities };
            delete updatedQuantities[id];
            return updatedQuantities;
        });
    };
    const incrementItemAmount = (id) => {
        const updatedCartItems = [...cartItems];
        const itemIndex = updatedCartItems.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
            updatedCartItems[itemIndex].amount += 1;
            setCartItems(updatedCartItems);
        }
    };
    const decrementItemAmount = (id) => {
        const updatedCartItems = [...cartItems];
        const itemIndex = updatedCartItems.findIndex((item) => item.id === id);
        
        if (itemIndex !== -1) {
            if (updatedCartItems[itemIndex].amount === 1) {
                // If the amount reaches 1, remove the item
                updatedCartItems.splice(itemIndex, 1);
            } else {
                // Decrement the amount if it's greater than 1
                updatedCartItems[itemIndex].amount -= 1;
            }
            
            setCartItems(updatedCartItems);
        }
    };
    
    

    const getTotalItems = () => {
        return Object.values(itemQuantities).reduce((total, quantity) => total + quantity, 0);
    };

    const cartContext = {
        items: cartItems,
        itemQuantities: itemQuantities,
        totalItems: getTotalItems(),
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        addamount:incrementItemAmount,
        removeamount:decrementItemAmount
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;

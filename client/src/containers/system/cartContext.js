// CartContext.js
import React, { createContext, useState, useContext } from 'react';

const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState();

  const addToCart = (number) => {
    setCart(number);
  };

  const [cartp, setCartp] = useState([]);
  const addToCartp = (list) => {
    setCartp([...list]);
  };

  return (
    <cartContext.Provider value={{ cart, addToCart, cartp, addToCartp }}>
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => useContext(cartContext);

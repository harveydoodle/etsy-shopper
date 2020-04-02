import React, {createContext, useState, useCallback} from 'react';
import {findIndex} from 'lodash';

const initialCart = [];

export const CartContext = createContext({});

export const CartProvider = ({children}) => {
  const [cart, updateCart] = useState(initialCart);

  const update = useCallback((args = [], cb) => {
    const {listing_id} = args[0];
    const existsInCart = findIndex(cart, {listing_id}) > -1;
    if (existsInCart) {
      add(listing_id);
    } else {
      const newCart = cart.concat(args);
      updateCart(newCart);
      cb && cb();
    }
  });
  const add = useCallback((listing_id, cb) => {
    const newCart = [...cart];
    const index = findIndex(cart, {listing_id});
    const matchedItem = cart[index];
    matchedItem.quantity++;
    newCart.splice(index, 1, matchedItem);
    updateCart(newCart);
    cb && cb();
  });
  const subtract = useCallback((listing_id, cb) => {
    const newCart = [...cart];
    const index = findIndex(cart, {listing_id});
    const matchedItem = cart[index];
    if (matchedItem.quantity === 1) {
      newCart.splice(index, 1);
    } else {
      matchedItem.quantity--;
      newCart.splice(index, 1, matchedItem);
    }
    updateCart(newCart);
    cb && cb();
  });

  return (
    <CartContext.Provider
      value={{
        update,
        add,
        subtract,
        cart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

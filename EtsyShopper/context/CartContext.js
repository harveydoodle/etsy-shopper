import React, {createContext, useState, useCallback} from 'react';

const initialCart = [];

export const CartContext = createContext({});

export const CartProvider = ({children}) => {
  const [cart, updateCart] = useState(initialCart);

  const update = useCallback((args, cb) => {
    const newCart = cart.concat(args);
    updateCart(newCart);
    cb && cb();
  });

  return (
    <CartContext.Provider
      value={{
        update,
        cart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

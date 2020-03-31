import React, {createContext, useState, useCallback} from 'react';

const initialCart = {};

export const CartContext = createContext({});

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState(initialCart);

  const set = useCallback((args, cb) => {
    setCart({...cart, ...args});
    cb && cb();
  });

  return (
    <CartContext.Provider
      value={{
        set,
        cart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

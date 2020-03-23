import React, {createContext, useState, useCallback} from 'react';

const initialLocation = {};

export const LocationContext = createContext({});

export const LocationProvider = ({children}) => {
  const [location, setLocation] = useState(initialLocation);

  const set = useCallback((args, cb) => {
    setLocation({...location, ...args});
    cb && cb();
  });

  return (
    <LocationContext.Provider
      value={{
        set,
        location,
      }}>
      {children}
    </LocationContext.Provider>
  );
};

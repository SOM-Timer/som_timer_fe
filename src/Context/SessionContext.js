import React, { createContext, useState } from 'react'

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({
    focusInterval: null, 
    mood1Rating: null,
    contentSelected: null,
    restInterval: null,
    mood2Rating: null,
  })

  return (
    <SessionContext.Provider value={[ session, setSession ]}>
      {children}
    </SessionContext.Provider>
  )
}
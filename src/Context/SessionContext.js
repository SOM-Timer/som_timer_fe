import React, { createContext, useState } from 'react'

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({
    focusInterval: null, 
    moodRating1: null,
    contentSelected: null,
    restInterval: null,
    moodRating2: null,
  })

  return (
    <SessionContext.Provider value={[ session, setSession ]}>
      {children}
    </SessionContext.Provider>
  )
}
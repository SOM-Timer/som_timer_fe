import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ userName: '', token: '' })
  
  return (
    <UserContext.Provider value={[ user, setUser ]} >
      {children}
    </UserContext.Provider>
  )
}

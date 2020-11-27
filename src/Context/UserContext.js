import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ userName: '', email: '', userId: null })

  useEffect(() => {
    const credentials = JSON.parse(localStorage.getItem('somTimerUser'))
    if (credentials) {
      setUser({
        userName: credentials.userName,
        email: credentials.email,
        userId: credentials.userId
      })
    }
  }, [])
  
  return (
    <UserContext.Provider value={[ user, setUser ]} >
      {children}
    </UserContext.Provider>
  )
}

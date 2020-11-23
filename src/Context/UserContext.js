import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ userName: '', token: '', userId: null })

  useEffect(() => {
    const credentials = JSON.parse(localStorage.getItem('somTimerUser'))
    if (credentials) {
      setUser({
        ...user,
        userName: credentials.userName,
        token: credentials.token,
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

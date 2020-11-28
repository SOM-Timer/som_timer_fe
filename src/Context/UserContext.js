import React, { createContext, useState, useEffect, useContext } from 'react'
import { SettingsContext } from '../Context/SettingsContext'
import { getSettings } from '../apiCalls'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ userName: '', email: '', userId: null })
  const setSettings = useContext(SettingsContext)[1]

  useEffect(() => {
    const credentials = JSON.parse(localStorage.getItem('somTimerUser'))
    if (credentials) {
      setUser({
        userName: credentials.userName,
        email: credentials.email,
        userId: credentials.userId
      })
      getSettings(credentials.userId)
      .then(response => {
        if (response.data.work_interval) {
          const workInterval = response.data.work_interval.split(':')[0]
          const breakInterval = response.data.rest_interval.split(':')[0]
          const sound = response.data.sound
          const moodRating = response.data.mood
          setSettings({ workInterval, breakInterval, sound, moodRating })
        } 
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.status)
        }
      })
    }
  }, [])
  
  return (
    <UserContext.Provider value={[ user, setUser ]} >
      {children}
    </UserContext.Provider>
  )
}

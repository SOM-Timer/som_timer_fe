import React, { createContext, useState, useEffect } from 'react'
import { getSettings } from '../apiCalls'

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [ settings, setSettings ] = useState({ workInterval: 25, breakInterval: 5, sound: 'chordCliff' })

  useEffect(() => {
    getSettings()
      .then(response => {
        const workInterval = +response.data.work_interval.split(':')[0]
        const breakInterval = +response.data.rest_interval.split(':')[0]
        const sound = response.data.sound
        setSettings({ workInterval, breakInterval, sound})
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.status)
        }
      })
  }, [])

  return (
    <SettingsContext.Provider value={[ settings, setSettings ]}>
      {children}
    </SettingsContext.Provider>
  )
}
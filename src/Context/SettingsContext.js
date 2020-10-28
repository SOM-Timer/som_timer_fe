import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({ workInterval: 12, breakInterval: 7 })

    useEffect(() => {
        axios.get('https://som-timer-be.herokuapp.com/api/timers/1')
            .then(response => {
                const workInterval = +response.data.work_interval.split(':')[0]
                const breakInterval = +response.data.rest_interval.split(':')[0]
                setSettings({ workInterval: [workInterval], breakInterval: [breakInterval] })
            })
            .catch(err => console.log(err))
    }, [])
  

    return(
        <SettingsContext.Provider value={[ settings, setSettings]}>
            {children}
        </SettingsContext.Provider>
    )
}
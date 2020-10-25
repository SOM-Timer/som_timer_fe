import React, { createContext, useState } from 'react'

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({ work: 25, break: 5 })

    return(
        <SettingsContext.Provider value={[ settings, setSettings]}>
            {children}
        </SettingsContext.Provider>
    )
}
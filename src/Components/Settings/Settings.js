import React, { useContext } from 'react';
import style from './Settings.module.scss'
import { SettingsContext } from '../../Context/SettingsContext'

const Settings = () => {
    const [ settings, setSettings ] = useContext(SettingsContext)
    
    const onChange = (event) => {
        setSettings({ 
            ...settings, 
            [event.target.id]: +event.target.value
        })
    }

    return (
        <div className={style.settingsContainer}>
            <h1 className={style.settingsHeader}>Settings</h1>
            <p>Currently, you are set to work for {settings.workInterval} minutes and then take a {settings.breakInterval} minute break</p>
            <div className={style.intervalContainer}>
                <p className={style.intervalLabel}>Select your work interval:</p>
                {<input 
                    type='number' 
                    min={0} 
                    max={240} 
                    id='workInterval' 
                    placeholder={settings.workInterval} 
                    onChange={onChange}
                    className={style.minutesInput}
                />}
                <p>minutes</p>
            </div>
            <div className={style.intervalContainer}>
                <p className={style.intervalLabel}>Select your break interval:</p>
                <select 
                    onChange={onChange}
                    className={style.breakIntervalDropdown} 
                    name='Break' 
                    id='breakInterval' 
                    data-testid='breakInterval'
                >
                    <option value={5}>5</option>
                    <option value={7}>7</option>
                    <option value={10}>10</option>
                </select>
                <p>minutes</p>
            </div>
        </div>
    )
}

export default Settings
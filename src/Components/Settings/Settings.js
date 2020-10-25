import React, { useContext } from 'react';
import style from './Settings.module.scss'
import { SettingsContext } from '../../Context/SettingsContext'

const Settings = () => {
    const [ settings, setSettings ] = useContext(SettingsContext)
    
    const onChange = (event) => {
        setSettings({ 
            ...settings, 
            [event.target.id]: event.target.value
        })
    }

    return (
        <div className={style.settingsContainer}>
            <h1 className={style.settingsHeader}>Settings</h1>
            <p>Currently, you are set to work for {settings.work} minutes and then take a {settings.break} minute break</p>
            <div className={style.intervalContainer}>
                <p className={style.intervalLabel}>Select your work interval:</p>
                <select 
                    onChange={onChange}
                    className={style.intervalDropdown} 
                    name='Work' 
                    id='work' 
                    data-testid='workInterval'
                >
                    <option value={25}>25</option>
                    <option value={30}>30</option>
                    <option value={45}>45</option>
                    <option value={60}>60</option>
                </select>
            </div>
            <div className={style.intervalContainer}>
                <p className={style.intervalLabel}>Select your break interval:</p>
                <select 
                    onChange={onChange}
                    className={style.intervalDropdown} 
                    name='Break' 
                    id='break' 
                    data-testid='breakInterval'
                >
                    <option value={5}>5</option>
                    <option value={7}>7</option>
                    <option value={10}>10</option>
                </select>
            </div>
        </div>
    )
}

export default Settings
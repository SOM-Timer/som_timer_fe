import React from 'react';
import style from './Settings.module.scss'

const Settings = () => {
    return(
        <div className={style.settingsContainer}>
            <h1 className={style.settingsHeader}>Settings</h1>
            <div className={style.intervalContainer}>
                <p className={style.intervalLabel}>Select your work interval:</p>
                <select className={style.intervalDropdown} name='Work' data-testid='workInterval'>
                    <option value={25}>25</option>
                    <option value={30}>30</option>
                    <option value={45}>45</option>
                    <option value={60}>60</option>
                </select>
            </div>
            <div className={style.intervalContainer}>
                <p className={style.intervalLabel}>Select your break interval:</p>
                <select className={style.intervalDropdown} name='Break' data-testid='breakInterval'>
                    <option value={5}>5</option>
                    <option value={7}>7</option>
                    <option value={10}>10</option>
                </select>
            </div>
        </div>
    )
}

export default Settings
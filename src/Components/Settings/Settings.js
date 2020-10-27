import React, { useContext } from 'react'
import style from './Settings.module.scss'
import { SettingsContext } from '../../Context/SettingsContext'

const Settings = () => {
  const [settings, setSettings] = useContext(SettingsContext)

  const onChange = (event) => {
    setSettings({
      ...settings,
      [event.target.id]: +event.target.value
    })
  }

  return (
    <div className={style.settingsContainer}>
      <h2 className={style.settingsHeader}>Settings</h2>
      <div className={style.intervalContainer}>
        <p className={style.intervalLabel}>Select your work interval:</p>
        <input
          type='number'
          min={0}
          max={240}
          id='workInterval'
          placeholder={settings.workInterval}
          onChange={onChange}
          className={style.minutesInput}
          data-testid='workInterval'
        />
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
      <p className={style.saveAutomatically}>✨ Settings will save automagically ✨</p>
    </div>
  )
}

export default Settings
import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { SettingsContext } from '../../Context/SettingsContext'
import { updateSettings } from '../../apiCalls'
import { playAlertSound } from '../../helpers/audioHelper'
import style from './Settings.module.scss'

const Settings = ({ toggleTimerView }) => {
  const [settings, setSettings] = useContext(SettingsContext)

  useEffect(() => {
    toggleTimerView(true)
    updateSettings(settings)
  }, [ settings, toggleTimerView ])

  const onChange = (event) => {
    if (event.target.id === 'sound') {
      playAlertSound(event.target.value)
    }
    setSettings({
      ...settings,
      [event.target.id]: event.target.value
    })
  }

  const toggleMood = () => {
    setSettings({
      ...settings,
      moodRating: !settings.moodRating
    })
  }

  const signOut = () => {
    var auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signOut()
      .then(() => localStorage.clear())
  }

  return (
    <div className={style.settingsContainer}>
      <h2 className={style.settingsHeader}>Settings</h2>
      <div className={style.line}></div>
      <div className={style.intervalContainer}>
        <p className={style.intervalLabel}>Select your focus interval:</p>
        <input
          type="number"
          min={0}
          max={240}
          id="workInterval"
          name="workInterval"
          placeholder={settings.workInterval}
          onBlur={onChange}
          className={style.minutesInput}
          data-testid="workInterval"
        />
        <p>minutes</p>
      </div>
      <div className={style.intervalContainer}>
        <p className={style.intervalLabel}>Select your break interval:</p>
        <select
          onBlur={onChange}
          className={style.breakIntervalDropdown}
          name="Break"
          id="breakInterval"
          data-testid="breakInterval"
          defaultValue={settings.breakInterval}
        >
          <option value={5}>5</option>
          <option value={7}>7</option>
          <option value={10}>10</option>
        </select>
        <p>minutes</p>
      </div>
      <div className={style.line}></div>
      <div className={style.intervalContainer}>
        <p className={style.intervalLabel}>Select your alert sound:</p>
        <select
          onChange={onChange}
          className={style.breakIntervalDropdown}
          name="Sound"
          id="sound"
          data-testid="sound"
          value={settings.sound}
        >
          <option value={"reverbSplash"}>Reverb Splash</option>
          <option value={"balineseGong"}>Balinese Gong</option>
          <option value={"goodOldSynths"}>Good Ol' Synthesizers</option>
          <option value={"pianoDreams"}>Piano Dreams</option>
          <option value={"levelUp"}>Level Up</option>
          <option value={"birdChord"}>Bird Chord</option>
          <option value={"random"}>Randomize My Sounds</option>
        </select>
      </div>
      <div className={style.line}></div>
      <div className={style.intervalContainer}>
        <p className={style.intervalLabel}>
          {settings.moodRating ? "Disable" : "Enable"} mood ratings
        </p>
        <label className={style.switch}>
          <input
            type="checkbox"
            className={style.inputToggle}
            checked={settings.moodRating}
            data-testid="moodRating"
            onClick={toggleMood}
          />
          <span className={style.slider}></span>
        </label>
      </div>
      <div className={style.line}></div>
      <p className={style.saveAutomatically}>
        <span role="img" alt="sparkle emoji" aria-label="sparkle emoji">
          ✨
        </span>{" "}
        Settings will save automagically{" "}
        <span role="img" alt="sparkle emoji" aria-label="sparkle emoji">
          ✨
        </span>
      </p>
      <a href="/">
        <button className={style.skipBtn} onClick={signOut}>
          Log Out
        </button>
      </a>
    </div>
  );
}

export default Settings

Settings.propTypes = {
  toggleTimerView: PropTypes.func
}
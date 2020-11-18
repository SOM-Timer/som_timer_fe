import React, { useContext, useState } from 'react'
import { SettingsContext } from '../../Context/SettingsContext'
import { ViewContext } from '../../Context/ViewContext'
import { SessionContext } from '../../Context/SessionContext'
import Timer from 'react-compound-timer'
import style from './CountdownTimer.module.scss'
import { playAlertSound } from '../../helpers/audioHelper'
import { displayNotification } from '../../helpers/notificationHelpers'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Icons ---------->
import playTimerIcon from '../../assets/timer/playTimerIcon.png'
import pauseTimerIcon from '../../assets/timer/pauseTimerIcon.png'
import skipTimerIcon from '../../assets/timer/skipTimerIcon.png'
import resetTimerIcon from '../../assets/timer/resetTimerIcon.png'

const CountdownTimer = () => {
  const [ settings ] = useContext(SettingsContext)
  const setView = useContext(ViewContext)[1]
  const [ session, setSession ] = useContext(SessionContext)
  const [ focusMessage, setFocusMessage ] = useState('Click ▶ to Begin Focusing')
  
  const recordFocusInterval = (interval) => {
    setSession({
      ...session,
      focusInterval: interval,
      moodRating1: null,
      contentSelected: null,
      moodRating2: null,
      restInterval: null,
    })
  }
  
  const toastNotify = () => { 
    toast.dark('⌛️ Time\'s up! ⌛️', {
    })
  }

  const timerDone = () => {
    setView('mood-rating-1')
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      toastNotify()
    } else {
      displayNotification()
    }
    playAlertSound(settings.sound)
    recordFocusInterval(settings.workInterval)
  }

  return (
    <div className={style.countdownTimer}>
      <h2 className={style.prompt}>{focusMessage}</h2>
      <Timer
        direction="backward"
        initialTime={settings.workInterval * 60000}
        lastUnit="m"
        startImmediately={false}
        timeToUpdate={10}
        checkpoints={[
          {
            time: 0,
            callback: () => {
              timerDone()
            },
          },
        ]}
      >
        {({ start, pause, getTime, getTimerState, setTime }) => (
          <>
            {
              getTimerState() === 'INITED' ? 
              setTime(settings.workInterval * 60000) : 
              setTime(getTime())
            }
            <div className={style.baseTimer}>
              <svg
                className={style.baseTimerSvg}
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g className={style.baseTimerCircle}>
                  <circle
                    className={style.baseTimerPathElapsed}
                    cx="50"
                    cy="50"
                    r="45"
                  />
                  <path
                    id="base-timer-path-remaining"
                    strokeDasharray={`${
                      (getTime() / (settings.workInterval * 60000)) * 283
                    } 283`}
                    className={getTimerState() === 'PLAYING' ? style.baseTimerPathAnimated : style.baseTimerPathRemaining}
                    d="
                      M 50, 50
                      m -45, 0
                      a 45,45 0 1,0 90,0
                      a 45,45 0 1,0 -90,0
                    "
                  />
                </g>
              </svg>
              <p className={style.baseTimerLabel}>
                {<Timer.Minutes />}:
                {
                  <Timer.Seconds
                    formatValue={(value) =>
                      `${value < 10 ? `0${value}` : value}`
                    }
                  />
                }
              </p>
            </div>
            <div className={style.timerControls}>
              {getTimerState() !== 'PLAYING' && 
                <button
                  className={style.timerControlButton}
                  aria-label="start"
                  onClick={() => {
                    start()
                    setFocusMessage('Stay focused, you got this!')
                  }}
                >
                  <img
                    className={style.playTimerControlIcon}
                    src={playTimerIcon}
                    alt="play symbol"
                  />
                </button>
              }
              {getTimerState() === 'PLAYING' &&
                <button
                  className={style.timerControlButton}
                  aria-label="pause"
                  onClick={() => {
                    pause()
                    setFocusMessage('Click ▶ to Continue Focusing');
                  }}
                >
                  <img
                    className={style.pauseTimerControlIcon}
                    src={pauseTimerIcon}
                    alt="pause symbol"
                  />
                </button>
              }
              <button
                className={style.timerControlButton}
                aria-label="reset"
                onClick={() => {
                  pause()
                  setFocusMessage('Click ▶ to Begin Focusing')
                  setTime(settings.workInterval * 60000)
                }}
              >
                <img
                  className={style.resetTimerControlIcon}
                  src={resetTimerIcon}
                  alt="reset symbol"
                />
              </button>
              <button
                className={style.timerControlButton}
                aria-label="skip"
                onClick={() => {
                  const timeElapsed = (((settings.workInterval * 60000) - getTime()) / 60000).toFixed(2)
                  recordFocusInterval(timeElapsed)
                  setView('mood-rating-1')
                }}
              >
                <img
                  className={style.skipTimerControlIcon}
                  src={skipTimerIcon}
                  alt="reset symbol"
                />
              </button>
            </div>
          </>
        )}
      </Timer>
    </div>
  );
}

export default CountdownTimer;

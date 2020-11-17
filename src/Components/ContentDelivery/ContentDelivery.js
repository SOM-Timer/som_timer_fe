import React, { useState, useContext } from 'react'
import style from './ContentDelivery.module.scss'
import FocusModal from '../FocusModal/FocusModal'
import ReactPlayer from 'react-player'
import { VideoContext } from '../../Context/VideoContext'
import { ViewContext } from '../../Context/ViewContext'
import { SettingsContext } from '../../Context/SettingsContext'
import { SessionContext } from '../../Context/SessionContext'

const ContentDelivery = () => {
  const [sessionComplete, setSessionComplete] = useState(false)
  const [ videoLink ] = useContext(VideoContext)
  const setView = useContext(ViewContext)[1]
  const [ settings ] = useContext(SettingsContext)
  const [ session, setSession ] = useContext(SessionContext)

  const recordBreakInterval = () => {
    setSession({
      ...session,
      restInterval: settings.breakInterval
    })
  }

  const handleEnded = () => {
    recordBreakInterval()
    // setView('mood-rating-2')
    settings.moodRating ? setView('mood-rating-2') : setSessionComplete(true)
  }

  return (
    <>
      <section className={!sessionComplete ? style.videoSection : style.endSessionModal}>
        <h2 className={style.prompt}>Enjoy Your Break!</h2>
        <div className={style.videoWrapper}>
          <ReactPlayer
            className={style.videoPlayer}
            url={videoLink}
            playing={false}
            controls={true}
            width="100%"
            height="100%"
            onEnded={handleEnded}
          />
        </div>
        <button 
          className={style.skipBtn} 
          onClick={handleEnded}
        >
          Skip Break
        </button>
      </section>
      {sessionComplete && <FocusModal />}
    </>       
  )
}

export default ContentDelivery
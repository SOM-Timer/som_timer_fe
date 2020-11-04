import React, { useContext, useState } from 'react'
import style from './ContentDelivery.module.scss'
import ReactPlayer from 'react-player'
import { VideoContext } from '../../Context/VideoContext'
import { ViewContext } from '../../Context/ViewContext'
import { SettingsContext } from '../../Context/SettingsContext'
import { SessionContext } from '../../Context/SessionContext'

const ContentDelivery = () => {
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
    setView('mood-rating-2')
  }

  return (
    <>
      <section className={style.videoSection}>
        <h2 className={style.prompt}>Enjoy Your Break!</h2>
        <div className={style.videoWrapper}>
          <ReactPlayer
            className={style.videoPlayer}
            url={videoLink}
            playing={false}
            controls={true}
            width="90%"
            height="90%"
            onEnded={handleEnded}
          />
        </div>
        <button 
          className={style.skipBtn} 
          onClick={() => {
            setView('mood-rating-2')
            recordBreakInterval()
          }}
        >
          Skip video
        </button>
      </section>
    </>       
  )
}

export default ContentDelivery
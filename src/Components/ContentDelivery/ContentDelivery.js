import React, { useContext, useState } from 'react'
import style from './ContentDelivery.module.scss'
import ReactPlayer from 'react-player'
import { VideoContext } from '../../Context/VideoContext'
import { ViewContext } from '../../Context/ViewContext'
import { SettingsContext } from '../../Context/SettingsContext'
import { SessionContext } from '../../Context/SessionContext'

const ContentDelivery = () => {
  const [ done, setDone ] = useState(false)
  const [ videoLink ] = useContext(VideoContext)
  const [ view, setView ] = useContext(ViewContext)
  const [ settings ] = useContext(SettingsContext)
  const [ session, setSession ] = useContext(SessionContext)

  const recordBreakInterval = () => {
    setSession({
      ...session,
      restInterval: settings.breakInterval
    })
  }

  const handleEnded = () => {
    setDone(true)
    recordBreakInterval()
    setTimeout(() => setView('mood-rating-2'), 2000)
  }

  return (
    <>
      <section className={ !done ? style.videoSection : style.videoSectionModal}>
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
        { !done &&
          <button 
            className={style.skipBtn} 
            onClick={() => {
              setView('mood-rating-2')
              recordBreakInterval()
            }}
          >
            Skip video
          </button>     
        }
      </section>
      { done && 
        <div className={style.workMsgModal}>
          <h2 className={style.modalContent}>Time to focus again!</h2>
        </div> 
      }
    </>       
  )
}

export default ContentDelivery
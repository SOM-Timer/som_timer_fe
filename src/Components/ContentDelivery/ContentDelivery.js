import React, { useContext, useState } from 'react'
import style from './ContentDelivery.module.scss'
import ReactPlayer from 'react-player'
import { VideoContext } from '../../Context/VideoContext'
import { ViewContext } from '../../Context/ViewContext'

const ContentDelivery = () => {
  const [ done, setDone ] = useState(false)
  const [ videoLink ] = useContext(VideoContext)
  const [ view, setView ] = useContext(ViewContext)

  const handleEnded = () => {
    setDone(true)
    setTimeout(() => setView('timer'), 2000)
  }

  return (
    <>
      <section className={ !done ? style.videoSection : style.videoSectionModal}>
        <h2>Enjoy Your Break!</h2>
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
          <button className={style.skipBtn} onClick={() => setView('timer')}>Skip video</button>     
        }
      </section>
      { done && 
        <div className={style.workMsgModal}>
          <h2 className={style.modalContent}>Let's get back to work!</h2>
        </div> 
      }
    </>       
  )
}

export default ContentDelivery
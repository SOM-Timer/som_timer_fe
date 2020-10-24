import React, { useContext } from 'react'
import style from './ContentDelivery.module.scss'
import ReactPlayer from 'react-player'
import { VideoContext } from '../../Context/VideoContext'
import { ViewContext } from '../../Context/ViewContext'

const ContentDelivery = () => {
  const [ videoLink ] = useContext(VideoContext)
  const [ view, setView ] = useContext(ViewContext)

  return (
    <section className={style.videoSection}>
      <h2>Enjoy Your Break!</h2>
      <div className={style.videoWrapper}>
        <ReactPlayer
          className={style.videoPlayer}
          url={videoLink}
          playing={false}
          controls={true}
          width="90%"
          height="90%"
        />
      </div>
      <button className={style.skipBtn} onClick={() => setView('timer')}>Skip video</button>
    </section>
  )
}

export default ContentDelivery
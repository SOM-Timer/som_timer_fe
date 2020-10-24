import React, { useContext } from 'react'
import './ContentDelivery.scss'
import ReactPlayer from 'react-player'
import { VideoContext } from '../../Context/VideoContext'
import { ViewContext } from '../../Context/ViewContext'

const ContentDelivery = () => {
  const [ videoLink ] = useContext(VideoContext)
  const [ view, setView ] = useContext(ViewContext)

  return (
    <section className="video-section">
      <h2>Enjoy Your Break!</h2>
      <div className="video-wrapper">
        <ReactPlayer
          className="video-player"
          url={videoLink}
          playing={false}
          controls={true}
          width="90%"
          height="90%"
        />
      </div>
      <button className="skip-btn" onClick={() => setView('timer')}>Skip video</button>
    </section>
  )
}

export default ContentDelivery
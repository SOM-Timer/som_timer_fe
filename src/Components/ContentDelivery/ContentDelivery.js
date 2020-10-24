import React, { useContext } from 'react'
import './ContentDelivery.scss'
import ReactPlayer from 'react-player'
import { VideoContext } from '../../Context/VideoContext'

const ContentDelivery = () => {
  const [ videoLink ] = useContext(VideoContext)

  return (
    <section className="video-section">
      <h2>Enjoy Your Break!</h2>
      <div class='video-wrapper'>
        <ReactPlayer
          className="video-player"
          alt='Video for pom break'
          url={videoLink}
          playing={false}
          controls={true}
          width="90%"
          height="90%"
        />
      </div>
      <button className='skip-btn'>Skip video</button>
    </section>
  )
}

export default ContentDelivery
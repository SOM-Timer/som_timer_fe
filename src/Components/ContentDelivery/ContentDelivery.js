import React, { useContext } from 'react'
import './ContentDelivery.scss'
import ReactPlayer from 'react-player'
import { VideoContext } from '../../Context/VideoContext'

const ContentDelivery = () => {
  const [ videoLink ] = useContext(VideoContext)

  return (
    <section className='video'>
      <ReactPlayer
        className='video-player'
        url={videoLink}
        playing={false}
        controls={true}
        width='55em'
        height='30em'
      />
      <button className='skip-btn'>Skip video</button>
    </section>
  )
}

export default ContentDelivery
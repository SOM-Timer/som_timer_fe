import React, { useState } from 'react'
import './ContentDelivery.scss'
import ReactPlayer from 'react-player'

const ContentDelivery = () => {

  return (
    <section className='video'>
      <ReactPlayer
        className='video-player'
        url='https://www.youtube.com/watch?v=4C-gxOE0j7s'
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
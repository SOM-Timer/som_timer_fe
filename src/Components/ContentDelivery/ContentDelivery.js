import React, { useState } from 'react'
import './ContentDelivery.scss'
import '../../style/variables.scss'
import ReactPlayer from 'react-player'

const ContentDelivery = () => {

  return (
    <ReactPlayer
      className='video'
      url='https://www.youtube.com/watch?v=4C-gxOE0j7s'
    />
  )
}

export default ContentDelivery
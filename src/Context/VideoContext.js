import React, { createContext, useState } from 'react'

export const VideoContext = createContext()

export const VideoProvider = ({ children }) => {
  const [videoLink, setVideoLink] = useState('https://www.youtube.com/watch?v=4C-gxOE0j7s')

  return (
    <VideoContext.Provider value={ [videoLink, setVideoLink ]}>
      { children }
    </VideoContext.Provider>
  )
}
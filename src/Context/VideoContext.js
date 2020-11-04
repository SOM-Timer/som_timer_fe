import React, { createContext, useState } from 'react'

export const VideoContext = createContext()

export const VideoProvider = ({ children }) => {
  const [videoLink, setVideoLink] = useState(null)

  return (
    <VideoContext.Provider value={ [videoLink, setVideoLink ]}>
      { children }
    </VideoContext.Provider>
  )
}
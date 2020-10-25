import React, { useContext } from 'react'
import style from './HomeContainer.module.scss'
import { ViewContext } from '../../Context/ViewContext'
import { VideoProvider } from '../../Context/VideoContext'
import ContentDelivery from '../ContentDelivery/ContentDelivery'

const HomeContainer = () => {
  const [ view ] = useContext(ViewContext)

  return ( 
    <VideoProvider>
      { view === 'timer' &&  
        <h2>Pom Timer View!</h2>
        // <CountdownTimer/>
      }
      { view === 'content-selection' &&
      <h2>Content Selection View!</h2>
        // <ContentSelection/>
      }
      { view === 'content-delivery' && 
        <ContentDelivery />
      }
    </VideoProvider>  
  )

}

export default HomeContainer
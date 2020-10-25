import React, { useContext } from 'react'
// import style from './HomeContainer.module.scss'
import { ViewContext } from '../../Context/ViewContext'
import { VideoProvider } from '../../Context/VideoContext'
import ContentDelivery from '../ContentDelivery/ContentDelivery'
import CountdownTimer from '../Timer/Timer'
import ContentSelection from '../ContentSelection/ContentSelection'

const HomeContainer = () => {
  const [ view ] = useContext(ViewContext)

  return ( 
    <VideoProvider>
      { view === 'timer' &&  
        <CountdownTimer/>
      }
      { view === 'content-selection' &&
        <ContentSelection/>
      }
      { view === 'content-delivery' && 
        <ContentDelivery />
      }
    </VideoProvider>  
  )

}

export default HomeContainer
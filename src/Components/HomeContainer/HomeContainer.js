import React, { useContext } from 'react'
import { ViewContext } from '../../Context/ViewContext'
import { VideoProvider } from '../../Context/VideoContext'
import ContentDelivery from '../ContentDelivery/ContentDelivery'
import CountdownTimer from '../Timer/Timer'
import ContentSelection from '../ContentSelection/ContentSelection'
import style from './HomeContainer.module.scss'

const HomeContainer = () => {
  const [ view ] = useContext(ViewContext)

  return ( 
    <div className={style.HomeContainer}>
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
    </div>
  )

}

export default HomeContainer
import React, { useContext} from 'react'
import style from './ContentSelection.module.scss'
import { ViewContext } from '../../Context/ViewContext'
import { VideoContext } from '../../Context/VideoContext'

const ContentSelection = () => {
  const [view, setView] = useContext(ViewContext)
  const [videoLink, setVideoLink] = useContext(VideoContext)

  const fetchVideo = (event) => {
    const category = event.target.name
    //get a video from BE with parameters of category from above & breakInterval duration from settings context 
    //when get video back, use setVideoLink function to set the video url  
    //may need a loading screen while this is happening? 
    setView('content-delivery')
  }

  return (
    <section className={style.ContentSelection}>
      <h2 className={style.prompt}>How would you like to spend your break?</h2>
      <div className={style.options}>
        <div>
          <button 
            className={style.button} 
            aria-label="somatic exercise"
            name="somatic exercise"
            onClick={fetchVideo}
          ></button>
          <p>Somatic Exercise</p>
        </div>
        <div>
          <button
            className={style.button}
            aria-label="breathwork/meditation"
            name="breathwork/meditation"
            onClick={fetchVideo}
          ></button>
          <p>Breathwork / Meditation</p>
        </div>
        <div>
          <button 
            className={style.button} 
            aria-label="yoga/movement"
            name="yoga/movement"
            onClick={fetchVideo}
          ></button>
          <p>Yoga / Movement</p>
        </div>
      </div>
    </section>
  );
}

export default ContentSelection
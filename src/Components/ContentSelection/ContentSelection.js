import React, { useContext} from 'react'
import style from './ContentSelection.module.scss'
import { ViewContext } from '../../Context/ViewContext'
import { VideoContext } from '../../Context/VideoContext'
import { SettingsContext } from '../../Context/SettingsContext'
import somaticContentIcon from '../../assets/content/somaticContentIcon.png'
import meditationContentIcon from '../../assets/content/meditationContentIcon.png'
import { getRandomContent } from '../../apiCalls'

const ContentSelection = () => {
  const [view, setView] = useContext(ViewContext)
  const [videoLink, setVideoLink] = useContext(VideoContext)
  const [ settings ] = useContext(SettingsContext)

  const fetchVideo = (event) => {
    debugger
    const category = event.target.name
    const duration = `${settings.breakInterval}:00`
    //get a video from BE with parameters of category from above & breakInterval duration from settings context 
      //when get video back, use setVideoLink function to set the video url
    getRandomContent(duration, category)
      .then(response => {
        const videoLink = response.data.url
        setVideoLink(videoLink)
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.status)
        }
      }
    )
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
          >
            <img
              className={style.somaticIcon}
              src={somaticContentIcon}
              alt="human head with arrows connecting brain to body"
            />
          </button>
          <p>Somatic Exercise</p>
        </div>
        <div>
          <button
            className={style.button}
            aria-label="breathwork/meditation"
            name="breathwork/meditation"
            onClick={fetchVideo}
          >
            <img
              className={style.meditationIcon}
              src={meditationContentIcon}
              alt="human sitting in meditation pose"
            />
          </button>
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
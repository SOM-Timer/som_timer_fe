import React, { useContext} from 'react'
import style from './ContentSelection.module.scss'
import { ViewContext } from '../../Context/ViewContext'
import { VideoContext } from '../../Context/VideoContext'
import { SettingsContext } from '../../Context/SettingsContext'
import { getRandomContent } from '../../apiCalls'
import somaticContentIcon from '../../assets/content/somaticContentIcon.png'
import meditationContentIcon from '../../assets/content/meditationContentIcon.png'
import yogaContentIcon from '../../assets/content/yogaContentIcon.png'

const ContentSelection = () => {
  const [view, setView] = useContext(ViewContext)
  const [videoLink, setVideoLink] = useContext(VideoContext)
  const [ settings ] = useContext(SettingsContext)

  const fetchVideo = (event) => {
    const category = event.target.name
    const duration = `${settings.breakInterval}:00`
    
    getRandomContent(duration, category)
      .then(response => {
        const videoLink = response.data.url
        setVideoLink(videoLink)
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response)
        }
      })
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
            name="SOMATIC"
            onClick={fetchVideo}
          >
            <img
              className={style.somaticIcon}
              src={somaticContentIcon}
              alt="human head with arrows connecting brain to body"
              name="SOMATIC"
            />
          </button>
          <p>Somatic Exercise</p>
        </div>
        <div>
          <button
            className={style.button}
            aria-label="breathwork/meditation"
            name="MEDITATION"
            onClick={fetchVideo}
          >
            <img
              className={style.meditationIcon}
              src={meditationContentIcon}
              alt="woman sitting in meditation pose"
              name="MEDITATION"
            />
          </button>
          <p>Breathwork / Meditation</p>
        </div>
        <div>
          <button
            className={style.button}
            aria-label="yoga/movement"
            name="MOVEMENT"
            onClick={fetchVideo}
          >
            <img
              className={style.meditationIcon}
              src={yogaContentIcon}
              alt="woman standing in warrior yoga pose"
              name="MOVEMENT"
            />
          </button>
          <p>Yoga / Movement</p>
        </div>
      </div>
    </section>
  );
}

export default ContentSelection
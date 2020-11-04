import React, { useState, useContext } from 'react'
import style from './MoodRating.module.scss'
import FocusModal from '../FocusModal/FocusModal'
import { ViewContext } from '../../Context/ViewContext'
import { SessionContext } from '../../Context/SessionContext'
import moodIcon1 from '../../assets/moodIcons/moodIcon1.png'
import moodIcon2 from '../../assets/moodIcons/moodIcon2.png'
import moodIcon3 from '../../assets/moodIcons/moodIcon3.png'
import moodIcon4 from '../../assets/moodIcons/moodIcon4.png'
import moodIcon5 from '../../assets/moodIcons/moodIcon5.png'

const MoodRating = () => {
  const [ sessionComplete, setSessionComplete ] = useState(false)
  const [ moodRating, setMoodRating ] = useState(null)
  const [ error, setError ] = useState(false)
  const [ view, setView ] = useContext(ViewContext)
  const [ session, setSession ] = useContext(SessionContext)

  const rateMood = (event) => {
    setMoodRating(event.target.name)
    setError(false)
  }

  const recordMood = () => {
    if (view === 'mood-rating-1') {
      setSession({
        ...session,
        moodRating1: moodRating
      })
      setView('content-selection')
    } else if (view === 'mood-rating-2') {
      setSession({
        ...session,
        moodRating2: moodRating
      })
      setSessionComplete(true)
    }
  }

  const checkSubmit = (event) => {
    event.preventDefault()
    if(!moodRating) {
      setError(true)
    } else {
      recordMood(event)
    }
  }

  return (
    <>
      <section className={!sessionComplete ? style.moodRatingContainer : style.moodRatingModal}>
        <h2>Please select a face below to indicate how you are feeling</h2>
        <form onSubmit={checkSubmit}>
          <div className={style.facesContainer}>
            <button 
              type='button'
              className={`${style.moodRating1} ${style.moodRatingButton}`}
              onClick={rateMood}
              name={1}
              aria-label="Rate mood 1 out of 5"
            >
              <img 
                className={style.moodIcon}
                src={moodIcon1} 
                alt="Unhappy face"
                name={1}
              /> 
            </button>
            <button 
              type='button'
              className={`${style.moodRating2} ${style.moodRatingButton}`}
              onClick={rateMood}
              name={2}
              aria-label="Rate mood 2 out of 5"
            >
              <img
                className={style.moodIcon}
                src={moodIcon2}
                alt="Slightly unhappy face"
                name={2}
              /> 
            </button>
            <button 
              type='button'
              className={`${style.moodRating3} ${style.moodRatingButton}`}
              onClick={rateMood}
              name={3}
              aria-label="Rate mood 3 out of 5"
            >
              <img
                className={style.moodIcon}
                src={moodIcon3}
                alt="Neutral face"
                name={3}
              /> 
            </button>
            <button 
              type='button'
              className={`${style.moodRating4} ${style.moodRatingButton}`}
              onClick={rateMood}
              name={4}
              aria-label="Rate mood 4 out of 5"
            >
              <img
                className={style.moodIcon}
                src={moodIcon4}
                alt="Slightly happy face"
                name={4}
              /> 
            </button>
            <button 
              type='button'
              className={`${style.moodRating5} ${style.moodRatingButton}`}
              onClick={rateMood}
              name='5'
              aria-label="Rate mood 5 out of 5"
            >
              <img
                className={style.moodIcon}
                src={moodIcon5}
                alt="Happy face"
                name='5'
              /> 
            </button>
          </div>
          <div className={style.errorContainer}>
            {error && <p className={style.errorMessage}>
              <span role='img' alt='Error sign'>
                ⚠
              </span>
              Please select an option above to continue! 
              <span role='img' alt='Error sign'>
                ⚠
              </span>
            </p>}
          </div>
          <button 
            type='submit'
            className={style.moodRatingSubmit}
          >
            Submit  
          </button>
        </form>
      </section>
      {sessionComplete && <FocusModal />}
    </>
  )
}

export default MoodRating
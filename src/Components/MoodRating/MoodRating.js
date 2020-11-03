import React, { useState, useContext, useEffect } from 'react'
import style from './MoodRating.module.scss'
import { ViewContext } from '../../Context/ViewContext'
import { SessionContext } from '../../Context/SessionContext'
import { postSession } from '../../apiCalls'

const MoodRating = () => {
  const [ moodRating, setMoodRating ] = useState(null)
  const [ error, setError ] = useState(false)
  const [ view, setView ] = useContext(ViewContext)
  const [ session, setSession ] = useContext(SessionContext)

  const rateMood = (event) => {
    setMoodRating(event.target.value)
    if (view === 'mood-rating-1') {
      setSession({
        ...session,
        moodRating1: event.target.value
      })
    } else if (view === 'mood-rating-2') {
      setSession({
        ...session,
        moodRating2: event.target.value
      })
    }
    setError(false)
  }

  const recordMood = () => {
    if (view === 'mood-rating-1') {
      setView('content-selection')
    } else if (view === 'mood-rating-2') {
      setView('timer')
      postSession(session)
    }
  }

  const checkSubmit = (event) => {
    event.preventDefault()
    if(!moodRating) {
      setError(true)
    } else {
      recordMood()
    }
  }

  return (
    <section className={style.moodRatingContainer}>
      <h2>Please select a face below to indicate how you are feeling</h2>
      <form onSubmit={checkSubmit}>
        <div className={style.facesContainer}>
          <button 
            type='button'
            className={`${style.moodRating1} ${style.moodRatingButton}`}
            onClick={rateMood}
            value={1}
          >
            1
          </button>
          <button 
            type='button'
            className={`${style.moodRating2} ${style.moodRatingButton}`}
            onClick={rateMood}
            value={2}
          >
            2
          </button>
          <button 
            type='button'
            className={`${style.moodRating3} ${style.moodRatingButton}`}
            onClick={rateMood}
            value={3}
          >
            3
          </button>
          <button 
            type='button'
            className={`${style.moodRating4} ${style.moodRatingButton}`}
            onClick={rateMood}
            value={4}
          >
            4
          </button>
          <button 
            type='button'
            className={`${style.moodRating5} ${style.moodRatingButton}`}
            onClick={rateMood}
            value={5}
          >
            5
          </button>
        </div>
        <div className={style.errorContainer}>
          {error && <p className={style.errorMessage}>⚠ Please select a face to continue! ⚠</p>}
        </div>
        <button 
          type='submit'
          className={style.moodRatingSubmit}
        >
          Submit  
        </button>
      </form>
    </section>
  )
}

export default MoodRating
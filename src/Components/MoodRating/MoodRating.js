import React, { useState } from 'react'
import style from './MoodRating.module.scss'

const MoodRating = () => {
  const [ moodRating, selectMoodRating ] = useState(0)

  return (
    <section className={style.moodRatingContainer}>
      <h2>Please select a face below to indicate how you are feeling</h2>
      <form>
        <div className={style.facesContainer}>
          <button 
            type='button'
            className={`${style.moodRating1} ${style.moodRatingButton}`}
            onClick={(event) => selectMoodRating(event.target.value)}
            value={1}
          >
            1
          </button>
          <button 
            type='button'
            className={`${style.moodRating2} ${style.moodRatingButton}`}
            onClick={(event) => selectMoodRating(event.target.value)}
            value={2}
          >
            2
          </button>
          <button 
            type='button'
            className={`${style.moodRating3} ${style.moodRatingButton}`}
            onClick={(event) => selectMoodRating(event.target.value)}
            value={3}
          >
            3
          </button>
          <button 
            type='button'
            className={`${style.moodRating4} ${style.moodRatingButton}`}
            onClick={(event) => selectMoodRating(event.target.value)}
            value={4}
          >
            4
          </button>
          <button 
            type='button'
            className={`${style.moodRating5} ${style.moodRatingButton}`}
            onClick={(event) => selectMoodRating(event.target.value)}
            value={5}
          >
            5
          </button>
        </div>
        <button 
          type='submit'
          className={style.moodRatingSubmit}
          onClick={(event) => {
            event.preventDefault()
            console.log({
              timestamp: Date.now(),
              moodRating: moodRating
            })
          }}
        >
          Submit  
        </button>
      </form>
    </section>
  )
}

export default MoodRating
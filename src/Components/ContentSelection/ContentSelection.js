import React from 'react'
import style from './ContentSelection.module.scss'

const ContentSelection = () => {
  return (
    <section className={style.ContentSelection}>
      <h2 className={style.prompt}>How would you like to spend your break?</h2>
      <div className={style.options}>
        <div>
          <button 
            className={style.button} 
            aria-label="somatic exercise"
          ></button>
          <p>Somatic Exercise</p>
        </div>
        <div>
          <button
            className={style.button}
            aria-label="breathwork/meditation"
          ></button>
          <p>Breathwork / Meditation</p>
        </div>
        <div>
          <button 
            className={style.button} 
            aria-label="yoga/movement"
          ></button>
          <p>Yoga / Movement</p>
        </div>
      </div>
    </section>
  );
}

export default ContentSelection
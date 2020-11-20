import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import style from './Stats.module.scss'

const Stats = ({ toggleTimerView }) => {
  useEffect(() => toggleTimerView(true))
  
  return (
    <article>
      <h2 className={style.prompt}>
        <span role="img" alt="hourglass emoji" aria-label="hourglass emoji">
          ⏳
        </span>{" "}
        Stats Page Coming Soon!{" "}
        <span role="img" alt="hourglass emoji" aria-label="hourglass emoji">
          ⏳
        </span>
      </h2>
      <section className={style.statsDesc}>
        <div className={style.line}></div>
        <p>
          <strong className={style.strong}>Check back soon</strong> for personal
          stats, so you can see the positive impact Som Timer is having on your
          productivity and mental health. Stats will include data such as a log
          of pom cycles taken, mood and engagement tracking, and what types of
          content work best for you!
        </p>
        <div className={style.line}></div>
      </section>
    </article>
  );
}

export default Stats

Stats.propTypes = {
  toggleTimerView: PropTypes.func
}
import React from 'react'
import style from './Stats.module.scss'

const Stats = () => {
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
        <p>
          <strong className={style.strong}>Check back soon</strong> for personal
          stats so you can see the positive impact Som Timer is having on your
          productivity and mental health. Stats will include data such as a log
          of pom cycles taken, mood and engagement tracking, and what types of
          content work best for you!
        </p>
      </section>
    </article>
  );
}

export default Stats
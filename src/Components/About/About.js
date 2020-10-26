import React from 'react'
import style from './About.module.scss'

const About = () => {
  return (
    <section className={style.About}>
      <section className={style.appDescription}>
        <h2>About Som Timer</h2>
        <p>Som Timer is a timer that cares. Inspired by the Pomodoro Technique®, the practice of taking regular breaks at set intervals to fight cognitive boredom and burnout, increase productivity, and boost motivation, Som Timer takes the concept one step further. We at Som Timer believe that what you do on your breaks is just as important as the decision to take those breaks. Mindfulness meditation and other somatic exercises have been linked with enhanced productivity, boosted mental health, and stress reduction. To encourage this state of mind and take the guesswork out of your breaks, Som Timer provides a mindfulness-related video for you during your break interval, so you can get back to work feeling refreshed, calm, and ready to tackle the next task.</p>
        <p className={style.disclaimer}>This timer is not affiliated with, associated with, or endorsed by the Pomodoro Technique® or its creator, Francesco Cirillo. 
        </p>
      </section>
      <section className={style.contributors}>
        <section>
          <h3>Front End Engineers: </h3>
          <p>Aaron Burris-DeBoskey</p>
          <p>Jake West</p>
          <p>Rachel Williams</p>
        </section>
        <section>
          <h3>Back End Engineers: </h3>
          <p>Chandler Hulstrom</p>
          <p>Dorion</p>
          <p>Sienna Kopf</p>
        </section>
      </section>
    </section>
  )
}

export default About
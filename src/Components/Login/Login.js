import React from 'react'
import style from './Login.module.scss'
import aboutIcon from '../../assets/navbar/aboutNavIcon.png'
import settingsIcon from '../../assets/navbar/settingsNavIcon.png'
import statsIcon from '../../assets/navbar/statsNavIcon.png'
import timerIcon from '../../assets/navbar/timerNavIcon.png'

const Login = () => {
  return (
    <section className={style.loginContainer}>
      <h2 className={style.loginHeader}>Welcome to Som Timer</h2>
      <p className={style.appDescription}>
        Som Timer is a timer that cares. This application serves curated wellness content on break intervals. Be mindful of rest so you can focus best!
        <br /><br />
        Sign in with Google to get started.
      </p>
      {/* This login button comes from these docs https://developers.google.com/identity/sign-in/web/sign-in; We should explore these further for methods we'll need for Login */}
      <div className='g-signin2' data-onsuccess='onSignIn' aria-label='Google Login Button'></div>
      <section className={style.somTimerWalkthrough}>
        <article className={style.walkthroughArticle}>
          <img
            className={style.icon}
            src={timerIcon}
            alt="timer icon"
          />
          <div className={style.walkthroughText}>
            <h3 className={style.walkthroughHeader}>Home Page</h3>
            <p className={style.walkthroughDescription}>On the home page, you can view your current focus or break interval in progress. Here, you'll find the countdown timer and built in media player that provides your wellness content.</p>
          </div>
        </article>
        <article className={style.walkthroughArticle}>
          <img
            className={style.icon}
            src={settingsIcon}
            alt="settings icon"
          />
          <div className={style.walkthroughText}>
            <h3 className={style.walkthroughHeader}>Settings Page</h3>
            <p className={style.walkthroughDescription}>On the settings page, you can update your focus and break intervals to fit your needs. You can also adjust other preferences, like the sound of your notifications.</p>
          </div>
        </article>
        <article className={style.walkthroughArticle}>
          <img
            className={style.icon}
            src={statsIcon}
            alt="stats icon"
          />
          <div className={style.walkthroughText}>
            <h3 className={style.walkthroughHeader}>Stats Page</h3>
            <p className={style.walkthroughDescription}>On the stats page, you can get up to date information about your Som Timer usage. More info coming soon!</p>
          </div>
        </article>
        <article className={style.walkthroughArticle}>
          <img
            className={style.icon}
            src={aboutIcon}
            alt="about icon"
          />
          <div className={style.walkthroughText}>
            <h3 className={style.walkthroughHeader}>About Page</h3>
            <p className={style.walkthroughDescription}>On the about page, you can read more about our applciation. You'll also find helpful resources and information about the apps contributors.</p>
          </div>
        </article>
      </section>
    </section>
  )
}

export default Login
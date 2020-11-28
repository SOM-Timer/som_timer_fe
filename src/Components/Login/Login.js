import React, { useContext, useEffect } from 'react'
import { loginUser } from '../../apiCalls'
import { UserContext } from '../../Context/UserContext'
import { SettingsContext } from '../../Context/SettingsContext'
import { getSettings } from '../../apiCalls'
import style from './Login.module.scss'
import aboutIcon from '../../assets/navbar/aboutNavIcon.png'
import settingsIcon from '../../assets/navbar/settingsNavIcon.png'
import statsIcon from '../../assets/navbar/statsNavIcon.png'
import timerIcon from '../../assets/navbar/timerNavIcon.png'

const Login = () => {
  const [ user, setUser ] = useContext(UserContext)
  const setSettings = useContext(SettingsContext)[1]

  useEffect(() => {
    window.gapi.signin2.render("g-signin2", {
      scope: "https://www.googleapis.com/auth/plus.login",
      width: 200,
      height: 50,
      longtitle: true,
      theme: "dark",
      onsuccess: onSignIn,
    })
  })

  const getTimerSettings = (userId) => {
    getSettings(userId)
      .then(response => {
        if (response.data.work_interval) {
          const workInterval = response.data.work_interval.split(':')[0]
          const breakInterval = response.data.rest_interval.split(':')[0]
          const sound = response.data.sound
          const moodRating = response.data.mood
          setSettings({ workInterval, breakInterval, sound, moodRating })
        }
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.status)
        }
      })
  }
  
  const onSignIn = googleUser => {
    const userName = googleUser.getBasicProfile().getName()
    const email = googleUser.getBasicProfile().getEmail()
    loginUser(userName, email)
      .then(response => {
        const userData = response.data
        setUser({
          ...user,
          userName: userData.user_name,
          email: userData.email,
          userId: userData.id
        })
        localStorage.setItem('somTimerUser', JSON.stringify({
          userName: userData.user_name,
          email: userData.email,
          userId: userData.id
        }))
        getTimerSettings(userData.id)
      })
      .catch(error => console.log(error))
  } 

  return (
    <section className={style.loginContainer}>
      <h2 className={style.loginHeader}>Welcome to Som Timer</h2>
      <div className={style.line}></div>
      <p className={style.appDescription}>
        Som Timer is a timer that cares. This application serves curated
        wellness content on break intervals. Be mindful of rest so you can focus
        best!
      </p>
      <section className={style.somTimerWalkthrough}>
        <article className={style.walkthroughArticle}>
          <img className={style.icon} src={timerIcon} alt="timer icon" />
          <div className={style.walkthroughText}>
            <h3 className={style.walkthroughHeader}>Home Page</h3>
            <p className={style.walkthroughDescription}>
              On the homepage, you can view your current focus interval in
              progress. When the timer runs out, this is also where you select
              your break interval content type and view the wellness content in
              our built-in media player.
            </p>
          </div>
        </article>
        <article className={style.walkthroughArticle}>
          <img className={style.icon} src={settingsIcon} alt="settings icon" />
          <div className={style.walkthroughText}>
            <h3 className={style.walkthroughHeader}>Settings Page</h3>
            <p className={style.walkthroughDescription}>
              On the settings page, you can update your focus and break
              intervals to fit your needs. You can also adjust other
              preferences, like the sound of your notifications or disabling
              mood ratings.
            </p>
          </div>
        </article>
        <article className={style.walkthroughArticle}>
          <img className={style.icon} src={statsIcon} alt="stats icon" />
          <div className={style.walkthroughText}>
            <h3 className={style.walkthroughHeader}>Stats Page</h3>
            <p className={style.walkthroughDescription}>
              On the stats page, you can get up-to-date information about your
              Som Timer usage. More info coming soon!
            </p>
          </div>
        </article>
        <article className={style.walkthroughArticle}>
          <img className={style.icon} src={aboutIcon} alt="about icon" />
          <div className={style.walkthroughText}>
            <h3 className={style.walkthroughHeader}>About Page</h3>
            <p className={style.walkthroughDescription}>
              On the about page, you can read more about our application. You'll
              also find helpful resources and information about the Som Timer
              contributors.
            </p>
          </div>
        </article>
      </section>
      {/* This login button comes from these docs https://developers.google.com/identity/sign-in/web/sign-in; We should explore these further for methods we'll need for Login */}
      <div id="g-signin2" aria-label="Google Login Button" />
      <p>Sign in with Google to get started.</p>
    </section>
  );
}

export default Login
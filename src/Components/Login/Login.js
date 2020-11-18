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
      <p className={style.appDescription}>Som Timer is a timer that cares. This application serves curated wellness content on break intervals. Build in rest so you can focus best!</p>
      {/* This login button comes from these docs https://developers.google.com/identity/sign-in/web/sign-in; We should explore these further for methods we'll need for Login */}
      <div className='g-signin2' data-onsuccess='onSignIn' aria-label='Google Login Button'></div>
    </section>
  )
}

export default Login
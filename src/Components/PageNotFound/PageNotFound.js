import React from 'react'
import style from './PageNotFound.module.scss'
import burnout from '../../assets/burnout3.jpg'

const PageNotFound = () => {
  return (
    <section>
      <h2 className={style.errorCode}>⌇ 404 ⌇</h2>
      <h3 className={style.oopsMessage}>Oops, we can't seem to find the page you're looking for!</h3>
      <img className={style.burnout} src={burnout} alt='distressed internet user'/>
      <section className={style.notFoundContent}>
        <p>Here are some helpful links to get you back on track:</p>
        <ul>
          <li><a href='/'>Home / Timer</a></li>
          <li><a href='/settings'>Settings</a></li>
          <li><a href='/about'>About</a></li>
        </ul>
      </section>
    </section>
  )
}

export default PageNotFound
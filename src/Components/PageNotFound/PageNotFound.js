import React from 'react'
import style from './PageNotFound.module.scss'
import burnout from '../../assets/burnout3.jpg'

const PageNotFound = () => {
  return (
    <section>
      <h2 className={style.errorCode}>
        <span className={style.warning}>⚠︎</span> 404{" "}
        <span className={style.warning}>⚠︎</span>
      </h2>
      <h3 className={style.oopsMessage}>
        Oops, we can't seem to find the page you're looking for!
      </h3>
      <img
        className={style.burnout}
        src={burnout}
        alt="distressed internet user"
      />
      <section className={style.notFoundContent}>
        <p>Here are some helpful links to get you back on track:</p>
        <a href="/">
          <p>Home / Timer</p>
        </a>
        <a href="/settings">
          <p>Settings</p>
        </a>
        <a href="/about">
          <p>About</p>
        </a>
      </section>
    </section>
  );
}

export default PageNotFound
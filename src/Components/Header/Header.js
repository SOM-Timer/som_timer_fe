import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import style from './Header.module.scss'
import timerNavIcon from '../../assets/navbar/timerNavIcon.png'
import statsNavIcon from '../../assets/navbar/statsNavIcon.png'
import settingsNavIcon from '../../assets/navbar/settingsNavIcon.png'
import aboutNavIcon from '../../assets/navbar/aboutNavIcon.png'

const Header = () => {
  return (
    <header className={style.header}>
      <Link className={style.title} to="/">
        <h1 className={style.text}>Som Timer</h1>
      </Link>
      <nav className={style.navBar}>
        <NavLink exact to="/" activeClassName={style.selected}>
          <button className={style.navButton} aria-label="timer">
            <img
              className={style.icon}
              src={timerNavIcon}
              alt="timer icon"
            />
          </button>
        </NavLink>
        <NavLink to="/stats" activeClassName={style.selected}>
          <button className={style.navButton} aria-label="stats">
            <img
              className={style.icon}
              src={statsNavIcon}
              alt="stats icon"
            />
          </button>
        </NavLink>
        <NavLink to="/about" activeClassName={style.selected}>
          <button className={style.navButton} aria-label="about">
            <img
              className={style.icon}
              src={aboutNavIcon}
              alt="about icon"
            />
          </button>
        </NavLink>
        <NavLink to="/settings" activeClassName={style.selected}>
          <button className={style.settingsButton} aria-label="settings">
            <img
              className={style.icon}
              src={settingsNavIcon}
              alt="settings icon"
            />
          </button>
        </NavLink>
      </nav>
    </header>
  );
}

export default Header
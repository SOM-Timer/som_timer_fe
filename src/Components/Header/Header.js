import React from 'react'
import { Link } from 'react-router-dom'
import style from './Header.module.scss'
import metatronsSettings from '../../assets/metatronsSettings.png'

const Header = () => {
  return (
    <header className={style.header}>
      <Link className={style.title} to="/">
        <h1 className={style.text}>Som Timer</h1>
      </Link>
      <nav className={style.navBar}>
        <Link to="/">
          <button className={style.navButton} aria-label="timer">
            <img
              className={style.icon}
              src={metatronsSettings}
              alt="hexagonal settings icon"
            />
          </button>
        </Link>
        <Link to="/stats">
          <button className={style.navButton} aria-label="stats">
            <img
              className={style.icon}
              src={metatronsSettings}
              alt="hexagonal settings icon"
            />
          </button>
        </Link>
        <Link to="/settings">
          <button className={style.navButton} aria-label="settings">
            <img
              className={style.icon}
              src={metatronsSettings}
              alt="hexagonal settings icon"
            />
          </button>
        </Link>
        <Link to="/about">
          <button className={style.navButton} aria-label="about">
            <img
              className={style.icon}
              src={metatronsSettings}
              alt="hexagonal settings icon"
            />
          </button>
        </Link>
      </nav>
    </header>
  );
}

export default Header
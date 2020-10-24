import React from 'react'
import { Link } from 'react-router-dom'
import metatronsSettings from '../../assets/metatronsSettings.png'

const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1>Som Timer</h1>
      </Link>
      <nav>
        <Link to="/">
          <button aria-label="timer">
            <img src={metatronsSettings} alt="hexagonal settings icon"/>
          </button>
        </Link>
        <Link to="/stats">
          <button aria-label="stats">
            <img src={metatronsSettings} alt="hexagonal settings icon"/>
          </button>
        </Link>
        <Link to="/settings">
          <button aria-label="settings">
            <img src={metatronsSettings} alt="hexagonal settings icon"/>
          </button>
        </Link>
        <Link to="/about">
          <button aria-label="about">
            <img src={metatronsSettings} alt="hexagonal settings icon"/>
          </button>
        </Link>
      </nav>
    </header>
  )
}

export default Header
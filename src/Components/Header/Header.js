import React from 'react'
import { Link } from 'react-router-dom'
import metatronsSettings from '../../assets/metatronsSettings.png'

const Header = () => {
  return (
    <header>
      <h1>Som Timer</h1>
      <nav>
        <Link to="/settings">
          <button aria-label="settings">
            <img src={metatronsSettings} alt="hexagonal settings icon"/>
          </button>
        </Link>
        <Link to="/stats">
          <button aria-label="stats">
            <img src={metatronsSettings} alt="hexagonal settings icon"/>
          </button>
        </Link>
      </nav>
    </header>
  )
}

export default Header
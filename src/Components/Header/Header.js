import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <h1>Som Timer</h1>
      <nav>
        <Link to="/settings">
          <button name="settings">
            <img src=/>
          </button>
        </Link>
      </nav>
    </header>
  )
}


export default Header
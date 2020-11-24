import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomeContainer from '../HomeContainer/HomeContainer'
import Header from '../Header/Header'
import Settings from '../Settings/Settings'
import About from '../About/About'
import Stats from '../Stats/Stats'
import PageNotFound from '../PageNotFound/PageNotFound'
import { enableNotifications } from '../../helpers/notificationHelpers'
import { ToastContainer } from 'react-toastify'
import './App.scss'


const App = () => {
  enableNotifications()

  const toggleTimerView = (hide) => {
    const homeContainer = document.getElementById('HomeContainer')
    hide
      ? homeContainer.classList.add('hidden')
      : homeContainer.classList.remove('hidden')
  }
  
  return (
    <section className="App">
      <ToastContainer
        position="top-center"
        autoClose={10000}
        closeOnClick
        pauseOnHover={false}
      />
      <Header toggleTimerView={toggleTimerView} />
      <HomeContainer />
      <Switch>
        <Route exact path="/" />
        <Route
          exact path="/settings"
          render={() => <Settings toggleTimerView={toggleTimerView} />}
        />
        <Route
          exact path="/about"
          render={() => <About toggleTimerView={toggleTimerView} />}
        />
        <Route
          exact path="/stats"
          render={() => <Stats toggleTimerView={toggleTimerView} />}
        />
        <Route
          render={() => <PageNotFound toggleTimerView={toggleTimerView} />}
        />
      </Switch>
    </section>
  );
}

export default App

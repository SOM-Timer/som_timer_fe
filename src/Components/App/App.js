import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomeContainer from '../HomeContainer/HomeContainer'
import Header from '../Header/Header'
import Settings from '../Settings/Settings'
import About from '../About/About'
import Stats from '../Stats/Stats'
import PageNotFound from '../PageNotFound/PageNotFound'
import './App.scss'
import { enableNotifications } from '../../helpers/notificationHelpers'

function App() {
  enableNotifications()
  
  return (
    <section className="App">
      <Header />
      <Switch>
        <Route exact path="/" render={() => <HomeContainer />} />
        <Route exact path="/settings" render={() => <Settings />} />
        <Route exact path="/about" render={() => <About />} />
        <Route exact path="/stats" render={() => <Stats />} />
        <Route render={() => <PageNotFound />} />
      </Switch>
    </section>
  );
}

export default App

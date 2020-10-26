import React from 'react'
import { ViewProvider } from '../../Context/ViewContext'
import { SettingsProvider } from '../../Context/SettingsContext'
import { Switch, Route } from 'react-router-dom'
import HomeContainer from '../HomeContainer/HomeContainer'
import Header from '../Header/Header'
import Settings from '../Settings/Settings'
import About from '../About/About'
import './App.css'

function App() {
  return (
    <section className="App">
      <Header />
      <Switch>
        <SettingsProvider>
          <ViewProvider>
            <Route exact path="/" render={() => <HomeContainer />} />
          </ViewProvider>
          <Route exact path="/settings" render={() => <Settings />} />
          <Route exact path="/about" render={() => <About />} />
          {/* <Route exact path="/stats" render={() => <UnderConstructon />} */}
          {/* <Route render={() => <DoesNotExist />} /> */}
        </SettingsProvider>
      </Switch>
    </section>
  );
}

export default App

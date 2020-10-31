import React from 'react'
// import { ViewProvider } from '../../Context/ViewContext'
// import { SettingsProvider } from '../../Context/SettingsContext'
import { Switch, Route } from 'react-router-dom'
import HomeContainer from '../HomeContainer/HomeContainer'
import Header from '../Header/Header'
import Settings from '../Settings/Settings'
import About from '../About/About'
import Stats from '../Stats/Stats'
import PageNotFound from '../PageNotFound/PageNotFound'
import './App.scss'

function App() {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications!')
    return;
  }

  Notification.requestPermission(status => {
    console.log('Notification permission status:', status)
  })
  
  return (
    <section className="App">
      <Header />
      <Switch>
        {/* <SettingsProvider> */}
          {/* <ViewProvider> */}
            <Route exact path="/" render={() => <HomeContainer />} />
          {/* </ViewProvider> */}
          <Route exact path="/settings" render={() => <Settings />} />
          <Route exact path="/about" render={() => <About />} />
          <Route exact path="/stats" render={() => <Stats />} />
          <Route render={() => <PageNotFound />} />
        {/* </SettingsProvider> */}
      </Switch>
    </section>
  );
}

export default App

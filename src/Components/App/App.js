import React from 'react';
import HomeContainer from '../HomeContainer/HomeContainer';
import { ViewProvider } from '../../Context/ViewContext'
import './App.css';
import Header from '../Header/Header';
import Settings from '../Settings/Settings'
import { SettingsProvider } from '../../Context/SettingsContext'

function App() {
  return (
    <section className="App">
      <Header />
      <SettingsProvider>
        <ViewProvider>
          <HomeContainer/>
        </ViewProvider>
        <Settings />
      </SettingsProvider>
    </section>
  )
}

export default App;

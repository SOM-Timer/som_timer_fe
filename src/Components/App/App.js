import React from 'react';
import HomeContainer from '../HomeContainer/HomeContainer';
import { ViewProvider } from '../../Context/ViewContext'
import './App.css';
import Header from '../Header/Header';

function App() {
  return (
    <section className="App">
      <Header />
      <ViewProvider>
        <HomeContainer/>
      </ViewProvider>
    </section>
  );
}

export default App;

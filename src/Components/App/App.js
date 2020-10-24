import React from 'react';
import './App.css';
import ContentDelivery from '../ContentDelivery/ContentDelivery'
import { VideoProvider } from '../../Context/VideoContext'

function App() {
  return (
    <VideoProvider>
      <ContentDelivery/>
    </VideoProvider>
  );
}

export default App;

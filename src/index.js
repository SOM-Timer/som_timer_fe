import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './Components/App/App';
import { ViewProvider } from './Context/ViewContext'
import { SettingsProvider } from './Context/SettingsContext'
import { SessionProvider } from './Context/SessionContext'
import { UserProvider } from './Context/UserContext'
import { BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Router>
    <UserProvider>
      <SettingsProvider>
        <ViewProvider>
          <SessionProvider>
            <App />
          </SessionProvider>
        </ViewProvider>
      </SettingsProvider>
    </UserProvider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

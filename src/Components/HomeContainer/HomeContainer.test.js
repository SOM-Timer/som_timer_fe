import React from 'react'
import HomeContainer from './HomeContainer.js'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ViewProvider } from '../../Context/ViewContext'
import { SettingsProvider } from '../../Context/SettingsContext'
import { SessionProvider } from '../../Context/SessionContext'
import { UserProvider, UserContext } from '../../Context/UserContext.js'

describe('HomeContainer', () => {
  it('should render the login page on load', () => {
    window.gapi = {
      signin2: {
        render: jest.fn()
      }
    }

    const { getByRole } = render (
      <UserProvider>
        <ViewProvider>
          <SettingsProvider>
            <SessionProvider>
              <HomeContainer/>
            </SessionProvider>
          </SettingsProvider>
        </ViewProvider>
      </UserProvider>
    )

    const welcomePrompt = getByRole('heading', { name: /welcome to som timer/i })
    const homePagePrompt = getByRole('heading', { name: /home page/i })
    const aboutPageHeader = getByRole('heading', { name: /about page/i })
    const settingsPageHeader = getByRole('heading', { name: /settings page/i })
    const statsPageHeader = getByRole('heading', { name: /stats page/i })

    expect(welcomePrompt).toBeInTheDocument()
    expect(homePagePrompt).toBeInTheDocument()
    expect(aboutPageHeader).toBeInTheDocument()
    expect(settingsPageHeader).toBeInTheDocument()
    expect(statsPageHeader).toBeInTheDocument()
  })

  it('should render the Timer view if a user is logged in', async () => {
    const { findByRole } = render (
      <UserContext.Provider value={[{userName: 'Fran', token:'200', userId: 3}]}>
        <ViewProvider>
          <SettingsProvider>
            <SessionProvider>
              <HomeContainer/>
            </SessionProvider>
          </SettingsProvider>
        </ViewProvider>
      </UserContext.Provider>
    )

    const startButton = await findByRole('button', { name: /start/i })
    const resetButton = await findByRole('button', { name: /reset/i })
    const skipButton = await findByRole('button', { name: /skip/i })

    expect(startButton).toBeInTheDocument()
    expect(resetButton).toBeInTheDocument()
    expect(skipButton).toBeInTheDocument()
  })
})
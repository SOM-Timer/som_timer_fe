import React from 'react'
import HomeContainer from './HomeContainer.js'
import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ViewProvider } from '../../Context/ViewContext'
import { SettingsProvider } from '../../Context/SettingsContext'
import { SessionProvider } from '../../Context/SessionContext'
import { UserProvider, UserContext } from '../../Context/UserContext'

describe('HomeContainer', () => {
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

    await waitFor(() => {
      expect(startButton).toBeInTheDocument()
      expect(resetButton).toBeInTheDocument()
      expect(skipButton).toBeInTheDocument()
    })
  })
})
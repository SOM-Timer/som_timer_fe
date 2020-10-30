import React from 'react'
import HomeContainer from './HomeContainer.js'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ViewProvider } from '../../Context/ViewContext'
import { SettingsProvider } from '../../Context/SettingsContext'

describe('HomeContainer', () => {
  //THIS TEST NEEDS TO BE EDITED ONCE HOMECONTAINER RENDERS ACTUALLY COUNTDOWNTIMER COMPONENT
  it('should render the Timer view on load', () => {
    const { getByRole } = render (
      <ViewProvider>
        <SettingsProvider>
          <HomeContainer/>
        </SettingsProvider>
      </ViewProvider>
    )

    const startButton = getByRole('button', { name: /start/i })
    const resetButton = getByRole('button', { name: /reset/i })
    const skipButton = getByRole('button', { name: /skip/i })

    expect(startButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
    expect(skipButton).toBeInTheDocument();
  })
})
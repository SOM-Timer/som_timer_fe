import React from 'react';
import { render } from '@testing-library/react'
import CountdownTimer from './CountdownTimer'
import { SettingsProvider } from '../../Context/SettingsContext'
import { ViewProvider } from '../../Context/ViewContext'

describe('CountdownTimer', () => {
  it('Should have the correct content when rendered', () => {
    const { getByRole } = render(
      <SettingsProvider>
        <ViewProvider>
          <CountdownTimer />
        </ViewProvider>
      </SettingsProvider>
    )

    const focusHeading = getByRole('heading', { name: 'Click ▶ to Begin Focusing'})
    const startButton = getByRole('button', { name: /start/i })
    const resetButton = getByRole('button', { name: /reset/i })
    const skipButton = getByRole('button', { name: /skip/i })

    expect(focusHeading).toBeInTheDocument()
    expect(startButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
    expect(skipButton).toBeInTheDocument();
  })
})
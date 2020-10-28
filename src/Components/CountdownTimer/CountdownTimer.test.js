import React from 'react';
import { render } from '@testing-library/react'
import CountdownTimer from './CountdownTimer'
import { SettingsProvider } from '../../Context/SettingsContext'
import { ViewProvider } from '../../Context/ViewContext'

describe('Timer', () => {
  it('Should have the correct content when rendered', () => {
    const { getByRole, getByText } = render(
      <SettingsProvider>
        <ViewProvider>
          <CountdownTimer />
        </ViewProvider>
      </SettingsProvider>
    )

    const startButton = getByRole('button', { name: /start/i })
    const resetButton = getByRole('button', { name: /reset/i })
    const pauseButton = getByRole('button', { name: /pause/i })
    const time = getByText('25:00')

    expect(startButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
    expect(pauseButton).toBeInTheDocument();
    expect(time).toBeInTheDocument();
  })
})
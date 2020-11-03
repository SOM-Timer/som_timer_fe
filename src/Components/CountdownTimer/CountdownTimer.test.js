import React from 'react';
import playAlertSound from '../../helpers/audioHelper'
import { displayNotification } from '../../helpers/notificationHelpers'
import { fireEvent, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import CountdownTimer from './CountdownTimer'
import { SettingsProvider } from '../../Context/SettingsContext'
import { ViewProvider } from '../../Context/ViewContext'
import { SessionProvider } from '../../Context/SessionContext'
import { getSettings } from '../../apiCalls'
jest.mock('../../apiCalls.js')

describe('CountdownTimer', () => {
  it('Should have the correct content when rendered', async () => {

    getSettings.mockResolvedValue({
      data: {
        id: 1,
        rest_interval: '5:00',
        work_interval: '0.1',
        sound: 'chordCliff'
      }
    })

    const { getByRole } = render(
      <SettingsProvider>
        <ViewProvider>
          <SessionProvider>
            <CountdownTimer />
          </SessionProvider>
        </ViewProvider>
      </SettingsProvider>
    )

    const focusHeading = await waitFor(() => getByRole('heading', { name: 'Click ▶ to Begin Focusing'}))
    const startButton = getByRole('button', { name: /start/i })
    const resetButton = getByRole('button', { name: /reset/i })
    const skipButton = getByRole('button', { name: /skip/i })

    expect(focusHeading).toBeInTheDocument()
    expect(startButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
    expect(skipButton).toBeInTheDocument();
  })

  it('should fire the appropriate functions when the timer runs out', async () => {

    getSettings.mockResolvedValue({
      data: {
        id: 1,
        rest_interval: '5:00',
        work_interval: '0.1',
        sound: 'chordCliff'
      }
    })

    const { getByRole } = render(
      <SettingsProvider>
        <ViewProvider>
          <SessionProvider>
            <CountdownTimer />
          </SessionProvider>
        </ViewProvider>
      </SettingsProvider>
    )

    const startButton = await waitFor(() => getByRole('button', { name: /start/i }))
    
    fireEvent.click(startButton)

    setTimeout(() => {
      expect(playAlertSound).toHaveBeenCalledTimes(1)
      expect(displayNotification).toHaveBeenCalledTimes(1)
      expect(playAlertSound).toHaveBeenCalledWith('chordCliff')
    }, 6000)
  })
})
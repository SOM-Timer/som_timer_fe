import React from 'react';
import { act } from 'react-dom/test-utils'
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom'
import { ViewProvider } from '../../Context/ViewContext'
import { VideoProvider } from '../../Context/VideoContext'
import { SettingsProvider } from '../../Context/SettingsContext'
import { MemoryRouter } from 'react-router-dom'
import { getSettings, updateSettings } from '../../apiCalls'
jest.mock('../../apiCalls.js')


describe('App', () => {
  it('should bring users to the timer view on load and allow them to visit the Stats, About, and Settings pages', async () => {

    getSettings.mockResolvedValue({
      data: {
        id: 1,
        rest_interval: '5',
        work_interval: '30'
      }
    })

    const { getByRole, getByAltText, getByText } = render(
      <MemoryRouter>
        <SettingsProvider>
          <ViewProvider>
            <VideoProvider>
              <App />
            </VideoProvider>
          </ViewProvider>
        </SettingsProvider>
      </MemoryRouter>
    )

    const timerLength = await waitFor(() => getByText(/30:00/i))
    const appHeading = getByRole('heading', { name: /som timer/i })
    const timerHeading = getByRole('heading', { name: /click ▶ to begin focusing/i })

    expect(timerLength).toBeInTheDocument()
    expect(appHeading).toBeInTheDocument()
    expect(timerHeading).toBeInTheDocument()

    const statsIcon = getByAltText('stats icon')
    fireEvent.click(statsIcon)

    const statsHeading = getByRole('heading', { name: /⏳ stats page coming soon! ⏳/i })

    expect(statsHeading).toBeInTheDocument()

    const aboutIcon = getByAltText('about icon')
    fireEvent.click(aboutIcon)

    const aboutHeading = getByRole('heading', { name: /about som timer/i })

    expect(aboutHeading).toBeInTheDocument()

    const settingsIcon = getByAltText('settings icon')
    fireEvent.click(settingsIcon)

    const settingsHeading = getByRole('heading', { name: /settings/i })

    expect(settingsHeading).toBeInTheDocument()

    const homeIcon = getByAltText('timer icon')
    fireEvent.click(homeIcon)

    const timerHeading2 = getByRole('heading', { name: /click ▶ to begin focusing/i })

    expect(timerHeading2).toBeInTheDocument()
  })

  it('should allow a user to update work interval in settings and see that reflected in the timer view', async () => {

    getSettings.mockResolvedValueOnce({
      data: {
        id: 1,
        rest_interval: '5',
        work_interval: '30'
      }
    })

    updateSettings.mockResolvedValue('Success!')

    const { getByRole, getByAltText, getByText } = render(
      <MemoryRouter>
        <SettingsProvider>
          <ViewProvider>
            <VideoProvider>
              <App />
            </VideoProvider>
          </ViewProvider>
        </SettingsProvider>
      </MemoryRouter>
    )

    const settingsIcon = getByAltText('settings icon')
    fireEvent.click(settingsIcon)

    const workIntervalInput = getByRole('spinbutton')
    
    fireEvent.blur(workIntervalInput, { target: { value: '45'}})

    const homeIcon = getByAltText('timer icon')
    fireEvent.click(homeIcon)

    const timerLength = await waitFor(() => getByText(/45:00/i))

    expect(timerLength).toBeInTheDocument()
  })
})
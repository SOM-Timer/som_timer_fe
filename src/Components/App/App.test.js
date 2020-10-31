import React from 'react';
import { render, fireEvent, getByAltText } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom'
import { ViewProvider } from '../../Context/ViewContext'
import { VideoProvider } from '../../Context/VideoContext'
import { SettingsProvider } from '../../Context/SettingsContext'
import { MemoryRouter } from 'react-router-dom'

describe('App', () => {
  it('should bring users to the timer view on load and allow them to visit the Stats, About, and Settings pages', () => {

    const { getByRole, getByAltText } = render(
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

    const appHeading = getByRole('heading', { name: /som timer/i })
    const timerHeading = getByRole('heading', { name: /click ▶ to begin focusing/i })

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

    expect(timerHeading).toBeInTheDocument()
  })
})
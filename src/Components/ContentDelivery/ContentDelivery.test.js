import React from 'react'
import ContentDelivery from './ContentDelivery.js'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { VideoProvider } from '../../Context/VideoContext'
import { ViewProvider } from '../../Context/ViewContext'
import { SessionProvider } from '../../Context/SessionContext'
import { SettingsProvider } from '../../Context/SettingsContext'

describe('ContentDelivery component', () => {
  it('should display a video player and skip button when rendered', () => {

    const { getByRole } = render(
      <BrowserRouter>
        <ViewProvider>
          <SessionProvider>
            <SettingsProvider>
              <VideoProvider>
                <ContentDelivery/>
              </VideoProvider>
            </SettingsProvider>
          </SessionProvider>
        </ViewProvider>
      </BrowserRouter>
    )

    const breakTitle = getByRole('heading', { name: /enjoy your break/i })
    const skipBtn = getByRole('button', { name: /skip break/i })

    expect(breakTitle).toBeInTheDocument()
    expect(skipBtn).toBeInTheDocument()
  });
})

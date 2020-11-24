import React from 'react'
import ContentDelivery from './ContentDelivery.js'
import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { VideoProvider } from '../../Context/VideoContext'
import { ViewProvider } from '../../Context/ViewContext'
import { SessionProvider } from '../../Context/SessionContext'
import { SettingsProvider } from '../../Context/SettingsContext'

describe('ContentDelivery component', () => {
  it('should display a video player and skip button when rendered', async () => {

    const { findByRole } = render(
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

    const breakTitle = await findByRole('heading', { name: /enjoy your break/i })
    const skipBtn = await findByRole('button', { name: /skip break/i })

    await waitFor(() => {
      expect(breakTitle).toBeInTheDocument()
      expect(skipBtn).toBeInTheDocument()
    })
  })
})

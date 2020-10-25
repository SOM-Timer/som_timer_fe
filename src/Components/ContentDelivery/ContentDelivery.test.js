import React from 'react'
import ContentDelivery from './ContentDelivery.js'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { VideoProvider } from '../../Context/VideoContext'
import { ViewProvider } from '../../Context/ViewContext'

describe('ContentDelivery component', () => {
  it('should display a video player and skip button when rendered', () => {

    const { getByRole } = render(
      <BrowserRouter>
      <ViewProvider>
          <VideoProvider>
            <ContentDelivery/>
          </VideoProvider>
        </ViewProvider>
      </BrowserRouter>
    )

    const breakTitle = getByRole('heading', { name: 'Enjoy Your Break!'})
    const skipBtn = getByRole('button', { name: 'Skip video' })

    expect(breakTitle).toBeInTheDocument()
    expect(skipBtn).toBeInTheDocument()
  });
})

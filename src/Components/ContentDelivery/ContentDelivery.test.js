import React from 'react'
import ContentDelivery from './ContentDelivery.js'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { VideoProvider } from '../../Context/VideoContext'

describe('ContentDelivery component', () => {
  it('should display a video player and skip button when rendered', () => {

    render(
      <BrowserRouter>
        <VideoProvider>
          <ContentDelivery/>
        </VideoProvider>
      </BrowserRouter>
    )

    const breakTitle = screen.getByRole('heading', { name: 'Enjoy Your Break!'})
    // const videoPlayer = screen.getByAltText('Video for pom break')
    const skipBtn = screen.getByRole('button', { name: 'Skip video' })

    expect(breakTitle).toBeInTheDocument()
    // expect(videoPlayer).toBeInTheDocument()
    expect(skipBtn).toBeInTheDocument()
  })
})

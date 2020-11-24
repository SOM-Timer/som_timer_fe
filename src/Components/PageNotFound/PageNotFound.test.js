import React from 'react'
import PageNotFound from './PageNotFound'
import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

describe('PageNotFound', () => {

  let toggleTimerView

  beforeEach(() => {
    toggleTimerView = jest.fn()
  })

  it('should display the correct content when rendered', async () => {
  
    const { findByRole, findByAltText, findByText } = render(
      <BrowserRouter>
        <PageNotFound toggleTimerView={toggleTimerView} />
      </BrowserRouter>
    )

    const notFoundHeading = await findByRole('heading', { name: 'Oops, we can\'t seem to find the page you\'re looking for!'})
    const notFoundImg = await findByAltText('distressed internet user')
    const helpfulLinksText = await findByText('Here are some helpful links to get you back on track:')
    const homeLink = await findByRole('link', { name: 'Home / Timer'})
    const settingsLink = await findByRole('link', { name: 'Settings'})
    const aboutLink = await findByRole('link', { name: 'About'})

    expect(notFoundHeading).toBeInTheDocument()
    expect(notFoundImg).toBeInTheDocument()
    expect(helpfulLinksText).toBeInTheDocument()
    expect(homeLink).toBeInTheDocument()
    expect(settingsLink).toBeInTheDocument()
    expect(aboutLink).toBeInTheDocument()
  })

  it('should hide the Homecontainer when rendered', async () => {

    render(
      <BrowserRouter>
        <PageNotFound toggleTimerView={toggleTimerView} />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(toggleTimerView).toHaveBeenCalledTimes(1)
      expect(toggleTimerView).toHaveBeenCalledWith(true)
    })
  })
})
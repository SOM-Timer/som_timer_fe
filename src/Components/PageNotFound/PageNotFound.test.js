import React from 'react'
import PageNotFound from './PageNotFound'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

describe('PageNotFound', () => {
  it('should display the correct content when rendered', () => {
    const { getByRole, getByAltText, getByText } = render(
      <BrowserRouter>
        <PageNotFound/>
      </BrowserRouter>
    )

    const notFoundHeading = getByRole('heading', { name: 'Oops, we can\'t seem to find the page you\'re looking for!'})
    const notFoundImg = getByAltText('distressed internet user')
    const helpfulLinksText = getByText('Here are some helpful links to get you back on track:')
    const homeLink = getByRole('link', { name: 'Home / Timer'})
    const settingsLink = getByRole('link', { name: 'Settings'})
    const aboutLink = getByRole('link', { name: 'About'})

    expect(notFoundHeading).toBeInTheDocument()
    expect(notFoundImg).toBeInTheDocument()
    expect(helpfulLinksText).toBeInTheDocument()
    expect(homeLink).toBeInTheDocument()
    expect(settingsLink).toBeInTheDocument()
    expect(aboutLink).toBeInTheDocument()
  })
})
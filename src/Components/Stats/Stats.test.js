import React from 'react'
import Stats from './Stats'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

describe('Stats', () => {
  it('should display the correct content when rendered', () => {

    const { getByRole, getByText } = render(
      <BrowserRouter>
        <Stats/>
      </BrowserRouter>
    )

    const statsHeading = getByRole('heading', { name: /stats page coming soon!/i })
    const comingSoonText = getByText(/check back soon/i);

    expect(statsHeading).toBeInTheDocument();
    expect(comingSoonText).toBeInTheDocument();
  })
})
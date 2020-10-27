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

    const statsHeading = getByRole('heading', { name: 'Stats Page Coming Soon!'})
    const comingSoonText = getByText('Check back soon for personal stats so you can see the positive impact Som Timer is having on your productivity and mental health.', { exact: false});

    expect(statsHeading).toBeInTheDocument();
    expect(comingSoonText).toBeInTheDocument();
  })
})
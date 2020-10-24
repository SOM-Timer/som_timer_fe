import React from 'react'
import Header from './Header'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'

describe('Header', () => {
  it('should display the correct content when rendered', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const title = getByRole('heading', { name: /som timer/i })
    const settingsButton = getByRole('button', {name: /settings/i})
    const statsButton = getByRole('button', {name: /stats/i})
    const timerButton = getByRole('button', {name: /timer/i})
    const aboutButton = getByRole('button', {name: /about/i})
    
    expect(title).toBeInTheDocument()
    expect(settingsButton).toBeInTheDocument()
    expect(statsButton).toBeInTheDocument()
    expect(timerButton).toBeInTheDocument()
    expect(aboutButton).toBeInTheDocument()
  })
})
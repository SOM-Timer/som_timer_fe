import React from 'react'
import Header from './Header'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'

describe('Header', () => {
  it('should display a title of "Som Timer"', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const title = getByRole('heading', { name: /som timer/i })

    expect(title).toBeInTheDocument()
  })

  it('should have a button to navigate to the settings page', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const settingsButton = getByRole('button', {name: /settings/i})

    expect(settingsButton).toBeInTheDocument()
  })

  it('should have a button to navigate to the stats page', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const statsButton = getByRole('button', {name: /stats/i})

    expect(statsButton).toBeInTheDocument()
  })

  it('should have a button to navigate to the main timer page', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const timerButton = getByRole('button', {name: /timer/i})

    expect(timerButton).toBeInTheDocument()
  })

  it('should have a button to navigate to the about page', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const aboutButton = getByRole('button', {name: /about/i})

    expect(aboutButton).toBeInTheDocument()
  })
})
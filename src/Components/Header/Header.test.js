import React from 'react'
import Header from './Header'
import { render, fireEvent } from '@testing-library/react'
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
})
import React from 'react'
import Stats from './Stats'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

describe('Stats', () => {

  let toggleTimerView

  beforeEach(() => {
    toggleTimerView = jest.fn()
  })

  it('should display the correct content when rendered', () => {
    
    const { getByRole, getByText } = render(
      <BrowserRouter>
        <Stats toggleTimerView={toggleTimerView} />
      </BrowserRouter>
    )

    const statsHeading = getByRole('heading', { name: /stats page coming soon!/i })
    const comingSoonText = getByText(/check back soon/i)

    expect(statsHeading).toBeInTheDocument()
    expect(comingSoonText).toBeInTheDocument()
    expect(toggleTimerView).toHaveBeenCalledTimes(1)
    expect(toggleTimerView).toHaveBeenCalledWith(true)
  })

  it('should hide the Homecontainer when rendered', () => {

    render(
      <BrowserRouter>
        <Stats toggleTimerView={toggleTimerView} />
      </BrowserRouter>
    )

    expect(toggleTimerView).toHaveBeenCalledTimes(1)
    expect(toggleTimerView).toHaveBeenCalledWith(true)
  })
})
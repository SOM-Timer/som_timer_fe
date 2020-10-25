import React from 'react'
import HomeContainer from './HomeContainer.js'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ViewProvider } from '../../Context/ViewContext'

describe('HomeContainer', () => {
  //THIS TEST NEEDS TO BE EDITED ONCE HOMECONTAINER RENDERS ACTUALLY COUNTDOWNTIMER COMPONENT
  it('should render the Timer view on load', () => {
    const { getByRole } = render (
      <ViewProvider>
        <HomeContainer/>
      </ViewProvider>
    )

    const heading = getByRole('heading', { name: 'Pom Timer View!'})

    expect(heading).toBeInTheDocument(); 
  })
})
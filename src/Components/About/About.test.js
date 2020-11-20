import React from 'react'
import About from './About'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('About', () => {

  let toggleTimerView

  beforeEach(() => {
    toggleTimerView = jest.fn()
  })

  it('should display the correct content when rendered', () => {
    const { getByRole, getByText } = render(<About toggleTimerView={toggleTimerView}/>)

    const aboutHeading = getByRole('heading', { name: /about som timer/i })
    const appDescription1 = getByText(/fight cognitive boredom and burnout/i)
    const appDescription2 = getByText(/mindfulness meditation and other somatic exercises have been linked to/i)
    const appDescription3 = getByText(/this timer is not affiliated with, associated with, or endorsed by the Pomodoro Technique® or its creator, Francesco Cirillo\./i)
    const frontEndHeading = getByRole('heading', { name: /front end engineers:/i })
    const frontEndEngineer1 = getByText(/aaron burris-deboskey/i)
    const frontEndEngineer2 = getByText(/jake west/i)
    const frontEndEngineer3 = getByText(/rachel williams/i)
    const backEndHeading = getByRole('heading', { name: /back end engineers:/i })
    const backEndEngineer1 = getByText(/chandler hulstrom/i)
    const backEndEngineer2 = getByText(/dorion/i)
    const backEndEngineer3 = getByText(/sienna kopf/i)

    expect(aboutHeading).toBeInTheDocument()
    expect(appDescription1).toBeInTheDocument() 
    expect(appDescription2).toBeInTheDocument() 
    expect(appDescription3).toBeInTheDocument() 
    expect(frontEndHeading).toBeInTheDocument()
    expect(frontEndEngineer1).toBeInTheDocument() 
    expect(frontEndEngineer2).toBeInTheDocument() 
    expect(frontEndEngineer3).toBeInTheDocument() 
    expect(backEndHeading).toBeInTheDocument()
    expect(backEndEngineer1).toBeInTheDocument()
    expect(backEndEngineer2).toBeInTheDocument()
    expect(backEndEngineer3).toBeInTheDocument()
  })

  it('should hide the Homecontainer when rendered', () => {

    render(<About toggleTimerView={toggleTimerView} />)

    expect(toggleTimerView).toHaveBeenCalledTimes(1)
    expect(toggleTimerView).toHaveBeenCalledWith(true)
  })
})
import React from 'react'
import About from './About'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('About', () => {
  it('should display the correct content when rendered', () => {

    const { getByRole, getByText } = render(<About/>)

    const aboutHeading = getByRole('heading', { name: 'About Som Timer'})
    const appDescription1 = getByText('Inspired by the Pomodoro Technique®, the practice of ', { exact: false})
    const appDescription2 = getByText('Mindfulness meditation and other somatic exercises have been linked to enhanced productivity', { exact: false})
    const appDescription3 = getByText('This timer is not affiliated with, associated with, or endorsed by the Pomodoro Technique® or its creator, Francesco Cirillo.')
    const frontEndHeading = getByRole('heading', { name: 'Front End Engineers:'})
    const frontEndEngineer1 = getByText('Aaron Burris-DeBoskey')
    const frontEndEngineer2 = getByText('Jake West')
    const frontEndEngineer3 = getByText('Rachel Williams')
    const backEndHeading = getByRole('heading', { name: 'Back End Engineers:' })
    const backEndEngineer1 = getByText('Chandler Hulstrom')
    const backEndEngineer2 = getByText('Dorion')
    const backEndEngineer3 = getByText('Sienna Kopf')

    expect(aboutHeading).toBeInTheDocument();
    expect(appDescription1).toBeInTheDocument(); 
    expect(appDescription2).toBeInTheDocument(); 
    expect(appDescription3).toBeInTheDocument(); 
    expect(frontEndHeading).toBeInTheDocument();
    expect(frontEndEngineer1).toBeInTheDocument(); 
    expect(frontEndEngineer2).toBeInTheDocument(); 
    expect(frontEndEngineer3).toBeInTheDocument(); 
    expect(backEndHeading).toBeInTheDocument();
    expect(backEndEngineer1).toBeInTheDocument();
    expect(backEndEngineer2).toBeInTheDocument();
    expect(backEndEngineer3).toBeInTheDocument();
  })
})
import React from 'react'
import ContentSelection from './ContentSelection'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('ContentSelection', () => {

  it('should ask the user what kind of break they\'d like to take', () => {
    const { getByRole } = render(<ContentSelection />)
    
    const contentPrompt = getByRole('heading', { name: /how would you like to spend your break?/i })

    expect(contentPrompt).toBeInTheDocument()
  })

  it('should display the correct buttons', () => {
    const { getByRole } = render(<ContentSelection />)

    const yogaMovementButton = getByRole('button', { name: /yoga\/movement/i })
    const somaticExerciseButton = getByRole('button', { name: /somatic exercise/i })
    const breathworkMeditationButton = getByRole('button', { name: /breathwork\/meditation/i })

    expect(yogaMovementButton).toBeInTheDocument()
    expect(somaticExerciseButton).toBeInTheDocument()
    expect(breathworkMeditationButton).toBeInTheDocument()
  })
})
import React from 'react'
import ContentSelection from './ContentSelection'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('ContentSelection', () => {
  it('should display the correct contents when rendered', () => {
    const { getByRole } = render(<ContentSelection />)

    const yogaMovementButton = getByRole('button', { name: /yoga\/movement/i })
    const somaticExerciseButton = getByRole('button', { name: /somatic exercise/i })
    const breathworkMeditationButton = getByRole('button', { name: /breathwork\/meditation/i })

    expect(yogaMovementButton).toBeInTheDocument()
    expect(somaticExerciseButton).toBeInTheDocument()
    expect(breathworkMeditationButton).toBeInTheDocument()
  })
})
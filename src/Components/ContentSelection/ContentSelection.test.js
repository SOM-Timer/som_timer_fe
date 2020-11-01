import React from 'react'
import ContentSelection from './ContentSelection'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ViewProvider } from '../../Context/ViewContext'
import { VideoProvider } from '../../Context/VideoContext'
import { SettingsProvider } from '../../Context/SettingsContext'

describe('ContentSelection', () => {

  it('should display the correct content when rendered', () => {
    const { getByRole } = render(
      <SettingsProvider>
        <ViewProvider>
          <VideoProvider>
            <ContentSelection />
          </VideoProvider>
        </ViewProvider>
      </SettingsProvider>
    )
    
    const contentPrompt = getByRole('heading', { name: /how would you like to spend your break?/i })
    const yogaMovementButton = getByRole('button', { name: /yoga\/movement/i })
    const somaticExerciseButton = getByRole('button', { name: /somatic exercise/i })
    const breathworkMeditationButton = getByRole('button', { name: /breathwork\/meditation/i })

    expect(contentPrompt).toBeInTheDocument()
    expect(yogaMovementButton).toBeInTheDocument()
    expect(somaticExerciseButton).toBeInTheDocument()
    expect(breathworkMeditationButton).toBeInTheDocument()
  })
})
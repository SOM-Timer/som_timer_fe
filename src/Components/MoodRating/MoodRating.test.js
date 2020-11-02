import React from 'react'
import { render } from '@testing-library/react'
import MoodRating from './MoodRating'

describe('MoodRating', () => {
  it('Should have the correct content when rendered', () => {
    const { getByRole } = render(
      <MoodRating />
    )

    const moodHeading = getByRole('heading', /Please select a face/i)
    const moodRating1 = getByRole('button', { name: /1/ })
    const moodRating2 = getByRole('button', { name: /2/ })
    const moodRating3 = getByRole('button', { name: /3/ })
    const moodRating4 = getByRole('button', { name: /4/ })
    const moodRating5 = getByRole('button', { name: /5/ })
    const submitButton = getByRole('button', { name: /Submit/})
    
    expect(moodHeading).toBeInTheDocument()
    expect(moodRating1).toBeInTheDocument()
    expect(moodRating2).toBeInTheDocument()
    expect(moodRating3).toBeInTheDocument()
    expect(moodRating4).toBeInTheDocument()
    expect(moodRating5).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })
})
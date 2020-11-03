import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import MoodRating from './MoodRating'
import { ViewProvider } from '../../Context/ViewContext'
import { SessionProvider } from '../../Context/SessionContext'
import { postSession } from '../../apiCalls'
jest.mock('../../apiCalls')

describe('MoodRating', () => {
  it('Should have the correct content when rendered', () => {
    const { getByRole } = render(
        <ViewProvider>
          <SessionProvider>
            <MoodRating />
          </SessionProvider>
        </ViewProvider>
    )

    const moodHeading = getByRole('heading', /please select a face/i)
    const moodRating1 = getByRole('button', { name: /1 out of 5/ })
    const moodRating2 = getByRole('button', { name: /2 out of 5/ })
    const moodRating3 = getByRole('button', { name: /3 out of 5/ })
    const moodRating4 = getByRole('button', { name: /4 out of 5/ })
    const moodRating5 = getByRole('button', { name: /5 out of 5/ })
    const submitButton = getByRole('button', { name: /Submit/})
    
    expect(moodHeading).toBeInTheDocument()
    expect(moodRating1).toBeInTheDocument()
    expect(moodRating2).toBeInTheDocument()
    expect(moodRating3).toBeInTheDocument()
    expect(moodRating4).toBeInTheDocument()
    expect(moodRating5).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('Should provide an error message if the form is submitted without a selected value', () => {
    const { getByRole, getByText } = render(
      <ViewProvider>
        <SessionProvider>
          <MoodRating />
        </SessionProvider>
      </ViewProvider>
    )

    const submitButton = getByRole('button', { name: /Submit/ })
    fireEvent.click(submitButton)
    const errorMessage = getByText(/please select an option above to continue/i)

    expect(errorMessage).toBeInTheDocument()
  })

  it('Should clear the error message once a user selects an option', () => {
    const { getByRole, getByText } = render(
      <ViewProvider>
        <SessionProvider>
          <MoodRating />
        </SessionProvider>
      </ViewProvider>
    )

    const submitButton = getByRole('button', { name: /Submit/ })
    fireEvent.click(submitButton)
    const errorMessage = getByText(/please select an option above to continue/i)
    
    expect(errorMessage).toBeInTheDocument()

    const moodIcon4 = getByRole('button', { name: /4/})
    fireEvent.click(moodIcon4)
    
    expect(errorMessage).not.toBeInTheDocument()
  })
})
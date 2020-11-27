import React from 'react'
import Stats from './Stats'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { getAllSessions } from '../../apiCalls'
jest.mock('../../apiCalls')

describe('Stats', () => {

  let toggleTimerView

  beforeEach(() => {
    toggleTimerView = jest.fn()
    getAllSessions.mockResolvedValue(
      {
        "data":  {
          "count": 6,
          "rests": [
            {
              "id": 1,
              "mood_rating_1": 1,
              "mood_rating_2": 5,
              "content_selected": "MEDITATION",
              "focus_interval": "25",
              "rest_interval": "5"
            },
            {
              "id": 2,
              "mood_rating_1": 2,
              "mood_rating_2": 4,
              "content_selected": "MEDITATION",
              "focus_interval": "45",
              "rest_interval": "15"
            },
            {
              "id": 3,
              "mood_rating_1": 4,
              "mood_rating_2": 5,
              "content_selected": "SOMATIC",
              "focus_interval": "30",
              "rest_interval": "7"
            },
            {
              "id": 4,
              "mood_rating_1": 1,
              "mood_rating_2": 3,
              "content_selected": "SOMATIC",
              "focus_interval": "25",
              "rest_interval": "5"
            },
            {
              "id": 5,
              "mood_rating_1": 2,
              "mood_rating_2": 5,
              "content_selected": "MOVEMENT",
              "focus_interval": "25",
              "rest_interval": "5"
            },
            {
              "id": 6,
              "mood_rating_1": 1,
              "mood_rating_2": 3,
              "content_selected": "MOVEMENT",
              "focus_interval": "30",
              "rest_interval": "15"
            },
          ]
        }
      }
    )
  })

  it('should display the correct content when rendered', () => {
    
    const { getByRole, getByText } = render(
      <BrowserRouter>
        <Stats toggleTimerView={toggleTimerView} />
      </BrowserRouter>
    )

    const statsHeading = getByRole('heading', { name: /usage/i })
    const somaticExerciseLabel = getByText(/somatic exercises/i)
    const movementLabel = getByText(/yoga\/movement/i)
    const meditationLabel = getByText(/meditation\/breathwork/i)

    expect(statsHeading).toBeInTheDocument()
    expect(somaticExerciseLabel).toBeInTheDocument()
    expect(movementLabel).toBeInTheDocument()
    expect(meditationLabel).toBeInTheDocument()
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
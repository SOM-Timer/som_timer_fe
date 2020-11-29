import React from 'react'
import Stats from './Stats'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { getAllSessions } from '../../apiCalls'
import { UserContext } from '../../Context/UserContext'
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
              "rest_interval": "5",
              "user_id": 4
            },
            {
              "id": 2,
              "mood_rating_1": 2,
              "mood_rating_2": 4,
              "content_selected": "SOMATIC",
              "focus_interval": "45",
              "rest_interval": "15",
              "user_id": 4
            },
            {
              "id": 3,
              "mood_rating_1": 4,
              "mood_rating_2": 5,
              "content_selected": "SOMATIC",
              "focus_interval": "30",
              "rest_interval": "7",
              "user_id": 4
            },
            {
              "id": 4,
              "mood_rating_1": 1,
              "mood_rating_2": 3,
              "content_selected": "SOMATIC",
              "focus_interval": "25",
              "rest_interval": "5",
              "user_id": 4
            },
            {
              "id": 5,
              "mood_rating_1": 2,
              "mood_rating_2": 5,
              "content_selected": "MOVEMENT",
              "focus_interval": "25",
              "rest_interval": "5",
              "user_id": 4
            },
            {
              "id": 6,
              "mood_rating_1": 1,
              "mood_rating_2": 3,
              "content_selected": "MOVEMENT",
              "focus_interval": "30",
              "rest_interval": "15",
              "user_id": 4
            },
          ]
        }
      }
    )
  })

  it('should display the correct content when rendered', async () => {
    
    const { findByRole, getByText, getAllByText } = render(
      <BrowserRouter>
        <UserContext.Provider value={[{
          userName: "Cher",
          email: "cher@gmail.com",
          userId: 4
        }]}>
          <Stats toggleTimerView={toggleTimerView} />
        </UserContext.Provider>
      </BrowserRouter>
    )

    const statsHeading = await findByRole('heading', { name: /usage/i })
    const somaticExerciseLabel = getAllByText(/somatic exercises/i)
    const movementLabel = getAllByText(/yoga\/movement/i)
    const meditationLabel = getAllByText(/meditation\/breathwork/i)
    const sessionCountText = getByText(/you have completed/i)
    const averageFocusIntervalText = getByText(/average focus interval/i)
    const averageRestIntervalText = getByText(/average rest interval/i)
    const averageMoodText = getAllByText(/average mood/i)
    const beforeRestText = getAllByText(/before rest interval/i)
    const afterRestText = getAllByText(/after rest interval/i)

    expect(statsHeading).toBeInTheDocument()
    expect(somaticExerciseLabel).toHaveLength(2)
    expect(movementLabel).toHaveLength(2)
    expect(meditationLabel).toHaveLength(2)
    expect(sessionCountText).toBeInTheDocument()
    expect(averageFocusIntervalText).toBeInTheDocument()
    expect(averageRestIntervalText).toBeInTheDocument()
    expect(averageMoodText).toHaveLength(3)
    expect(beforeRestText).toHaveLength(3)
    expect(afterRestText).toHaveLength(3)
  })

  it('should render the correct frequency statistics on load', async() => {
    
    const { findByText, findByTestId } = render(
      <BrowserRouter>
        <UserContext.Provider value={[{
          userName: "Cher",
          email: "cher@gmail.com",
          userId: 4
        }]}>
          <Stats toggleTimerView={toggleTimerView} />
        </UserContext.Provider>
      </BrowserRouter>
    )

    const somaticPercentage = await findByText(/50%/i)
    const movementPercentage = await findByText(/33%/i)
    const meditationPercentage = await findByText(/17%/i)
    const sessionCount = await findByTestId(/sessionCount/i)
    const focusIntervalAverage = await findByTestId(/focusIntervalAverage/i)
    const restIntervalAverage = await findByTestId(/restIntervalAverage/i)

    expect(somaticPercentage).toBeInTheDocument()
    expect(movementPercentage).toBeInTheDocument()
    expect(meditationPercentage).toBeInTheDocument()
    expect(sessionCount).toBeInTheDocument()
    expect(focusIntervalAverage).toBeInTheDocument()
    expect(restIntervalAverage).toBeInTheDocument()
  })

  it('should render the correct mood statistics on load', async() => {
    const { findByTestId } = render(
      <BrowserRouter>
        <UserContext.Provider value={[{
          userName: "Cher",
          email: "cher@gmail.com",
          userId: 4
        }]}>
          <Stats toggleTimerView={toggleTimerView} />
        </UserContext.Provider>
      </BrowserRouter>
    )
    const somaticMood1Average = await findByTestId(/somaticMood1/i)
    const movementMood1Average = await findByTestId(/movementMood1/i)
    const meditationMood1Average = await findByTestId(/meditationMood1/i)
    const somaticMood2Average = await findByTestId(/somaticMood2/i)
    const movementMood2Average = await findByTestId(/movementMood2/i)
    const meditationMood2Average = await findByTestId(/meditationMood2/i)

    expect(somaticMood1Average).toBeInTheDocument()
    expect(somaticMood2Average).toBeInTheDocument()
    expect(movementMood1Average).toBeInTheDocument()
    expect(movementMood2Average).toBeInTheDocument()
    expect(meditationMood1Average).toBeInTheDocument()
    expect(meditationMood2Average).toBeInTheDocument()
  })

  it('should hide the Homecontainer when rendered', () => {

    render(
      <BrowserRouter>
        <UserContext.Provider value={[{
          userName: "Cher",
          email: "cher@gmail.com",
          userId: 4
        }]}>
          <Stats toggleTimerView={toggleTimerView} />
        </UserContext.Provider>
      </BrowserRouter>
    )

    expect(toggleTimerView).toHaveBeenCalledTimes(1)
    expect(toggleTimerView).toHaveBeenCalledWith(true)
  })
})
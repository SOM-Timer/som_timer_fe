import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom'
import { ViewProvider } from '../../Context/ViewContext'
import { VideoProvider } from '../../Context/VideoContext'
import { SettingsProvider } from '../../Context/SettingsContext'
import { SessionProvider } from '../../Context/SessionContext'
import { MemoryRouter } from 'react-router-dom'
import { UserProvider, UserContext } from '../../Context/UserContext'
import { getSettings, updateSettings, getRandomContent, postSession } from '../../apiCalls'
jest.mock('../../apiCalls.js')

describe('App', () => {

  beforeEach(() => {
    window.gapi = {
      signin2: {
        render: jest.fn()
      }
    }
  })

  it('should bring users to the timer view on load and allow them to visit the Stats, About, and Settings pages', async () => {

    getSettings.mockResolvedValue({
      data: {
        id: 1,
        rest_interval: '5',
        work_interval: '30',
        sound: 'chordCliff'
      }
    })

    const { getByRole, getByAltText, getByText } = render(
      <MemoryRouter>
        <UserContext.Provider
          value={[{ userName: "Fran", token: "200", userId: 3 }]}
        >
          <SettingsProvider>
            <ViewProvider>
              <SessionProvider>
                <VideoProvider>
                  <App />
                </VideoProvider>
              </SessionProvider>
            </ViewProvider>
          </SettingsProvider>
        </UserContext.Provider>
      </MemoryRouter>
    )

    const timerLength = await waitFor(() => getByText(/30:00/i))
    const appHeading = getByRole('heading', { name: /som timer/i })
    const timerHeading = getByRole('heading', { name: /click ▶ to begin focusing/i })

    expect(timerLength).toBeInTheDocument()
    expect(appHeading).toBeInTheDocument()
    expect(timerHeading).toBeInTheDocument()

    const statsIcon = getByAltText('stats icon')
    fireEvent.click(statsIcon)

    const statsHeading = getByRole('heading', { name: /stats page coming soon!/i })

    expect(statsHeading).toBeInTheDocument()

    const aboutIcon = getByAltText('about icon')
    fireEvent.click(aboutIcon)

    const aboutHeading = getByRole('heading', { name: /about som timer/i })

    expect(aboutHeading).toBeInTheDocument()

    const settingsIcon = getByAltText('settings icon')
    fireEvent.click(settingsIcon)

    const settingsHeading = getByRole('heading', { name: /settings/i })

    expect(settingsHeading).toBeInTheDocument()

    const homeIcon = getByAltText('timer icon')
    fireEvent.click(homeIcon)

    const timerHeading2 = getByRole('heading', { name: /click ▶ to begin focusing/i })

    expect(timerHeading2).toBeInTheDocument()
  })

  it('should allow a user to update work interval in settings and see that reflected in the timer view', async () => {

    getSettings.mockResolvedValueOnce({
      data: {
        id: 1,
        rest_interval: '5',
        work_interval: '30',
        sound: 'chordCliff'
      }
    })

    updateSettings.mockResolvedValue('Success!')

    const { getByRole, getByAltText, getByText } = render(
      <MemoryRouter>
        <UserContext.Provider
          value={[{ userName: "Fran", token: "200", userId: 3 }]}
        >
          <SettingsProvider>
            <ViewProvider>
              <SessionProvider>
                <VideoProvider>
                  <App />
                </VideoProvider>
              </SessionProvider>
            </ViewProvider>
          </SettingsProvider>
        </UserContext.Provider>
      </MemoryRouter>
    )

    const settingsIcon = getByAltText('settings icon')
    fireEvent.click(settingsIcon)

    const workIntervalInput = getByRole('spinbutton')
    
    fireEvent.blur(workIntervalInput, { target: { value: '45'}})

    const homeIcon = getByAltText('timer icon')
    fireEvent.click(homeIcon)

    const timerLength = await waitFor(() => getByText(/45:00/i))

    expect(timerLength).toBeInTheDocument()
  })

  it('should take you to a mood rating screen when the timer is skipped if mood is enabled', async () => {
    getSettings.mockResolvedValueOnce({
      data: {
        id: 1,
        rest_interval: '5',
        work_interval: '30',
        sound: 'reverbSplash',
        mood: true
      }
    })

    const { getByRole } = render(
      <MemoryRouter>
        <UserContext.Provider
          value={[{ userName: "Fran", token: "200", userId: 3 }]}
        >
          <SettingsProvider>
            <ViewProvider>
              <SessionProvider>
                <VideoProvider>
                  <App />
                </VideoProvider>
              </SessionProvider>
            </ViewProvider>
          </SettingsProvider>
        </UserContext.Provider>
      </MemoryRouter>
    )

    const skipIcon = await waitFor(() => getByRole('button', { name: /skip/i }))

    fireEvent.click(skipIcon)

    const moodRatingHeading = getByRole('heading', { name: /how are you feeling right now?/i })

    expect(moodRatingHeading).toBeInTheDocument()
  })

  it('should take you to the content selection screen when the timer is skipped if mood is disabled', async () => {
    getSettings.mockResolvedValueOnce({
      data: {
        id: 1,
        rest_interval: '5',
        work_interval: '30',
        sound: 'reverbSplash',
        mood: false
      }
    })

    const { getByRole } = render(
      <MemoryRouter>
        <UserContext.Provider
          value={[{ userName: "Fran", token: "200", userId: 3 }]}
        >
          <SettingsProvider>
            <ViewProvider>
              <SessionProvider>
                <VideoProvider>
                  <App />
                </VideoProvider>
              </SessionProvider>
            </ViewProvider>
          </SettingsProvider>
        </UserContext.Provider>
      </MemoryRouter>
    )

    const skipIcon = await waitFor(() => getByRole('button', { name: /skip/i }))

    fireEvent.click(skipIcon)

    const contentSelectionHeading = getByRole('heading', { name: /how would you like to spend your break\?/i })

    expect(contentSelectionHeading).toBeInTheDocument()
  })

  it('should take you to a content selection screen after the first mood rating when mood is enabled', async () => {
    getSettings.mockResolvedValueOnce({
      data: {
        id: 1,
        rest_interval: '5',
        work_interval: '30',
        sound: 'reverbSplash',
        mood: true
      }
    })

    const { getByRole } = render(
      <MemoryRouter>
        <UserContext.Provider
          value={[{ userName: "Fran", token: "200", userId: 3 }]}
        >
          <SettingsProvider>
            <ViewProvider>
              <SessionProvider>
                <VideoProvider>
                  <App />
                </VideoProvider>
              </SessionProvider>
            </ViewProvider>
          </SettingsProvider>
        </UserContext.Provider>
      </MemoryRouter>
    )

    
    const skipIcon = await waitFor(() => getByRole('button', { name: /skip/i }))
    
    fireEvent.click(skipIcon)

    const moodRating1 = getByRole('button', { name: /1 out of 5/ })
    const submitButton = getByRole('button', { name: /submit/i })

    fireEvent.click(moodRating1)
    fireEvent.click(submitButton)

    const contentSelectionHeading = getByRole('heading', { name: /how would you like to spend your break\?/i })

    expect(contentSelectionHeading).toBeInTheDocument()
  })

  it('should allow a user to select the category of somatic content when mood rating 1 is complete, and then receive somatic content', async () => {
    getSettings.mockResolvedValueOnce({
      data: {
        id: 1,
        rest_interval: '5',
        work_interval: '30',
        sound: 'reverbSplash',
        mood: true
      }
    })

    getRandomContent.mockResolvedValue({
      data: {
        category: "SomaticCategory.SOMATIC",
        duration: "5:00",
        id: 1,
        url: "https://www.youtube.com/watch?v=dsmfIAyiois"
      }
    })

    const { getByRole } = render(
      <MemoryRouter>
        <UserContext.Provider
          value={[{ userName: "Fran", token: "200", userId: 3 }]}
        >
          <SettingsProvider>
            <ViewProvider>
              <SessionProvider>
                <VideoProvider>
                  <App />
                </VideoProvider>
              </SessionProvider>
            </ViewProvider>
          </SettingsProvider>
        </UserContext.Provider>
      </MemoryRouter>
    )

    const skipIcon = await waitFor(() => getByRole('button', { name: /skip/i }))

    fireEvent.click(skipIcon)

    const moodRating1 = getByRole('button', { name: /1 out of 5/ })
    const submitButton = getByRole('button', { name: /submit/i })

    fireEvent.click(moodRating1)
    fireEvent.click(submitButton)

    const somaticBtn = getByRole('button', { name: /somatic exercise/i })

    fireEvent.click(somaticBtn)

    const contentDeliveryHeading = await waitFor(() => getByRole('heading', { name: /enjoy your break!/i }))
    
    expect(contentDeliveryHeading).toBeInTheDocument()
  })

  it('should allow a user to select breathwork/meditation content and receive meditation content', async () => {
    getSettings.mockResolvedValueOnce({
      data: {
        id: 1,
        rest_interval: '5',
        work_interval: '30',
        sound: 'reverbSplash',
        mood: false
      }
    })

    //change to meditation video 
    getRandomContent.mockResolvedValue({
      data: {
        category: "SomaticCategory.SOMATIC",
        duration: "5:00",
        id: 1,
        url: "https://www.youtube.com/watch?v=dsmfIAyiois"
      }
    })

    const { getByRole } = render(
      <MemoryRouter>
        <UserContext.Provider
          value={[{ userName: "Fran", token: "200", userId: 3 }]}
        >
          <SettingsProvider>
            <ViewProvider>
              <SessionProvider>
                <VideoProvider>
                  <App />
                </VideoProvider>
              </SessionProvider>
            </ViewProvider>
          </SettingsProvider>
        </UserContext.Provider>
      </MemoryRouter>
    )

    const skipIcon = await waitFor(() => getByRole('button', { name: /skip/i }))

    fireEvent.click(skipIcon)

    const meditationBtn = getByRole('button', { name: /breathwork\/meditation/i })

    fireEvent.click(meditationBtn)

    const contentDeliveryHeading = await waitFor(() => getByRole('heading', { name: /enjoy your break!/i }))

    expect(contentDeliveryHeading).toBeInTheDocument()
  })

  it('should allow a user to select yoga/movement content when mood rating 1 is complete and receive yoga/movement content', async () => {
    getSettings.mockResolvedValueOnce({
      data: {
        id: 1,
        rest_interval: '5',
        work_interval: '30',
        sound: 'reverbSplash',
        mood: true
      }
    })

    //get yoga video back 
    getRandomContent.mockResolvedValue({
      data: {
        category: "SomaticCategory.SOMATIC",
        duration: "5:00",
        id: 1,
        url: "https://www.youtube.com/watch?v=dsmfIAyiois"
      }
    })

    const { getByRole } = render(
      <MemoryRouter>
        <UserContext.Provider
          value={[{ userName: "Fran", token: "200", userId: 3 }]}
        >
          <SettingsProvider>
            <ViewProvider>
              <SessionProvider>
                <VideoProvider>
                  <App />
                </VideoProvider>
              </SessionProvider>
            </ViewProvider>
          </SettingsProvider>
        </UserContext.Provider>
      </MemoryRouter>
    )

    const skipIcon = await waitFor(() => getByRole('button', { name: /skip/i }))

    fireEvent.click(skipIcon)

    const moodRating1 = getByRole('button', { name: /1 out of 5/ })
    const submitButton = getByRole('button', { name: /submit/i })

    fireEvent.click(moodRating1)
    fireEvent.click(submitButton)

    const yogaBtn = getByRole('button', { name: /yoga\/movement/i })

    fireEvent.click(yogaBtn)

    const contentDeliveryHeading = await waitFor(() => getByRole('heading', { name: /enjoy your break!/i }))

    expect(contentDeliveryHeading).toBeInTheDocument()
  })

  it('if mood is enabled, should allow a user to select content when the timer runs down, mood rating 1 is complete, & then see the video, skip it, and be taken to mood rating 2', async () => {
    getSettings.mockResolvedValueOnce({
      data: {
        id: 1,
        rest_interval: '5',
        work_interval: '30',
        sound: 'reverbSplash',
        mood: true
      }
    })

    getRandomContent.mockResolvedValue({
      data: {
        category: "SomaticCategory.MOVEMENT",
        duration: "5:00",
        id: 1,
        url: "https://www.youtube.com/watch?v=dsmfIAyiois"
      }
    })

    const { getByRole } = render(
      <MemoryRouter>
        <UserContext.Provider
          value={[{ userName: "Fran", token: "200", userId: 3 }]}
        >
          <SettingsProvider>
            <ViewProvider>
              <SessionProvider>
                <VideoProvider>
                  <App />
                </VideoProvider>
              </SessionProvider>
            </ViewProvider>
          </SettingsProvider>
        </UserContext.Provider>
      </MemoryRouter>
    )

    const skipIcon = await waitFor(() => getByRole('button', { name: /skip/i }))

    fireEvent.click(skipIcon)

    const moodRating1 = getByRole('button', { name: /1 out of 5/ })
    const submitButton = getByRole('button', { name: /submit/i })

    fireEvent.click(moodRating1)
    fireEvent.click(submitButton)

    const yogaBtn = getByRole('button', { name: /yoga\/movement/i })

    fireEvent.click(yogaBtn)

    const skipVideoBtn = await waitFor(() => getByRole('button', { name: /skip break/i }))

    fireEvent.click(skipVideoBtn)

    const moodHeading = getByRole('heading', { name: /how are you feeling right now?/i })

    expect(moodHeading).toBeInTheDocument()
  })

  it('if mood is disabled, should allow a user to select content when the timer runs down, then see the video, skip it, and see a transition modal', async () => {
    getSettings.mockResolvedValueOnce({
      data: {
        id: 1,
        rest_interval: '5',
        work_interval: '30',
        sound: 'reverbSplash',
        mood: false
      }
    })

    getRandomContent.mockResolvedValue({
      data: {
        category: "SomaticCategory.MOVEMENT",
        duration: "5:00",
        id: 1,
        url: "https://www.youtube.com/watch?v=dsmfIAyiois"
      }
    })

    const { getByRole } = render(
      <MemoryRouter>
        <UserContext.Provider
          value={[{ userName: "Fran", token: "200", userId: 3 }]}
        >
          <SettingsProvider>
            <ViewProvider>
              <SessionProvider>
                <VideoProvider>
                  <App />
                </VideoProvider>
              </SessionProvider>
            </ViewProvider>
          </SettingsProvider>
        </UserContext.Provider>
      </MemoryRouter>
    )

    const skipIcon = await waitFor(() => getByRole('button', { name: /skip/i }))

    fireEvent.click(skipIcon)

    const yogaBtn = getByRole('button', { name: /yoga\/movement/i })

    fireEvent.click(yogaBtn)

    const skipVideoBtn = await waitFor(() => getByRole('button', { name: /skip break/i }))

    fireEvent.click(skipVideoBtn)

    const modalContent = getByRole('heading', { name: /you're doing great\. get ready to focus\./i })

    expect(modalContent).toBeInTheDocument()
  })

  it('should display the FocusModal text & make a post request with session data once the user has completed a full cycle including mood ratings', async () => {
    getSettings.mockResolvedValueOnce({
      data: {
        id: 1,
        rest_interval: '5',
        work_interval: '30',
        sound: 'reverbSplash',
        mood: true
      }
    })

    getRandomContent.mockResolvedValue({
      data: {
        category: "SomaticCategory.MOVEMENT",
        duration: "5:00",
        id: 1,
        url: "https://www.youtube.com/watch?v=dsmfIAyiois"
      }
    })

    postSession.mockResolvedValueOnce({
      "id": 1,
      "mood_rating_1": 1,
      "mood_rating_2": 5,
      "content_selected": "MOVEMENT",
      "focus_interval": "30",
      "rest_interval": "5"
    })

    const { getByRole } = render(
      <MemoryRouter>
        <UserContext.Provider
          value={[{ userName: "Fran", token: "200", userId: 3 }]}
        >
          <SettingsProvider>
            <ViewProvider>
              <SessionProvider>
                <VideoProvider>
                  <App />
                </VideoProvider>
              </SessionProvider>
            </ViewProvider>
          </SettingsProvider>
        </UserContext.Provider>
      </MemoryRouter>
    )

    const skipIcon = await waitFor(() => getByRole('button', { name: /skip/i }))

    fireEvent.click(skipIcon)

    const moodRating1 = getByRole('button', { name: /1 out of 5/ })
    const moodSubmitButton1 = getByRole('button', { name: /submit/i })

    fireEvent.click(moodRating1)
    fireEvent.click(moodSubmitButton1)

    const yogaBtn = getByRole('button', { name: /yoga\/movement/i })

    fireEvent.click(yogaBtn)

    const skipVideoBtn = await waitFor(() => getByRole('button', { name: /skip break/i }))

    fireEvent.click(skipVideoBtn)

    const moodRating2 = getByRole('button', { name: /5 out of 5/ })
    const moodSubmitButton2 = getByRole('button', { name: /submit/i })

    fireEvent.click(moodRating2)
    fireEvent.click(moodSubmitButton2)
    
    const modalText = getByRole('heading', { name: /get ready to focus/i })

    expect(modalText).toBeInTheDocument()
    expect(postSession).toBeCalled()
    expect(postSession).toBeCalledWith({
      moodRating1: "1",
      moodRating2: "5",
      contentSelected: "MOVEMENT",
      //we expect timer to return 0 for focusInterval when skipped immediately
      focusInterval: "0.00",
      restInterval: "5"
    })
  })
})
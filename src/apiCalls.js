import axios from 'axios'
const rootUrl = 'https://som-timer-be.herokuapp.com/api'

export const getSettings = () => {
  return axios.get(`${rootUrl}/timers/1`)
}

export const updateSettings = (settings) => {
  return axios.put(`${rootUrl}/timers/1`, {
    work_interval: settings.workInterval,
    rest_interval: settings.breakInterval,
    sound: settings.sound
  })
}

export const getRandomContent = (duration, category) => {
  return axios.get(`${rootUrl}/rand_exercise?duration=${duration}&category=${category}`)
}

export const postSession = (session) => {
  console.log(session)
  return axios.post(`${rootUrl}/rests`, {
    focus_interval: session.focusInterval,
    mood_rating_1: session.moodRating1,
    content_selected: session.contentSelected,
    rest_interval: session.restInterval,
    mood_rating_2: session.moodRating2
  })
}
import axios from 'axios'
const rootUrl = 'https://som-timer-be.herokuapp.com/api'

export const getSettings = (userId) => {
  return axios.get(`${rootUrl}/users/${userId}/timer`)
}

export const updateSettings = (settings, userId) => {
  return axios.put(`${rootUrl}/users/${userId}/timer`, {
    work_interval: settings.workInterval,
    rest_interval: settings.breakInterval,
    sound: settings.sound,
    mood: settings.moodRating,
    user_id: userId
  })
}

export const getRandomContent = (duration, category) => {
  return axios.get(`${rootUrl}/rand_exercise?duration=${duration}&category=${category}`)
}

export const postSession = (session, userId) => {
  return axios.post(`${rootUrl}/users/${userId}/rests`, {
    focus_interval: session.focusInterval,
    mood_rating_1: session.moodRating1,
    content_selected: session.contentSelected,
    rest_interval: session.restInterval,
    mood_rating_2: session.moodRating2,
    user_id: userId
  })
}

export const loginUser = (userName, email) => {
  return axios.post(`${rootUrl}/users`, {
    user_name: userName,
    email
  })
}
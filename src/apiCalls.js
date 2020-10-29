import axios from 'axios'
const rootUrl = 'https://som-timer-be.herokuapp.com/api'

export const getSettings = () => {
  return axios.get(`${rootUrl}/timers/1`)
}

export const updateSettings = (settings) => {
  return axios.put(`${rootUrl}/timers/1`, {
    work_interval: settings.workInterval,
    rest_interval: settings.breakInterval
  })
}

export const getRandomContent = (duration, category) => {
  return axios.get(`${rootUrl}/rand_exercise?duration=${duration}&category=${category}`)
}
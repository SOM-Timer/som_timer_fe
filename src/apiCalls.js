import axios from 'axios'
const rootUrl = 'https://som-timer-be.herokuapp.com'

export const getSettings = () => {
  return axios.get('https://som-timer-be.herokuapp.com/api/timers/1')
}

export const updateSettings = (settings) => {
  return axios.put('https://som-timer-be.herokuapp.com/api/timers/1', {
    work_interval: settings.workInterval,
    rest_interval: settings.breakInterval
  })
}

export const getRandomContent = (duration, category) => {
  return axios.get(`${rootUrl}/api/rand_exercise`, {
    //I think this body just be { duration, category }! (copied documentation for now)
    "duration": duration,
    "category": category,
  })
}
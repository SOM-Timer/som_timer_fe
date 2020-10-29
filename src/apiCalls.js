import axios from 'axios'

export const getSettings = () => {
  return axios.get('https://som-timer-be.herokuapp.com/api/timers/1')
}

export const updateSettings = (settings) => {
  return axios.put('https://som-timer-be.herokuapp.com/api/timers/1', {
    work_interval: settings.workInterval,
    rest_interval: settings.breakInterval
  })
}
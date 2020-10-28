import axios from 'axios'

export const getSettings = () => {
  return axios.get('https://som-timer-be.herokuapp.com/api/timers/1')
}
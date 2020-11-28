import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import style from './Stats.module.scss'
import { getAllSessions } from '../../apiCalls'
import { PieChart } from 'react-minimal-pie-chart'

const Stats = ({ toggleTimerView }) => {
  const [ sessionLog, setSessionLog ] = useState([])
  const [ pieChartData, setPieChartData ] = useState([])
  const [ frequencyStatistics, setFrequencyStatistics ] = useState({
    sessionCount: 0,
    averageFocusInterval: 0,
    averageRestInterval: 0
  })
  const [ mood1Statistics, setMood1Statistics ] = useState({
    somatic: 0,
    movement: 0,
    meditation: 0
  })
  const [ mood2Statistics, setMood2Statistics ] = useState({
    somatic: 0,
    movement: 0,
    meditation: 0
  })

  useEffect(() => {
    toggleTimerView(true)
    getAllSessions(1)
    .then(results => results.data)
    .then(results => {
      setSessionLog(results.rests)
      createPieChart(results.rests)
      setFrequencyStatistics({
        ...frequencyStatistics,
        sessionCount: results.count,
        averageFocusInterval: getAverageInterval('focus_interval', results.rests),
        averageRestInterval: getAverageInterval('rest_interval', results.rests)
      })
      setMood1Statistics({
        ...mood1Statistics,
        somatic: getAverageMood('SOMATIC', results.rests, 'mood_rating_1'),
        movement: getAverageMood('MOVEMENT', results.rests, 'mood_rating_1'),
        meditation: getAverageMood('MEDITATION', results.rests, 'mood_rating_1')
      })
      setMood2Statistics({
        ...mood2Statistics,
        somatic: getAverageMood('SOMATIC', results.rests, 'mood_rating_2'),
        movement: getAverageMood('MOVEMENT', results.rests, 'mood_rating_2'),
        meditation: getAverageMood('MEDITATION', results.rests, 'mood_rating_2')
      })
    })
    .catch(error => console.log(error))
  }, [])

  const createPieChart = (rests) => {
    const newPieChartData = { 
      somaticTotal: 0, 
      movementTotal: 0, 
      meditationTotal: 0 
    }

    for(let i = 0; i < rests.length; i++) {
      if(rests[i]['content_selected'] === 'MOVEMENT') {
        newPieChartData.movementTotal += 1
      }
      if (rests[i]['content_selected'] === 'SOMATIC') {
        newPieChartData.somaticTotal += 1
      }
      if (rests[i]['content_selected'] === 'MEDITATION') {
        newPieChartData.meditationTotal += 1
      }
    }

    return setPieChartData(newPieChartData)
  }

  const getAverageInterval = (intervalType, sessions) => {
    let intervalSum = sessions.reduce((sum, session) => {
      if (session[intervalType]) {
        let num = parseFloat(session[intervalType])
        let newSum = sum + num
        return newSum
      }
    }, 0)

    return intervalSum / sessions.length
  }

  const getAverageMood = (contentSelected, sessions, moodRating) => {
    let sessionData = sessions.reduce((data, session) => {
      if(session.content_selected === contentSelected) {
        let num = parseInt(session[moodRating])
        let newSum = data[0] + num
        let newCount = data[1] + 1
        data = [newSum, newCount]
      }
      return data

    }, [0, 0])

    return sessionData[0] / sessionData[1]
  }

  return (
    <>
      <h2 className={style.prompt}>Usage</h2>
      <div className={style.frequencyStatisticsContainer}>
        <section className={style.pieChartContainer}>
          <PieChart
            data={
              [
                { title: 'Yoga', value: pieChartData.movementTotal, color: '#F4D2D0'},
                { title: 'Meditation', value: pieChartData.meditationTotal, color: '#7987A1' },
                { title: 'Somatics', value: pieChartData.somaticTotal, color: '#FFFFFF' },
              ]
            }
            style={{ height: '250px' }}
            lineWidth={60}
            labelStyle={{ fontSize: '12px', fontWeight: '600' }}
            label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
            labelPosition={68}
            className={style.pieChart}
          />
          <section className={style.pieChartLegend}>
            <div className={style.labelContainer}>
              <p className={style.legendLabel}>Somatic Exercises</p>
              <div className={style.somaticLabelSwatch} />
            </div>
            <div className={style.labelContainer}>
              <p className={style.legendLabel}>Yoga/Movement </p>
              <div className={style.movementLabelSwatch} />
            </div>
            <div className={style.labelContainer}>
              <p className={style.legendLabel}>Meditation/Breathwork</p>
              <div className={style.meditationLabelSwatch} />
            </div>
          </section>
        </section>
        <section className={style.frequencyModalsContainer}>
          <h3 className={style.frequencyModal}>
            You have completed
            <h2 
              className={style.frequencyStatisticValue} data-testid='sessionCount'
            >
              {frequencyStatistics.sessionCount}
            </h2>
            sessions
          </h3>
          <h3 className={style.frequencyModal}>
            Average focus interval
            <h2 
              className={style.frequencyStatisticValue} data-testid='focusIntervalAverage'
            >
              {frequencyStatistics.averageFocusInterval.toFixed(2)}
            </h2>
            in minutes
          </h3>
          <h3 className={style.frequencyModal}>
            Average rest interval
            <h2 
              className={style.frequencyStatisticValue} 
              data-testid='restIntervalAverage'
            >
              {frequencyStatistics.averageRestInterval.toFixed(2)}
            </h2>
            in minutes
          </h3>
        </section>
      </div>
      <section className={style.moodStatisticsContainer}>
        
      </section>
    </>
  )
}

export default Stats
Stats.propTypes = {
  toggleTimerView: PropTypes.func
}
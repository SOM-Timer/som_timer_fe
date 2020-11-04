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

  useEffect(() => {
    toggleTimerView(true)
    getAllSessions()
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
        console.log(num)
        let newSum = sum + num
        console.log(newSum)
        return newSum
      }
    }, 0)

    return intervalSum / sessions.length
  }

  return (
    <>
      <div className={style.frequencyStatisticsContainer}>
        <section className={style.pieChart}>
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
            <h2 className={style.frequencyStatisticValue}>{frequencyStatistics.sessionCount}</h2>
            sessions
          </h3>
          <h3 className={style.frequencyModal}>
            Average focus interval
            <h2 className={style.frequencyStatisticValue}>{frequencyStatistics.averageFocusInterval}</h2>
            in minutes
          </h3>
          <h3 className={style.frequencyModal}>
            Average rest interval
            <h2 className={style.frequencyStatisticValue}>{frequencyStatistics.averageRestInterval.toFixed(2)}</h2>
            in minutes
          </h3>
        </section>
      </div>
      <article>
        <h2 className={style.prompt}>
          <span role="img" alt="hourglass emoji" aria-label="hourglass emoji">
            ⏳
        </span>{" "}
        Stats Page Coming Soon!{" "}
          <span role="img" alt="hourglass emoji" aria-label="hourglass emoji">
            ⏳
        </span>
        </h2>
        <section className={style.statsDesc}>
          <div className={style.line}></div>
          <p>
            <strong className={style.strong}>Check back soon</strong> for personal
          stats, so you can see the positive impact Som Timer is having on your
          productivity and mental health. Stats will include data such as a log
          of pom cycles taken, mood and engagement tracking, and what types of
          content work best for you!
        </p>
          <div className={style.line}></div>
        </section>
      </article>
    </>
  )
}

export default Stats
Stats.propTypes = {
  toggleTimerView: PropTypes.func
}
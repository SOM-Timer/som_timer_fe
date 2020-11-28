import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import style from './Stats.module.scss'
import { getAllSessions } from '../../apiCalls'
import { PieChart } from 'react-minimal-pie-chart'
import moodIcon1 from '../../assets/moodIcons/moodIcon1.png'
import moodIcon2 from '../../assets/moodIcons/moodIcon2.png'
import moodIcon3 from '../../assets/moodIcons/moodIcon3.png'
import moodIcon4 from '../../assets/moodIcons/moodIcon4.png'
import moodIcon5 from '../../assets/moodIcons/moodIcon5.png'

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

  const determineFace = (moodStatistic) => {
    if (moodStatistic >= 0.5 && moodStatistic < 1.5) {
      return {
        icon: moodIcon1, 
        color: '#9A031E'
      }
    } else if (moodStatistic >= 1.5 && moodStatistic < 2.5) {
      return {
        icon: moodIcon2, 
        color: '#DF6407'
      }
    } else if (moodStatistic >= 2.5 && moodStatistic < 3.5) {
      return { 
        icon: moodIcon3, 
        color: '#DFAC07'
      }
    } else if (moodStatistic >= 3.5 && moodStatistic < 4.5) {
      return {
        icon: moodIcon4, 
        color: '#55A630'
      }
    } else if (moodStatistic >= 4.5 && moodStatistic <= 5) {
      return {
        icon: moodIcon5, 
        color: '#007F5F'
      }
    }
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
        <section className={style.frequencyWidgetsContainer}>
          <h3 className={style.frequencyWidget}>
            You have completed
            <h2 
              className={style.frequencyStatisticValue} data-testid='sessionCount'
            >
              {frequencyStatistics.sessionCount}
            </h2>
            sessions
          </h3>
          <h3 className={style.frequencyWidget}>
            Average focus interval
            <h2 
              className={style.frequencyStatisticValue} data-testid='focusIntervalAverage'
            >
              {frequencyStatistics.averageFocusInterval.toFixed(2)}
            </h2>
            in minutes
          </h3>
          <h3 className={style.frequencyWidget}>
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
      <section className={style.moodWidgetsContainer}>
        <h4 className={style.moodWidget}>
          Somatic Exercises
          <p className={style.moodAverageLabel}>
            Average Mood
          </p>
          <div className={style.moodStatsContainer}>
            <div className={style.moodStatsSection}>
              <p className={style.moodWidgetLabel}>
                Before rest interval
              </p>
              {mood1Statistics.somatic > 0 &&
                <img
                  src={determineFace(mood1Statistics.somatic).icon}
                  className={style.moodIcon}
                  style={{ backgroundColor: determineFace(mood1Statistics.somatic).color}}
                />
              }
              <p 
                className={style.moodStatisticValue}
                data-testid='somaticMood1'
              >
                {mood1Statistics.somatic.toFixed(2)}
              </p>
            </div>
            <div className={style.moodStatsSection}>
              <p className={style.moodWidgetLabel}>
                After rest interval
              </p>
              {mood2Statistics.somatic > 0 &&
                <img
                  src={determineFace(mood2Statistics.somatic).icon}
                  className={style.moodIcon}
                  style={{ backgroundColor: determineFace(mood2Statistics.somatic).color }}
                />
              }
              <p
                className={style.moodStatisticValue}
                data-testid='somaticMood2'
              >
                {mood2Statistics.somatic.toFixed(2)}
              </p>
            </div>
          </div>
        </h4>
        <h4 className={style.moodWidget}>
          Yoga/Movement
          <p className={style.moodAverageLabel}>
            Average Mood
          </p>
          <div className={style.moodStatsContainer}>
            <div className={style.moodStatsSection}>
              <p className={style.moodWidgetLabel}>
                Before rest interval
              </p>
              {mood1Statistics.movement > 0 &&
                <img
                  src={determineFace(mood1Statistics.movement).icon}
                  className={style.moodIcon}
                  style={{ backgroundColor: determineFace(mood1Statistics.movement).color }}
                />
              }
              <p 
                className={style.moodStatisticValue}
                data-testid='movementMood1'
              >
                {mood1Statistics.movement.toFixed(2)}
              </p>
            </div>
            <div className={style.moodStatsSection}>
              <p className={style.moodWidgetLabel}>
                After rest interval
              </p>
              {mood2Statistics.movement > 0 &&
                <img
                  src={determineFace(mood2Statistics.movement).icon}
                  className={style.moodIcon}
                  style={{ backgroundColor: determineFace(mood2Statistics.movement).color }}
                />
              }
              <p 
                className={style.moodStatisticValue}
                data-testid='movementMood2'
              >
                {mood2Statistics.movement.toFixed(2)}
              </p>
            </div>
          </div>
        </h4>
        <h4 className={style.moodWidget}>
          Meditation/Breathwork
          <p className={style.moodAverageLabel}>
            Average Mood
          </p>
          <div className={style.moodStatsContainer}>
            <div className={style.moodStatsSection}>
              <p className={style.moodWidgetLabel}>
                Before rest interval
              </p>
              {mood1Statistics.meditation > 0 &&
                <img
                  src={determineFace(mood1Statistics.meditation).icon}
                  className={style.moodIcon}
                  style={{ backgroundColor: determineFace(mood1Statistics.meditation).color }}
                />
              }
              <p 
                className={style.moodStatisticValue}
                data-testid='meditationMood1'
              >
                {mood1Statistics.meditation.toFixed(2)}
              </p>
            </div>
            <div className={style.moodStatsSection}>
              <p className={style.moodWidgetLabel}>
                After rest interval
              </p>
              {mood2Statistics.meditation > 0 &&
                <img
                  src={determineFace(mood2Statistics.meditation).icon}
                  className={style.moodIcon}
                  style={{ backgroundColor: determineFace(mood2Statistics.meditation).color }}
                />
              }
              <p 
                className={style.moodStatisticValue}
                data-testid='meditationMood2'
              >
                {mood2Statistics.meditation.toFixed(2)}
              </p>
            </div>
          </div>
        </h4>
      </section>
    </>
  )
}

export default Stats
Stats.propTypes = {
  toggleTimerView: PropTypes.func
}
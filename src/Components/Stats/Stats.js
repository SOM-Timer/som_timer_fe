import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import style from './Stats.module.scss'
import { getAllSessions } from '../../apiCalls'
import { PieChart } from 'react-minimal-pie-chart'
import moodIcon1 from '../../assets/moodIcons/moodIcon1.png'
import moodIcon2 from '../../assets/moodIcons/moodIcon2.png'
import moodIcon3 from '../../assets/moodIcons/moodIcon3.png'
import moodIcon4 from '../../assets/moodIcons/moodIcon4.png'
import moodIcon5 from '../../assets/moodIcons/moodIcon5.png'
import { UserContext } from '../../Context/UserContext'

const Stats = ({ toggleTimerView }) => {
  const [ sessionLog, setSessionLog ] = useState([])
  const [ pieChartData, setPieChartData ] = useState({
    SOMATIC: 0,
    MOVEMENT: 0,
    MEDITATION: 0
  })
  const [ frequencyStatistics, setFrequencyStatistics ] = useState({
    sessionCount: 0,
    averageFocusInterval: 0,
    averageRestInterval: 0
  })
  const [ moodStatistics, setMoodStatistics ] = useState({
    somaticAverageMood1: 0,
    movementAverageMood1: 0,
    meditationAverageMood1: 0,
    somaticAverageMood2: 0,
    movementAverageMood2: 0,
    meditationAverageMood2: 0
  })
  const [ user ] = useContext(UserContext)

  useEffect(() => {
    toggleTimerView(true)
    getAllSessions(user.userId)
    .then(results => results.data)
    .then(results => calculatePersonalStatistics(results))
    .catch(error => console.log(error))
  }, [])

  const calculatePersonalStatistics = (results) => {
    setSessionLog(results.rests)
    createPieChart(results.rests)
    setFrequencyStatistics({
      ...frequencyStatistics,
      sessionCount: results.count,
      averageFocusInterval: getAverageInterval('focus_interval', results.rests),
      averageRestInterval: getAverageInterval('rest_interval', results.rests)
    })
    setMoodStatistics({
      ...moodStatistics,
      somaticAverageMood1: getAverageMood('SOMATIC', results.rests, 'mood_rating_1'),
      movementAverageMood1: getAverageMood('MOVEMENT', results.rests, 'mood_rating_1'),
      meditationAverageMood1: getAverageMood('MEDITATION', results.rests, 'mood_rating_1'),
      somaticAverageMood2: getAverageMood('SOMATIC', results.rests, 'mood_rating_2'),
      movementAverageMood2: getAverageMood('MOVEMENT', results.rests, 'mood_rating_2'),
      meditationAverageMood2: getAverageMood('MEDITATION', results.rests, 'mood_rating_2')
    })
  }

  const createPieChart = (rests) => {
    const newPieChartData = { 
      SOMATIC: 0, 
      MOVEMENT: 0, 
      MEDITATION: 0 
    }

    rests.forEach(rest => {
      const category = rest.content_selected
      return newPieChartData[category] += 1
    })

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
        if(session[moodRating]) {
          let num = parseInt(session[moodRating])
          let newSum = data[0] + num
          let newCount = data[1] + 1
          data = [newSum, newCount] 
        }
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
      <h2 className={style.prompt}>Personal Statistics</h2>
      {sessionLog.length ? 
        <>
          <div className={style.frequencyStatisticsContainer}>
            <section className={style.pieChartContainer}>
              <PieChart
                data={
                  [
                    { title: 'Yoga', value: pieChartData['MOVEMENT'], color: '#F4D2D0'},
                    { title: 'Meditation', value: pieChartData['MEDITATION'], color: '#7987A1' },
                    { title: 'Somatics', value: pieChartData['SOMATIC'], color: '#FFFFFF' },
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
                  {moodStatistics.somaticAverageMood1 > 0 &&
                    <img
                      src={determineFace(moodStatistics.somaticAverageMood1).icon}
                      className={style.moodIcon}
                      style={{ backgroundColor: determineFace(moodStatistics.somaticAverageMood1).color}}
                    />
                  }
                  <p 
                    className={style.moodStatisticValue}
                    data-testid='somaticMood1'
                  >
                    {moodStatistics.somaticAverageMood1.toFixed(2)}
                  </p>
                </div>
                <div className={style.line} />
                <div className={style.moodStatsSection}>
                  <p className={style.moodWidgetLabel}>
                    After rest interval
                  </p>
                  {moodStatistics.somaticAverageMood2 > 0 &&
                    <img
                      src={determineFace(moodStatistics.somaticAverageMood2).icon}
                      className={style.moodIcon}
                      style={{ backgroundColor: determineFace(moodStatistics.somaticAverageMood2).color }}
                    />
                  }
                  <p
                    className={style.moodStatisticValue}
                    data-testid='somaticMood2'
                  >
                    {moodStatistics.somaticAverageMood2.toFixed(2)}
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
                  {moodStatistics.movementAverageMood1 > 0 &&
                    <img
                      src={determineFace(moodStatistics.movementAverageMood1).icon}
                      className={style.moodIcon}
                      style={{ backgroundColor: determineFace(moodStatistics.movementAverageMood1).color }}
                    />
                  }
                  <p 
                    className={style.moodStatisticValue}
                    data-testid='movementMood1'
                  >
                    {moodStatistics.movementAverageMood1.toFixed(2)}
                  </p>
                </div>
                <div className={style.line} />
                <div className={style.moodStatsSection}>
                  <p className={style.moodWidgetLabel}>
                    After rest interval
                  </p>
                  {moodStatistics.movementAverageMood2 > 0 &&
                    <img
                      src={determineFace(moodStatistics.movementAverageMood2).icon}
                      className={style.moodIcon}
                      style={{ backgroundColor: determineFace(moodStatistics.movementAverageMood2).color }}
                    />
                  }
                  <p 
                    className={style.moodStatisticValue}
                    data-testid='movementMood2'
                  >
                    {moodStatistics.movementAverageMood2.toFixed(2)}
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
                  {moodStatistics.meditationAverageMood1 > 0 &&
                    <img
                      src={determineFace(moodStatistics.meditationAverageMood1).icon}
                      className={style.moodIcon}
                      style={{ backgroundColor: determineFace(moodStatistics.meditationAverageMood1).color }}
                    />
                  }
                  <p 
                    className={style.moodStatisticValue}
                    data-testid='meditationMood1'
                  >
                    {moodStatistics.meditationAverageMood1.toFixed(2)}
                  </p>
                </div>
                <div className={style.line} />
                <div className={style.moodStatsSection}>
                  <p className={style.moodWidgetLabel}>
                    After rest interval
                  </p>
                  {moodStatistics.meditationAverageMood2 > 0 &&
                    <img
                      src={determineFace(moodStatistics.meditationAverageMood2).icon}
                      className={style.moodIcon}
                      style={{ backgroundColor: determineFace(moodStatistics.meditationAverageMood2).color }}
                    />
                  }
                  <p 
                    className={style.moodStatisticValue}
                    data-testid='meditationMood2'
                  >
                    {moodStatistics.meditationAverageMood2.toFixed(2)}
                  </p>
                </div>
              </div>
            </h4>
          </section>
        </> :
        <h2 className={style.newUserMessage}>
          You don't have any information to display yet! Spend some time using Som Timer and then visit this page again to see your Stats.
        </h2>
      }
    </>
  )
}

export default Stats
Stats.propTypes = {
  toggleTimerView: PropTypes.func
}
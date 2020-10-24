import React from 'react';
import Timer from 'react-compound-timer';
import style from './Timer.module.scss';

// const COLOR_CODES = {
//     info: {
//         color: '#F4D2D0',
//     }
// }

// let remainingPathColor = COLOR_CODES.info.color

const CountdownTimer = (props) => {
    // const calculateTimeFraction = () => {
    //     let timeLeft = this.context.value.m * 60 + this.context.value * 1000
    //     return timeLeft / props.initTime
    // }

    // const setCircleDashArray =() => {
    //     const circleDashArray = `${(
    //         calculateTimeFraction() * 283).toFixed(0)} 283`;
    //         document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', circleDashArray)
    // }

    return (
        <div className={style.countdownTimer}>
            <Timer 
                direction='backward'
                initialTime={props.initTime}
                lastUnit='m'
                startImmediately={false}
                formatValue={(value) => `${(value < 10? `0${value}` : value)}`}
            >
                {({ start, pause, reset }) => (
                    <>
                        <div className={style.baseTimer}>
                            <svg className={style.baseTimerSvg} viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
                                <g className={style.baseTimerCircle}>
                                    <circle className={style.baseTimerPathElapsed} cx='50' cy='50' r='45' />
                                    <path
                                        id='base-timer-path-remaining'
                                        strokeDasharray='283'
                                        className={style.baseTimerPathRemaining}
                                        d="
                                            M 50, 50
                                            m -45, 0
                                            a 45,45 0 1,0 90,0
                                            a 45,45 0 1,0 -90,0
                                        "
                                    />
                                </g>
                            </svg>
                            <p className={style.baseTimerLabel}>{<Timer.Minutes />}:{<Timer.Seconds />}</p>
                        </div>
                        <div className={style.timerControls}>
                            <button className={style.timerControlButton} onClick={() => {
                                start();
                                // setCircleDashArray();
                            }}>
                                Start
                            </button>
                            <button className={style.timerControlButton} onClick={pause}>Pause</button>
                            <button className={style.timerControlButton} onClick={reset}>Reset</button>
                        </div>
                    </>
                )}
            </Timer>
        </div>
    )
}

export default CountdownTimer;
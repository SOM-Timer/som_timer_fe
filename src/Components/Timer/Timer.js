import React from 'react'
import Timer from 'react-compound-timer'

const CountdownTimer = () => {
    return (
        <div>
            <Timer 
                direction='backward'
                initialTime={300000}
                lastUnit='m'
                startImmediately={false}
                formatValue={(value) => `${(value < 10? `0${value}` : value)}`}
            >
                {({ start, pause, reset, value }) => (
                    <>
                        <div>
                            <p>{<Timer.Minutes formatValue={value} />}:{<Timer.Seconds formatValue={value} />}</p>
                        </div>
                        <div>
                            <button onClick={start}>Start</button>
                            <button onClick={pause}>Pause</button>
                            <button onClick={reset}>Reset</button>
                        </div>
                    </>
                )}
            </Timer>
        </div>
    )
}

export default CountdownTimer;
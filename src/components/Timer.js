import React, { useState } from 'react'
import StartButton from './StartButton'
import LapButton from './LapButton'
import ResetButton from './ResetButton'
import PauseButton from './PauseButton'
import ResumeButton from './ResumeButton'

export default function Timer(props) {
  const [time, setTime] = useState({ minutes: 0, seconds: 0, milliseconds: 0 })
  const [paused, setPaused] = useState(false)
  const [started, setStarted] = useState(false)
  const [lapList, setLapList] = useState([])

  function start() {
    setStarted(true)
    window.interval = setInterval(() => {
      setTime((prev) => {
        if (prev.seconds === 59)
          return { ...prev, minutes: prev.minutes + 1, seconds: 0 }
        if (prev.milliseconds === 99)
          return { ...prev, seconds: prev.seconds + 1, milliseconds: 0 }
        else
          return { ...prev, milliseconds: prev.milliseconds + 1 }
      })
    }, 10)
  }
  function reset() {
    setLapList([])
    setPaused(false)
    setStarted(false)
    clearInterval(window.interval)
    setTime(() => {
      return { minutes: 0, seconds: 0, milliseconds: 0 }
    })
  }

  function pause() {
    setPaused(true)
    clearInterval(window.interval)
  }
  function resume() {
    setPaused(false)
    start();
  }
  function lap() {
    setLapList((prev) => {
      return (
        [...prev, time]
      )
    })
  }
  return (
    <>
      <h1 className="clock">{time.minutes < 10 ? `0${time.minutes}` : time.minutes}:{time.seconds < 10 ? `0${time.seconds}` : time.seconds}:{time.milliseconds < 10 ? `0${time.milliseconds}` : time.milliseconds}</h1>
      {
        started ?
          <div className="buttonConatiner">
            {paused ? <ResumeButton resume={resume} /> : <PauseButton pause={pause} />}
            {paused ? <ResetButton reset={reset} /> : <LapButton lap={lap} />}
          </div> :
          <div>
            <StartButton start={start} started={started} />
          </div>
      }

      {
        lapList.length ?
          <div className="lapContainer">
            <div className="lapItem">
              <div className="lap">Lap</div>
              <div className="lap">Lap Time</div>
              <div className="lap">Overall Time</div>
            </div>
            {
              lapList.map((val, i, arr) => {
                return (
                  <div className="lapItem" key={i}>
                    <div className="lap">{i + 1 < 10 ? `0${i + 1}` : i + 1}</div>
                    {
                      !i
                        ?
                        <div className="lap">{val.minutes < 10 ? `0${val.minutes}` : val.minutes}:{val.seconds < 10 ? `0${val.seconds}` : val.seconds}:{val.milliseconds < 10 ? `0${val.milliseconds}` : val.milliseconds}</div>
                        :

                        <div className="lap">
                          {Math.abs(val.minutes - arr[i - 1].minutes) < 10 ? `0${Math.abs(val.minutes - arr[i - 1].minutes)}` : Math.abs(val.minutes - arr[i - 1].minutes)}:
                          {Math.abs(val.seconds - arr[i - 1].seconds) < 10 ? `0${Math.abs(val.seconds - arr[i - 1].seconds)}` : Math.abs(val.seconds - arr[i - 1].seconds)}:
                          {Math.abs(val.milliseconds - arr[i - 1].milliseconds) < 10 ? `0${Math.abs(val.milliseconds - arr[i - 1].milliseconds)}` : Math.abs(val.milliseconds - arr[i - 1].milliseconds)}</div>
                    }
                    <div className="lap">{val.minutes < 10 ? `0${val.minutes}` : val.minutes}:{val.seconds < 10 ? `0${val.seconds}` : val.seconds}:{val.milliseconds < 10 ? `0${val.milliseconds}` : val.milliseconds}</div>
                  </div>

                )
              })
            }
          </div> : null
      }
    </>
  )

}
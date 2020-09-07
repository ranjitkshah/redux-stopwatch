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
        if (prev.milliseconds === 99)
          return { minutes: prev.minutes, seconds: prev.seconds + 1, milliseconds: 0 }
        if (prev.seconds === 59)
          return { minutes: prev.minutes + 1, seconds: prev.seconds + 1, milliseconds: prev.milliseconds }
        else
          return { minutes: prev.minutes, seconds: prev.seconds, milliseconds: prev.milliseconds + 1 }
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
      console.log(prev);
      return (
        [...prev, time]
      )
    })
  }
  return (
    <>
      <h1>{time.minutes < 10 ? `0${time.minutes}` : time.minutes}:{time.seconds < 10 ? `0${time.seconds}` : time.seconds}:{time.milliseconds < 10 ? `0${time.milliseconds}` : time.milliseconds}</h1>
      {
        started ?
          <div>
            {paused ? <ResumeButton resume={resume} /> : <PauseButton pause={pause} />}
            {paused ? <ResetButton reset={reset} /> : <LapButton lap={lap} />}
          </div> :
          <div>
            <StartButton start={start} started={started} />
          </div>
      }

      {
        lapList.map((val) => {
          return (
            <h6>{val.minutes < 10 ? `0${val.minutes}` : val.minutes}:{val.seconds < 10 ? `0${val.seconds}` : val.seconds}:{val.milliseconds < 10 ? `0${val.milliseconds}` : val.milliseconds}</h6>
          )
        })
      }

    </>
  )

}
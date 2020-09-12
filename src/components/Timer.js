import React, { useState } from 'react'
import StartButton from './StartButton'
import LapButton from './LapButton'
import ResetButton from './ResetButton'
import PauseButton from './PauseButton'
import ResumeButton from './ResumeButton'
import { connect } from 'react-redux'
import { pausedAct, startedAct, lapListAct, timeResetAct, timeAct, resetListAct } from '../redux/action'

function Timer({ paused, started, time, lapList, timeAct, pausedAct, resetListAct, startedAct, lapListAct, timeResetAct }) {

  function start() {
    startedAct();
    window.interval = setInterval(() => {
      timeAct();
    }, 10)
  }

  function reset() {
    resetListAct()
    pausedAct()
    startedAct()
    clearInterval(window.interval)
    timeResetAct()
  }

  function pause() {
    pausedAct()
    clearInterval(window.interval)
  }
  function resume() {
    startedAct();
    pausedAct();
    start();
  }
  function lap() {
    lapListAct()
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

const mapStateToProps = (state) => {
  return {
    time: state.time,
    paused: state.paused,
    started: state.started,
    lapList: state.lapList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    timeAct: () => { dispatch(timeAct) },
    pausedAct: () => { dispatch(pausedAct) },
    startedAct: () => { dispatch(startedAct) },
    lapListAct: () => { dispatch(lapListAct) },
    timeResetAct: () => { dispatch(timeResetAct) },
    resetListAct: () => { dispatch(resetListAct) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer)
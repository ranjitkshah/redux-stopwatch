const initialState = {
  paused: false,
  started: false,
  lapList: [],
  time: { minutes: 0, seconds: 0, milliseconds: 0 }
}

const reducer = (state = initialState, action) => {

  switch (action.type) {

    case "TIME_RESET": {
      return {
        ...state,
        time: {
          minutes: 0,
          seconds: 0,
          milliseconds: 0
        }
      }
    }
    case "PAUSED": {
      if (state.paused === true)
        return {
          ...state,
          paused: false
        }
      else
        return {
          ...state,
          paused: true
        }
    }

    case "STARTED": {
      if (state.started === true)
        return {
          ...state,
          started: false
        }
      else
        return {
          ...state,
          started: true
        }
    }

    case "LAPLIST": {
      return {
        ...state,
        lapList: [...state.lapList, {
          minutes: state.time.minutes,
          seconds: state.time.seconds,
          milliseconds: state.time.milliseconds,
        }
        ]
      }
  
    } 
    case "RESET_LIST": {
      return {
        ...state,
        lapList: []
      }
    }
    case "TIME": {
      if (state.time.seconds === 59)
        return {
          ...state,
          time: {
            ...state.time,
            minutes: state.time.minutes + 1,
            seconds: 0
          }
        }
      if (state.time.milliseconds === 99)
        return {
          ...state,
          time: {
            ...state.time,
            seconds: state.time.seconds + 1,
            milliseconds: 0
          }
        }
      return {
        ...state,
        time: {
          ...state.time,
          milliseconds: state.time.milliseconds + 1
        }
      }
    }

    default:
      return state
  }
}

export default reducer;
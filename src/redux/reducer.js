const initialState = {
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
  paused: false,
  started: false,
  lapList: []
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case "MINUTES": {
      if (state.seconds === 59)
        return {
          ...state,
          minutes: state.minutes + 1,
          seconds: 0
        }
      else
        return state
    }
    case "SECONDS": {
      if (state.milliseconds === 99)
        return {
          ...state,
          seconds: state.seconds + 1,
          milliseconds: 0
        }
      else
        return state
    }
    case "MILLISECONDS": {
      return {
        ...state,
        milliseconds: state.milliseconds + 1
      }
    }
    case "TIME_RESET": {
      return {
        ...state,
        minutes: 0,
        seconds: 0,
        milliseconds: 0
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
        lapList: [...state.lapList, { minutes: state.minutes, seconds: state.seconds, milliseconds: state.milliseconds }]
      }
    }
    case "RESET_LIST": {
      return {
        ...state,
        lapList: []
      }
    }

    default:
      return state;
  }
}

export default reducer;
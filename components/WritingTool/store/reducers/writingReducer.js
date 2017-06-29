/**
 * Created by benjaminafonso on 23/06/2017.
 */

export default function reducer (
  state = {
    state: {
      nodes: [
        {
          kind: 'block',
          type: 'paragraph',
          nodes: []
        }
      ]
    },
    lastSave: 0,
    constraints: {
      minNbWords: 30,
      maxNbWords: undefined
    },
    save: {
      save_succeeded: false,
      save_failed: false,
      save_error: undefined,
      last_save: undefined
    },
    nbWords: 0,
    progress: 0
  },
  action
) {
  switch (action.type) {
    case 'TEXT_CHANGED': {
      return {
        ...state,
        state: action.payload.newState,
        lastSave: state.lastSave + 1
      }
    }
    case 'SAVE_LOCALSTORAGE': {
      window.localStorage.setItem('nzk-writing', state)
      return {
        ...state,
        lastSave: 0
      }
    }
    case 'UPDATE_NB_WORDS': {
      return {
        ...state,
        nbWords: action.payload
      }
    }
    case 'UPDATE_PROGRESS': {
      return {
        ...state,
        progress: action.payload
      }
    }
    case 'SET_MIN_NB_WORDS': {
      return {
        ...state,
        constraints: {
          ...state.constraints,
          minNbWords: action.payload,
        },
      }
    }
    case 'SET_MAX_NB_WORDS': {
      return {
        ...state,
        constraints: {
          ...state.constraints,
          maxNbWords: action.payload,
        },
      }
    }
    case 'LOAD_LOCALSTORAGE': {
      var newState = window.localStorage.getItem('nzk-writing')
      if (newState) {
        return newState
      } else {
        return state
      }
    }
    default:
      return state
  }
}

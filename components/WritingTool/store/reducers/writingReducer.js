import { Raw } from 'slate'

const initialState = {
  title: window.localStorage.getItem('nzk-writing')
    ? JSON.parse(window.localStorage.getItem('nzk-writing')).title
    : '',
  state: window.localStorage.getItem('nzk-writing')
    ? JSON.parse(window.localStorage.getItem('nzk-writing')).state
    : {
      nodes: [
        {
          kind: 'block',
          type: 'paragraph',
          nodes: []
        }
      ]
    },
  lastSave: 0,
  lastSaveTime: undefined,
  constraints: {
    minNbWords: undefined,
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
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case 'TEXT_CHANGED': {
      return {
        ...state,
        state: action.payload.newState,
        lastSave: state.lastSave + 1
      }
    }
    case 'SAVE_LOCALSTORAGE': {
      const content = state.state
      window.localStorage.setItem(
        'nzk-writing',
        JSON.stringify({
          ...state,
          state: Raw.serialize(content)
        })
      )
      return {
        ...state,
        lastSave: 0,
        lastSaveTime: Date.now()
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
          minNbWords: action.payload
        }
      }
    }
    case 'SET_MAX_NB_WORDS': {
      return {
        ...state,
        constraints: {
          ...state.constraints,
          maxNbWords: action.payload
        }
      }
    }
    case 'SET_TITLE': {
      return {
        ...state,
        title: action.payload
      }
    }
    case 'LOAD_WRITING_LOCALSTORAGE': {
      var newState = JSON.parse(window.localStorage.getItem('nzk-writing'))
      if (newState) {
        return newState
      } else {
        return state
      }
    }
    case 'CLEAR_WRITING': {
      return {
        ...initialState,
        title: '',
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
        }
      }
    }
    default:
      return state
  }
}

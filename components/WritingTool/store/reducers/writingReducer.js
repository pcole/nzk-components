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
    lastSave: 0
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

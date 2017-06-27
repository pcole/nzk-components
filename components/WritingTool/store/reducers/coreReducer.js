/**
 * Created by benjaminafonso on 23/06/2017.
 */

export default function reducer (
  state = {
    planning: {
      title: '',
      writingType: '',
      icon: '',
      informations: {
        image: '',
        description: ''
      },
      fields: [],
      lastSave: 0
    }
  },
  action
) {
  var newFields
  switch (action.type) {
    case 'SET_TITLE': {
      return {
        ...state,
        planning: {
          ...state.planning,
          title: action.payload.title,
          icon: action.payload.icon
        }
      }
    }
    case 'SET_INFORMATIONS': {
      return {
        ...state,
        planning: {
          ...state.planning,
          informations: {
            image: action.payload.image,
            description: action.payload.description
          }
        }
      }
    }
    case 'NEW_FIELD': {
      return {
        ...state,
        planning: {
          ...state.planning,
          fields: [
            ...(state.planning.fields || []),
            {
              title: action.payload.title,
              type: action.payload.type,
              nbFields: action.payload.nbFields,
              nbFieldsPerRow: action.payload.nbFieldsPerRow,
              overloadable: action.payload.overloadable,
              removeable: action.payload.removeable,
              fields: action.payload.fields
            }
          ]
        }
      }
    }
    case 'REMOVE_INPUT_FIELD': {
      newFields = state.planning.fields.slice()
      newFields[action.payload.fieldIndex].fields.splice(
        action.payload.index,
        1
      )
      newFields[action.payload.fieldIndex].fields = newFields[action.payload.fieldIndex].fields.map((field, index) => {
        field.index = index
        return field
      })
      return {
        ...state,
        planning: {
          ...state.planning,
          fields: newFields
        }
      }
    }
    case 'ADD_INPUT_FIELD': {
      newFields = state.planning.fields.slice()
      newFields[action.payload.fieldIndex].fields.push({
        value: '',
        index: newFields.length
      })
      return {
        ...state,
        planning: {
          ...state.planning,
          fields: newFields
        }
      }
    }
    case 'FIELD_CHANGED': {
      newFields = state.planning.fields.slice()
      newFields[action.payload.fieldIndex].fields[action.payload.inputIndex].value =
        action.payload.newValue
      return {
        ...state,
        planning: {
          ...state.planning,
          fields: newFields,
          lastSave: state.planning.lastSave + 1
        }
      }
    }
    case 'SAVE_PLANNING_LOCALSTORAGE': {
      window.localStorage.setItem('nzk-planning', JSON.stringify(state.planning))
      return {
        ...state,
        planning: {
          ...state.planning,
          lastSave: 0
        }
      }
    }
    case 'LOAD_PLANNING_LOCALSTORAGE': {
      var newState = JSON.parse(window.localStorage.getItem('nzk-planning'))
      return {
        ...state,
        planning: newState
      }
    }
    case 'REMOVE_PLANNING_LOCALSTORAGE': {
      window.localStorage.removeItem('nzk-planning')
      return {
        ...state,
        planning: {
          ...state.planning,
          lastSave: 0
        }
      }
    }
    default:
      return state
  }
}

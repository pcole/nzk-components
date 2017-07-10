/**
 * Created by benjaminafonso on 23/06/2017.
 */

export default function reducer (state = {
  title: '',
  needsTitle: true,
  icon: '',
  informations: {
    image: '',
    description: ''
  },
  fields: [],
  lastSave: 0
},
                                action) {
  var newFields
  switch (action.type) {
    case 'SET_WRITING_TYPE': {
      return {
        ...state,
        title: action.payload.title,
        icon: action.payload.icon,
        needsTitle: action.payload.needsTitle
      }
    }
    case 'SET_INFORMATIONS': {
      return {
        ...state,
        informations: {
          image: action.payload.image,
          description: action.payload.description
        }

      }
    }
    case 'REMOVE_FIELDS': {
      return {
        ...state,
        fields: []
      }
    }
    case 'NEW_FIELD': {
      return {
        ...state,
        fields: [
          ...(state.fields || []),
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
    case 'REMOVE_INPUT_FIELD': {
      newFields = state.fields.slice()
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
        fields: newFields
      }
    }
    case 'ADD_INPUT_FIELD': {
      newFields = state.fields.slice()
      newFields[action.payload.fieldIndex].fields.push({
        value: '',
        index: newFields.length
      })
      return {
        ...state,
        fields: newFields
      }
    }
    case 'FIELD_CHANGED': {
      newFields = state.fields.slice()
      newFields[action.payload.fieldIndex].fields[action.payload.inputIndex].value =
        action.payload.newValue
      return {
        ...state,
        fields: newFields,
        lastSave: state.lastSave + 1
      }
    }
    case 'STRIKE_FIELD': {
      newFields = state.fields.slice()
      newFields[action.payload.fieldIndex].fields[action.payload.inputIndex].striked = action.payload.striked
      return {
        ...state,
        fields: newFields
      }
    }
    case 'SAVE_PLANNING_LOCALSTORAGE': {
      window.localStorage.setItem('nzk-planning', JSON.stringify(state))
      return {
        ...state,
        lastSave: 0
      }
    }
    case 'LOAD_PLANNING_LOCALSTORAGE': {
      var newState = JSON.parse(window.localStorage.getItem('nzk-planning'))
      console.log(newState)
      return {
        newState
      }
    }
    case 'REMOVE_PLANNING_LOCALSTORAGE': {
      window.localStorage.removeItem('nzk-planning')
      return {
        ...state,
        lastSave: 0
      }
    }
    default:
      return state
  }
}

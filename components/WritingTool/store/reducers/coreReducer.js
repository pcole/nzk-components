/**
 * Created by benjaminafonso on 23/06/2017.
 */

export default function reducer(state = {
  planning: {
    title: '',
    writingType: '',
    icon: '',
    image: '',
    fields: [],
  },
}, action) {
  var newFields;
  switch (action.type) {
    case 'SET_TITLE': {
      return Object.assign({}, state, {
        planning: {
          ...state.planning,
          title: action.payload.title,
          icon: action.payload.icon
        }
      })
    }
    case 'NEW_FIELD': {

      return Object.assign({}, state, {
        planning: {
          fields: [
            ...state.planning.fields,
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
      })
    }
    case 'REMOVE_INPUT_FIELD': {
      newFields = state.planning.fields.slice()
      newFields[action.payload.fieldIndex].fields.splice(action.payload.index, 1)
      newFields[action.payload.fieldIndex].fields = newFields[action.payload.fieldIndex].fields
        .map((field, index) => {
          field.index = index
          return field
        })
      return Object.assign({}, state, {
        planning: {
          fields: newFields
        }
      })
    }
    case 'ADD_INPUT_FIELD': {
      newFields = state.planning.fields.slice()
      newFields[action.payload.fieldIndex].fields.push({value: '', index: newFields.length})
      return Object.assign({}, state, {
        planning: {
          fields: newFields
        }
      })
    }
    case 'FIELD_CHANGED': {
      newFields = state.planning.fields.slice()
      newFields[action.payload.fieldIndex].fields[action.payload.inputIndex].value = action.payload.newValue
      return Object.assign({}, state, {
        planning: {
          fields: newFields
        }
      })
    }
    default:
      return state
  }
}

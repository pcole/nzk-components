export default function reducer (state, action) {
  switch (action.type) {
    case 'SET_PLACEHOLDERS': {
      return {
        ...state,
        placeholders: {
          ...state.placeholders,
          ...action.payload
        }
      }
    }
    case 'SET_WRITING': {
      return {
        ...state,
        writing: {
          ...state.writing,
          ...action.payload
        }
      }
    }
    case 'SET_CONSTRAINTS': {
      return {
        ...state,
        constraints: {
          ...state.constraints,
          ...action.payload
        }
      }
    }
    case 'SET_PROMPT': {
      return {
        ...state,
        prompt: {
          ...state.prompt,
          ...action.payload
        }
      }
    }
    case 'ADD_SECTION': {
      return {
        ...state,
        sections: [...(state.sections || []), action.payload]
      }
    }
    case 'SET_WORD_COUNT': {
      return {
        ...state,
        wordCount: action.payload
      }
    }
    case 'REMOVE_FIELD': {
      let sections = state.sections.slice()

      sections[action.payload.sectionIndex].fields.splice(
        action.payload.fieldIndex,
        1
      )

      /* eslint-disable */
      sections[action.payload.sectionIndex].fields = sections[
        action.payload.sectionIndex
      ].fields.map((field, index) => {
        field.index = index
        return field
      })
      /* eslint-enable */

      return {
        ...state,
        sections
      }
    }
    case 'ADD_FIELD': {
      let sections = state.sections.slice()
      let section = sections[action.payload.sectionIndex]

      section.fields.push({
        value: '',
        index: section.fields.length,
        removable: section.fieldsAreRemovable
      })

      section.fields = section.fields.slice()

      return {
        ...state,
        sections
      }
    }
    case 'SET_FIELD_VALUE': {
      let sections = state.sections.slice()

      /* eslint-disable */
      sections[action.payload.sectionIndex].fields[
        action.payload.fieldIndex
      ].value =
        action.payload.value
      /* eslint-enable */

      return {
        ...state,
        sections
      }
    }
    case 'CLEAR': {
      let sections = state.sections.slice()
      sections.map((section, i) => {
        section.fields.map(input => {
          input.value = ''
        })
      })
      return {
        ...state,
        writing: {
          title: '',
          text: ''
        },
        sections
      }
    }
    default:
      return state
  }
}

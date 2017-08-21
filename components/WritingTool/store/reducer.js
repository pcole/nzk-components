export default function reducer (state, action) {
  switch (action.type) {
    case 'SET_PLACEHOLDERS': {
      return {
        ...state,
        placeholders: {
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
    case 'MERGE_SECTION': {
      const sections = [...state.sections]
      let hasMerged = false

      for (let i = 0, lenS = sections.length; i < lenS; i++) {
        const section = sections[i]

        if (
          section.title === action.payload.title &&
          section.fieldType === action.payload.fieldType
        ) {
          for (let y = 0, lenF = section.fields.length; y < lenF; y++) {
            const field = section.fields[y]
            const payloadField = action.payload.fields[y]

            if (payloadField) {
              if (field.value !== payloadField.value) {
                field.value = field.value || payloadField.value
              }
            }
          }
          hasMerged = true
        }
      }

      if (!hasMerged) {
        sections.push(action.payload)
      }

      return {
        ...state,
        sections
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
        value: ''
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

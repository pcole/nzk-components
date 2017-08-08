import settingsEn from '../../assets/settings_en.json'

export function usePreset (dispatch, preset) {
  const settings = settingsEn

  dispatch(removeFields())

  if (settings[preset]) {
    dispatch(
      setWritingType(
        settings[preset].title,
        settings[preset].icon,
        settings[preset].needsTitle
      )
    )
    settings[preset].fields.map(field => {
      return dispatch(
        newField(
          field.title,
          field.type,
          field.numberOfFields,
          field.numberPerRow,
          field.overloadable,
          field.removeable,
          [...Array(field.numberOfFields)].map((field, index) => {
            return { index: index, value: '' }
          })
        )
      )
    })
  }
}

/**
 * Preset:
 * - title: string (Plan your ${title})
 * - icon: base64 icon
 * - needsTitle: boolean
 * - fields
 *   - title: string (The question above the inputs)
 *   - type: ['input','textarea'] (The type of fields to render)
 *   - numberOfFields: number
 *   - numberPerRow: number
 *   - overloadable: boolean
 *   - removeable: boolean
 *   - fields: string[] (The values of the inputs :: fields.length === numberOfFields)
 *
 *
 * @param dispatch
 * @param preset
 */
export function useCustomPreset (dispatch, preset) {
  dispatch(setWritingType(preset.title, preset.icon, preset.needsTitle))
  preset.fields.map(field => {
    return dispatch(
      newField(
        field.title,
        field.type,
        field.numberOfFields,
        field.numberPerRow,
        field.overloadable,
        field.removeable,
        field.fields.map((field, index) => {
          return { index: index, value: field }
        })
      )
    )
  })
}

export function setWritingType (title, icon = '', needsTitle = true) {
  return {
    type: 'SET_WRITING_TYPE',
    payload: {
      title: title,
      icon: icon,
      needsTitle: needsTitle
    }
  }
}

export function setInformations (image, description) {
  return {
    type: 'SET_INFORMATIONS',
    payload: {
      image: image,
      description: description
    }
  }
}

export function savePlanningLocalStorage () {
  return {
    type: 'SAVE_PLANNING_LOCALSTORAGE'
  }
}

export function loadPlanningLocalstorage (dispatch) {
  var planning = window.localStorage.getItem('nzk-planning')
  if (planning) {
    loadPlanning(dispatch, JSON.parse(planning))
  }
}

export function removeFields () {
  return {
    type: 'REMOVE_FIELDS'
  }
}

export function loadPlanning (dispatch, planning) {
  dispatch(removeFields())
  dispatch(setWritingType(planning.title, planning.icon))
  planning.fields.map((field, i) => {
    return dispatch(
      newField(
        field.title,
        field.type,
        field.numberOfFields,
        field.numberPerRow,
        field.overloadable,
        field.removeable,
        planning.fields[i].fields
      )
    )
  })
}

export function clearPlanning () {
  return {
    type: 'CLEAR_PLANNING'
  }
}

export function newField (
  title,
  type,
  nbFields,
  nbFieldsPerRow,
  overloadable,
  removeable,
  fields
) {
  return {
    type: 'NEW_FIELD',
    payload: {
      key: title,
      title: title,
      type: type,
      nbFields: nbFields,
      nbFieldsPerRow: nbFieldsPerRow,
      overloadable: overloadable,
      removeable: removeable,
      fields: fields
    }
  }
}

export function removeInput (fieldIndex, index) {
  return {
    type: 'REMOVE_INPUT_FIELD',
    payload: {
      fieldIndex: fieldIndex,
      index: index
    }
  }
}

export function addInput (fieldIndex) {
  return {
    type: 'ADD_INPUT_FIELD',
    payload: {
      fieldIndex: fieldIndex
    }
  }
}

export function fieldChanged (fieldIndex, inputIndex, newValue) {
  return {
    type: 'FIELD_CHANGED',
    payload: {
      fieldIndex: fieldIndex,
      inputIndex: inputIndex,
      newValue: newValue
    }
  }
}

export function strikeField (fieldIndex, inputIndex, striked) {
  return {
    type: 'STRIKE_FIELD',
    payload: {
      fieldIndex: fieldIndex,
      inputIndex: inputIndex,
      striked: striked
    }
  }
}

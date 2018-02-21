import writingTypePresets from '../assets/writing-type-presets'
import writingTypeIcons from '../assets/writing-type-icons.json'

export function init (dispatch, settings) {
  if (settings.loadPresetSections === undefined) {
    settings.loadPresetSections = true
  }

  const preset = writingTypePresets[settings.lang][settings.writingType]
  preset.icon = writingTypeIcons[settings.writingType]

  const cachedState =
    window && window.localStorage.getItem('nzk-writing-tool-state')
      ? JSON.parse(window.localStorage.getItem('nzk-writing-tool-state'))
      : null

  if (cachedState) {
    settings.writing = cachedState.writing
    settings.sections = cachedState.sections
    settings.loadPresetSections = false
  }

  dispatch({ type: 'RESET' })
  dispatch(initPlaceholders(dispatch, preset, settings))
  dispatch(initWriting(dispatch, preset, settings))
  dispatch(initConstraints(dispatch, preset, settings))
  dispatch(initPrompt(dispatch, preset, settings))
  dispatch(initSections(dispatch, preset, settings))
}

export function clearCachedState (dispatch) {
  window.localStorage.removeItem('nzk-writing-tool-state')
  dispatch({
    type: 'CLEAR_CACHED_STATE'
  })
}

export function cacheState (dispatch, state) {
  window.localStorage.setItem('nzk-writing-tool-state', JSON.stringify(state))

  dispatch({
    type: 'CACHE_STATE'
  })
}

export function initPlaceholders (dispatch, preset, { placeholders = {} } = {}) {
  return {
    type: 'SET_PLACEHOLDERS',
    payload: {
      title: preset.titlePlaceholder,
      text: preset.textPlaceholder,
      ...placeholders
    }
  }
}

export function initWriting (dispatch, preset, { writing = {} } = {}) {
  return setWriting(writing)
}

export function setWriting (writing = {}) {
  return {
    type: 'SET_WRITING',
    payload: writing
  }
}

export function initConstraints (dispatch, preset, { constraints = {} } = {}) {
  return {
    type: 'SET_CONSTRAINTS',
    payload: constraints
  }
}

export function initPrompt (dispatch, preset, { prompt = {} } = {}) {
  return {
    type: 'SET_PROMPT',
    payload: {
      icon: preset.icon,
      title: preset.planningPrompt,
      ...prompt
    }
  }
}

export function initSections (dispatch, preset, settings) {
  const sections = []

  if (settings.loadPresetSections) {
    sections.push(...preset.planning)
  }

  if (settings.sections) {
    settings.sections.forEach(section => {
      if (section.prepend) {
        sections.unshift(section)
      } else {
        sections.push(section)
      }
    })
  }

  sections.map(section => {
    dispatch(mergeSection(section))
  })

  return {
    type: 'INIT_SECTIONS'
  }
}

export function mergeSection (section) {
  return {
    type: 'MERGE_SECTION',
    payload: {
      title: section.title,
      fieldType: section.fieldType,
      userCanAddFields: section.userCanAddFields,
      fieldsAreRemovable: section.fieldsAreRemovable,
      fields:
        section.fields ||
        [...Array(section.numberOfFields)].map((field, index) => {
          return { value: '' }
        })
    }
  }
}

export function setWordCount (wordCount) {
  return {
    type: 'SET_WORD_COUNT',
    payload: wordCount
  }
}

export function removeField (sectionIndex, fieldIndex) {
  return {
    type: 'REMOVE_FIELD',
    payload: { sectionIndex, fieldIndex }
  }
}

export function addField (sectionIndex) {
  return {
    type: 'ADD_FIELD',
    payload: { sectionIndex }
  }
}

export function setFieldValue (sectionIndex, fieldIndex, value) {
  return {
    type: 'SET_FIELD_VALUE',
    payload: { sectionIndex, fieldIndex, value }
  }
}

export function clear () {
  return {
    type: 'CLEAR'
  }
}

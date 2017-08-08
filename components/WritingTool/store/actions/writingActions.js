export function textChanged (newState) {
  return {
    type: 'TEXT_CHANGED',
    payload: {
      newState: newState
    }
  }
}

export function saveWritingLocalstorage () {
  return {
    type: 'SAVE_LOCALSTORAGE'
  }
}

export function loadWritingLocalstorage () {
  return {
    type: 'LOAD_WRITING_LOCALSTORAGE'
  }
}

export function updateNbWords (number) {
  return {
    type: 'UPDATE_NB_WORDS',
    payload: number
  }
}

export function updateProgress (progress) {
  return {
    type: 'UPDATE_PROGRESS',
    payload: progress
  }
}

export function clearWriting () {
  return {
    type: 'CLEAR_WRITING'
  }
}

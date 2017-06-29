/**
 * Created by benjaminafonso on 26/06/2017.
 */

export function textChanged (newState) {
  return {
    type: 'TEXT_CHANGED',
    payload: {
      newState: newState
    }
  }
}

export function saveLocalstorage () {
  return {
    type: 'SAVE_LOCALSTORAGE'
  }
}

export function updateNbWords(number) {
  return {
    type: 'UPDATE_NB_WORDS',
    payload: number
  }
}

export function updateProgress(progress) {
  return {
    type: 'UPDATE_PROGRESS',
    payload: progress
  }
}
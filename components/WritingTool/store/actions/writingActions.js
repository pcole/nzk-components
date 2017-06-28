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

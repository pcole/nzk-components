/**
 * Created by benjaminafonso on 26/06/2017.
 */

export function textChanged (newValue) {
  return {
    type: 'TEXT_CHANGED',
    payload: {
      newValue: newValue
    }
  }
}

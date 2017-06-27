/**
 * Created by benjaminafonso on 23/06/2017.
 */

export default function reducer (
  state = {
    writing: {
      lastSave: 0
    }
  },
  action
) {
  switch (action.type) {
    case '': {
      break
    }
    default:
      return state
  }
}

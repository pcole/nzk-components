/**
 * Created by benjaminafonso on 23/06/2017.
 */

export default function reducer( state = {
  planning: {
    fields: []
  }
}, action) {
  switch (action.type) {
    case 'NEW_FIELD': {
      return {...state}
    }
  }
}

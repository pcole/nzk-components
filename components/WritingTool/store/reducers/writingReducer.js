/**
 * Created by benjaminafonso on 23/06/2017.
 */

import { Raw } from 'slate'

export default function reducer (
  state = {
    state: Raw.deserialize(
      {
        nodes: [
          {
            kind: 'block',
            type: 'paragraph',
            nodes: []
          }
        ]
      },
        {terse: true}
      ),
    lastSave: 0
  },
  action
) {
  switch (action.type) {
    case 'TEXT_CHANGED': {
      return {
        ...state,
        state: action.payload
      }
    }
    default:
      return state
  }
}

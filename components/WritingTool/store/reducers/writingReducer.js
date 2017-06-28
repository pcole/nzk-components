/**
 * Created by benjaminafonso on 23/06/2017.
 */

export default function reducer (
  state = {
    state: {
      nodes: [
        {
          kind: 'block',
          type: 'paragraph',
          nodes: [
            {
              kind: "text",
              text: "In addition to nodes that contain editable text, you can also create other types of nodes, like images or videos."
            }
          ]
        },
        {
          kind: 'block',
          type: 'image',
          isVoid: true,
          data: {
            src: 'https://img.washingtonpost.com/wp-apps/imrs.php?src=https://img.washingtonpost.com/news/speaking-of-science/wp-content/uploads/sites/36/2015/10/as12-49-7278-1024x1024.jpg&w=1484'
          }
        },
      ]
    },
    lastSave: 0
  },
  action
) {
  switch (action.type) {
    case 'TEXT_CHANGED': {
      return {
        ...state,
        state: action.payload.newState,
        lastSave: state.lastSave + 1
      }
    }
    case 'SAVE_LOCALSTORAGE': {
      window.localStorage.setItem('nzk-writing', state)
      return {
        ...state,
        lastSave: 0
      }
    }
    case 'LOAD_LOCALSTORAGE': {
      var newState = window.localStorage.getItem('nzk-writing')
      if (newState) {
        return newState
      } else {
        return state
      }
    }
    default:
      return state
  }
}

import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
      {
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }
      )
    : compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
)

const persistedState =
  window && window.localStorage.getItem('nzk-writing-tool-state')
    ? JSON.parse(window.localStorage.getItem('nzk-writing-tool-state'))
    : {}

const initialState = {
  placeholders: {
    title: 'Write your title here...',
    text: 'Start writing here....'
  },
  writing: {
    title: '',
    text: ''
  },
  constraints: {
    minWords: 0,
    maxWords: 100000
  },
  prompt: {
    icon: '',
    title: '',
    image: '',
    description: ''
  },
  wordCount: 0,
  sections: [],
  ...persistedState
}

export default () => createStore(reducer, initialState, enhancer)

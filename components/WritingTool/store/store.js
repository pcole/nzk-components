/**
 * Created by benjaminafonso on 23/06/2017.
 */

import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'

const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    {
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }
    )
  : compose

const middleware = applyMiddleware(thunk)

const enhancer = composeEnhancers(middleware)
let store = createStore(reducer, enhancer)

export default store

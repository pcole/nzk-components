'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _typeof =
  typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
    ? function (obj) {
        return typeof obj
      }
    : function (obj) {
        return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
          ? 'symbol'
          : typeof obj
      } /**
                                                                                                                                                                                                                                                                               * Created by benjaminafonso on 23/06/2017.
                                                                                                                                                                                                                                                                               */

var _redux = require('redux')

var _reduxThunk = require('redux-thunk')

var _reduxThunk2 = _interopRequireDefault(_reduxThunk)

var _reducers = require('./reducers')

var _reducers2 = _interopRequireDefault(_reducers)

function _interopRequireDefault (obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

var composeEnhancers =
  (typeof window === 'undefined' ? 'undefined' : _typeof(window)) ===
    'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        {
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }
      )
    : _redux.compose

var middleware = (0, _redux.applyMiddleware)(_reduxThunk2.default)

var enhancer = composeEnhancers(middleware)
var store = (0, _redux.createStore)(_reducers2.default, enhancer)

exports.default = store

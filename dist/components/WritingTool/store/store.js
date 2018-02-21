'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.defaultState = undefined

var _extends =
  Object.assign ||
  function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
    return target
  }

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
    }

var _redux = require('redux')

var _reduxThunk = require('redux-thunk')

var _reduxThunk2 = _interopRequireDefault(_reduxThunk)

var _reducer = require('./reducer')

var _reducer2 = _interopRequireDefault(_reducer)

function _interopRequireDefault (obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

var composeEnhancers =
  (typeof window === 'undefined' ? 'undefined' : _typeof(window)) ===
    'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : _redux.compose

var enhancer = composeEnhancers(
  (0, _redux.applyMiddleware)(_reduxThunk2.default)
  // other store enhancers if any
)

var defaultState = (exports.defaultState = {
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
  sections: []
})

exports.default = function () {
  return (0, _redux.createStore)(
    _reducer2.default,
    _extends({}, defaultState),
    enhancer
  )
}

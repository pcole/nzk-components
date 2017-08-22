'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _redux = require('redux');

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composeEnhancers = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
}) : _redux.compose;

var enhancer = composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk2.default)
// other store enhancers if any
);

var persistedState = window && window.localStorage.getItem('nzk-writing-tool-state') ? JSON.parse(window.localStorage.getItem('nzk-writing-tool-state')) : {};

var defaultState = exports.defaultState = {
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
};

var initialState = _extends({}, defaultState, persistedState);

exports.default = function () {
  var store = (0, _redux.createStore)(_reducer2.default, initialState, enhancer);

  store.subscribe((0, _debounce2.default)(function () {
    window && window.localStorage.setItem('nzk-writing-tool-state', JSON.stringify({
      writing: store.getState().writing,
      sections: store.getState().sections
    }));
  }, 1000));

  return store;
};
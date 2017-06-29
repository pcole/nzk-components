'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _planningReducer = require('./planningReducer');

var _planningReducer2 = _interopRequireDefault(_planningReducer);

var _writingReducer = require('./writingReducer');

var _writingReducer2 = _interopRequireDefault(_writingReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  planning: _planningReducer2.default,
  writing: _writingReducer2.default
}); /**
     * Created by benjaminafonso on 23/06/2017.
     */
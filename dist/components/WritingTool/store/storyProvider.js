'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = StoryProvider;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function StoryProvider(_ref) {
  var story = _ref.story,
      store = _ref.store;

  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    story
  );
}
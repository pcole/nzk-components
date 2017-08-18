'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _style = require('styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _StatusBar = require('./StatusBar.styles');

var _StatusBar2 = _interopRequireDefault(_StatusBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StatusBar = (_dec = (0, _reactRedux.connect)(function (store) {
  return {
    wordCount: store.wordCount,
    constraints: store.constraints
  };
}), _dec(_class = function (_Component) {
  _inherits(StatusBar, _Component);

  function StatusBar() {
    _classCallCheck(this, StatusBar);

    return _possibleConstructorReturn(this, (StatusBar.__proto__ || Object.getPrototypeOf(StatusBar)).apply(this, arguments));
  }

  _createClass(StatusBar, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          className: 'host',
          style: {
            color: this.props.light ? 'rgba(0, 0, 0, .8)' : 'rgba(255, 255, 255, .8)',
            backgroundColor: this.props.bgColor
          },
          'data-jsx-ext': _StatusBar2.default.__scopedHash
        },
        _react2.default.createElement(
          'div',
          { className: 'counter', 'data-jsx-ext': _StatusBar2.default.__scopedHash
          },
          'Words: ',
          this.props.wordCount
        ),
        _react2.default.createElement(_style2.default, {
          styleId: _StatusBar2.default.__scopedHash,
          css: _StatusBar2.default.__scoped
        })
      );
    }
  }]);

  return StatusBar;
}(_react.Component)) || _class);
StatusBar.propTypes = {
  bgColor: _propTypes2.default.string,
  light: _propTypes2.default.bool
};
exports.default = StatusBar;
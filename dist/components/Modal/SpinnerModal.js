'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _SpinnerModal = require('./SpinnerModal.styles');

var _SpinnerModal2 = _interopRequireDefault(_SpinnerModal);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpinnerModal = function (_Component) {
  _inherits(SpinnerModal, _Component);

  function SpinnerModal(props) {
    _classCallCheck(this, SpinnerModal);

    var _this = _possibleConstructorReturn(this, (SpinnerModal.__proto__ || Object.getPrototypeOf(SpinnerModal)).call(this, props));

    _this.state = {
      fadeIn: false
    };
    return _this;
  }

  _createClass(SpinnerModal, [{
    key: 'onAfterOpen',
    value: function onAfterOpen() {
      var _this2 = this;

      this.delayFadeInTimeout = window.setTimeout(function () {
        _this2.setState({
          fadeIn: true
        });
      }, this.props.delayFadeInTimeoutMS0);
    }
  }, {
    key: 'onBeforeClose',
    value: function onBeforeClose() {
      this.setState({
        fadeIn: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          onAfterOpen = _props.onAfterOpen,
          onRequestClose = _props.onRequestClose,
          _props$delayCloseTime = _props.delayCloseTimeoutMS,
          delayCloseTimeoutMS = _props$delayCloseTime === undefined ? 1000 : _props$delayCloseTime,
          props = _objectWithoutProperties(_props, ['onAfterOpen', 'onRequestClose', 'delayCloseTimeoutMS']);

      return _react2.default.createElement(
        _Modal2.default,
        _extends({
          delayCloseTimeoutMS: delayCloseTimeoutMS,
          overlayColor: 'transparent',
          onAfterOpen: this.onAfterOpen.bind(this),
          onBeforeClose: this.onBeforeClose.bind(this),
          contentLabel: 'spinner'
        }, props),
        _react2.default.createElement(
          'div',
          { className: 'host' + (this.state.fadeIn ? ' fadeIn' : ''), 'data-jsx-ext': _SpinnerModal2.default.__scopedHash
          },
          _react2.default.createElement(
            'div',
            { className: 'spinner', 'data-jsx-ext': _SpinnerModal2.default.__scopedHash
            },
            _react2.default.createElement(_Icon2.default, { color: 'white', fontSize: '70px', name: 'time-travel' })
          ),
          _react2.default.createElement(_style2.default, {
            styleId: _SpinnerModal2.default.__scopedHash,
            css: _SpinnerModal2.default.__scoped
          })
        )
      );
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.clearTimeout(this.openTimeout);
    }
  }]);

  return SpinnerModal;
}(_react.Component);

SpinnerModal.propTypes = {
  isOpen: _propTypes2.default.bool.isRequired,
  delayFadeInTimeoutMS: _propTypes2.default.number
};
SpinnerModal.defaultProps = {
  delayFadeInTimeoutMS: 500
};
exports.default = SpinnerModal;
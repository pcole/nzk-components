'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = undefined

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

var _createClass = (function () {
  function defineProperties (target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _reactModal = require('react-modal')

var _reactModal2 = _interopRequireDefault(_reactModal)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

function _interopRequireDefault (obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _objectWithoutProperties (obj, keys) {
  var target = {}
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
    target[i] = obj[i]
  }
  return target
}

function _classCallCheck (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _possibleConstructorReturn (self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self
}

function _inherits (subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    )
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  })
  if (superClass) {
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
  }
}

var Modal = (function (_Component) {
  _inherits(Modal, _Component)

  function Modal (props) {
    _classCallCheck(this, Modal)

    var _this = _possibleConstructorReturn(
      this,
      (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props)
    )

    _this.state = {
      hasOpened: false,
      isClosing: false
    }
    return _this
  }

  _createClass(Modal, [
    {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps (newProps) {
        var _this2 = this

        if (newProps.isOpen === this.props.isOpen) return

        if (newProps.isOpen) {
          this.setState({
            hasOpened: true
          })
        } else if (this.state.hasOpened) {
          this.props.onBeforeClose && this.props.onBeforeClose()
          this.setState({
            isClosing: true
          })

          this.delayCloseTimeout = window.setTimeout(function () {
            _this2.setState({
              hasOpened: false,
              isClosing: false
            })
            _this2.props.onAfterClose && _this2.props.onAfterClose()
          }, this.props.delayCloseTimeoutMS)
        }
      }
    },
    {
      key: 'render',
      value: function render () {
        var _props = this.props,
          _props$style = _props.style,
          style = _props$style === undefined ? {} : _props$style,
          isOpen = _props.isOpen,
          props = _objectWithoutProperties(_props, ['style', 'isOpen'])

        style.overlay = style.overlay || {
          zIndex: 9999,
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100vw',
          backgroundColor: this.props.overlayColor
        }

        style.content = style.content || {
          border: 'none',
          padding: '0',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'transparent'
        }

        return _react2.default.createElement(
          _reactModal2.default,
          _extends(
            {
              isOpen: isOpen || (!isOpen && this.state.isClosing),
              style: style
            },
            props
          )
        )
      }
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount () {
        window.clearTimeout(this.delayCloseTimeout)
      }
    }
  ])

  return Modal
})(_react.Component)

Modal.propTypes = {
  isOpen: _propTypes2.default.bool.isRequired,
  onAfterOpen: _propTypes2.default.func,
  onBeforeClose: _propTypes2.default.func,
  onAfterClose: _propTypes2.default.func,
  delayCloseTimeoutMS: _propTypes2.default.number,
  aria: _propTypes2.default.object,
  role: _propTypes2.default.string,
  contentLabel: _propTypes2.default.string.isRequired,
  overlayColor: _propTypes2.default.string
}
Modal.defaultProps = {
  overlayColor: 'rgba(0,0,0,0.8)'
}
exports.default = Modal

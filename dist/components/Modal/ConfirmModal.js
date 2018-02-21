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

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _MessageModal = require('./MessageModal')

var _MessageModal2 = _interopRequireDefault(_MessageModal)

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

var ConfirmModal = (function (_Component) {
  _inherits(ConfirmModal, _Component)

  function ConfirmModal (props) {
    _classCallCheck(this, ConfirmModal)

    var _this = _possibleConstructorReturn(
      this,
      (ConfirmModal.__proto__ || Object.getPrototypeOf(ConfirmModal)).call(
        this,
        props
      )
    )

    _this.state = {
      open: _this.props.isOpen
    }
    return _this
  }

  _createClass(ConfirmModal, [
    {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps (newProps) {
        if (newProps.isOpen !== this.props.isOpen) {
          this.setState({
            open: newProps.isOpen
          })
        }
      }
    },
    {
      key: 'onConfirm',
      value: function onConfirm () {
        this.setState({
          open: false,
          confirm: true
        })
        this.props.onConfirm && this.props.onConfirm()
      }
    },
    {
      key: 'onCancel',
      value: function onCancel () {
        this.setState({
          open: false,
          confirm: false
        })
        this.props.onCancel && this.props.onCancel()
      }
    },
    {
      key: 'render',
      value: function render () {
        var _props = this.props,
          onConfirm = _props.onConfirm,
          onCancel = _props.onCancel,
          isOpen = _props.isOpen,
          confirmLabel = _props.confirmLabel,
          cancelLabel = _props.cancelLabel,
          props = _objectWithoutProperties(_props, [
            'onConfirm',
            'onCancel',
            'isOpen',
            'confirmLabel',
            'cancelLabel'
          ])

        var buttons = [
          {
            bgColor: 'green',
            label: confirmLabel,
            icon: confirmLabel ? false : { name: 'check', color: 'white' },
            shadow: true,
            round: !confirmLabel,
            size: 'large',
            onClick: this.onConfirm.bind(this)
          },
          {
            bgColor: 'red',
            label: cancelLabel,
            icon: cancelLabel ? false : { name: 'cross', color: 'white' },
            shadow: true,
            round: !cancelLabel,
            size: 'large',
            onClick: this.onCancel.bind(this)
          }
        ]

        return _react2.default.createElement(
          _MessageModal2.default,
          _extends({ isOpen: this.state.open, buttons: buttons }, props)
        )
      }
    }
  ])

  return ConfirmModal
})(_react.Component)

ConfirmModal.propTypes = {
  onConfirm: _propTypes2.default.func,
  onCancel: _propTypes2.default.func,
  confirmLabel: _propTypes2.default.string,
  cancelLabel: _propTypes2.default.string
}
ConfirmModal.defaultProps = {
  contentLabel: 'confirm'
}
exports.default = ConfirmModal

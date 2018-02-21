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

var _style = require('styled-jsx/style')

var _style2 = _interopRequireDefault(_style)

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _Button = require('../Button')

var _Button2 = _interopRequireDefault(_Button)

var _Icon = require('../Icon')

var _Icon2 = _interopRequireDefault(_Icon)

var _Modal = require('./Modal')

var _Modal2 = _interopRequireDefault(_Modal)

var _MessageModal = require('./MessageModal.styles')

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

var MessageModal = (function (_Component) {
  _inherits(MessageModal, _Component)

  function MessageModal (props) {
    _classCallCheck(this, MessageModal)

    var _this = _possibleConstructorReturn(
      this,
      (MessageModal.__proto__ || Object.getPrototypeOf(MessageModal)).call(
        this,
        props
      )
    )

    _this.state = {
      open: _this.props.isOpen
    }
    return _this
  }

  _createClass(MessageModal, [
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
      key: 'onAfterClose',
      value: function onAfterClose () {
        this.props.onAfterClose &&
          this.props.onAfterClose(this.state.buttonClickedIndex)
        this.props.buttons[this.state.buttonClickedIndex].onAfterClose &&
          this.props.buttons[this.state.buttonClickedIndex].onAfterClose()
      }
    },
    {
      key: 'onButtonClick',
      value: function onButtonClick (index) {
        this.setState({
          buttonClickedIndex: index
        })

        if (this.props.buttons[index].onClick) {
          this.props.buttons[index].onClick()
        } else {
          this.state = {
            open: false
          }
        }
      }
    },
    {
      key: 'render',
      value: function render () {
        var _this2 = this

        return _react2.default.createElement(
          _Modal2.default,
          {
            isOpen: this.state.open,
            delayCloseTimeoutMS: this.props.delayCloseTimeoutMS,
            overlayColor: 'transparent',
            onAfterClose: this.onAfterClose.bind(this),
            contentLabel: this.props.contentLabel
          },
          _react2.default.createElement(
            'div',
            {
              className: 'host' + (this.state.open ? ' fadeIn' : ''),
              'data-jsx-ext': _MessageModal2.default.__scopedHash
            },
            _react2.default.createElement(
              'div',
              {
                className: 'modal',
                'data-jsx-ext': _MessageModal2.default.__scopedHash
              },
              _react2.default.createElement(
                'div',
                {
                  className: 'message',
                  'data-jsx-ext': _MessageModal2.default.__scopedHash
                },
                this.props.message
              ),
              _react2.default.createElement(
                'div',
                {
                  className: 'buttons',
                  'data-jsx-ext': _MessageModal2.default.__scopedHash
                },
                this.props.buttons.map(function (button, index) {
                  var onClick = button.onClick,
                    onAfterClose = button.onAfterClose,
                    label = button.label,
                    icon = button.icon,
                    props = _objectWithoutProperties(button, [
                      'onClick',
                      'onAfterClose',
                      'label',
                      'icon'
                    ])

                  return _react2.default.createElement(
                    _Button2.default,
                    _extends(
                      {
                        key: index,
                        onClick: function onClick () {
                          _this2.onButtonClick(index)
                        }
                      },
                      props
                    ),
                    icon && _react2.default.createElement(_Icon2.default, icon),
                    label && label
                  )
                })
              )
            )
          ),
          _react2.default.createElement(_style2.default, {
            styleId: _MessageModal2.default.__scopedHash,
            css: _MessageModal2.default.__scoped
          })
        )
      }
    }
  ])

  return MessageModal
})(_react.Component)

MessageModal.propTypes = {
  isOpen: _propTypes2.default.bool.isRequired,
  buttons: _propTypes2.default.array,
  contentLabel: _propTypes2.default.string,
  delayCloseTimeoutMS: _propTypes2.default.number
}
MessageModal.defaultProps = {
  contentLabel: 'message',
  delayCloseTimeoutMS: 500,
  buttons: [{ label: 'OK', shadow: true, size: 'large' }]
}
exports.default = MessageModal

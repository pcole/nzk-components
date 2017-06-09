'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key] } } } return target }

var _createClass = (function () { function defineProperties (target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor } }())

var _style = require('styled-jsx/style')

var _style2 = _interopRequireDefault(_style)

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _color = require('color')

var _color2 = _interopRequireDefault(_color)

var _classnames = require('classnames')

var _classnames2 = _interopRequireDefault(_classnames)

var _Button = require('./Button.styles')

var _Button2 = _interopRequireDefault(_Button)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

function _defineProperty (obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }) } else { obj[key] = value } return obj }

function _objectWithoutProperties (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i] } return target }

function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

function _possibleConstructorReturn (self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called") } return call && (typeof call === 'object' || typeof call === 'function') ? call : self }

function _inherits (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass) } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass }

var Button = (function (_Component) {
  _inherits(Button, _Component)

  function Button (props) {
    _classCallCheck(this, Button)

    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props))

    _this.handleClick = _this.handleClick.bind(_this)
    return _this
  }

  _createClass(Button, [{
    key: 'handleClick',
    value: function handleClick (event) {
      var _props = this.props,
			    disabled = _props.disabled,
			    onClick = _props.onClick

      if (disabled) {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      if (onClick) {
        onClick(event)
      }
    }
  }, {
    key: 'render',
    value: function render () {
      var _props2 = this.props,
			    disabled = _props2.disabled,
			    children = _props2.children,
			    active = _props2.active,
			    block = _props2.block,
			    color = _props2.color,
			    round = _props2.round,
			    size = _props2.size,
			    width = _props2.width,
			    height = _props2.height,
			    bgColor = _props2.bgColor,
			    bgColorTo = _props2.bgColorTo,
			    borderRadius = _props2.borderRadius,
			    shadow = _props2.shadow,
			    gradient = _props2.gradient,
			    element = _props2.element,
			    props = _objectWithoutProperties(_props2, ['disabled', 'children', 'active', 'block', 'color', 'round', 'size', 'width', 'height', 'bgColor', 'bgColorTo', 'borderRadius', 'shadow', 'gradient', 'element'])

      if (disabled) {
        props.tabIndex = -1
        props.style = _extends({ pointerEvents: 'none' }, props.style)
      }

      var className = (0, _classnames2.default)(_defineProperty({
        button: true,
        disabled: disabled,
        active: active,
        block: block,
        shadow: shadow,
        round: round
      }, size, size))

      var bgColorObj = (0, _color2.default)(bgColor || '#55acf1')
      var bgLuminosity = bgColorObj.luminosity()
      var colorObj = (0, _color2.default)(color || (bgLuminosity >= 0.5 ? 'black' : 'white'))

      props.style = _extends({
        'color': colorObj.string(),
        'backgroundColor': bgColorObj.string(),
        'borderRadius': round ? '50%' : borderRadius || size === 'x-large' ? '30px' : '20px',
        'boxShadow': shadow ? '0px 4px 0px ' + bgColorObj.darken(0.25).string() : 'none',
        'backgroundImage': gradient || bgColorTo ? 'linear-gradient(to right, ' + bgColor + ', ' + (bgColorTo || bgColorObj.lighten(0.20).string()) + ')' : 'none'
      }, props.style)

      if (width) {
        props.style = _extends({
          'width': width
        }, props.style)
      }

      if (height) {
        props.style = _extends({
          'height': height
        }, props.style)
      }

      switch (element) {
        case 'span':
          return _react2.default.createElement(
						'span',
						_extends({}, props, { className: className, 'data-jsx-ext': _Button2.default.__scopedHash
}),
						children,
						_react2.default.createElement(_style2.default, {
  styleId: _Button2.default.__scopedHash,
  css: _Button2.default.__scoped
})
					)
        case 'button':
          return _react2.default.createElement(
						'button',
						_extends({}, props, { className: className, 'data-jsx-ext': _Button2.default.__scopedHash
}),
						children,
						_react2.default.createElement(_style2.default, {
  styleId: _Button2.default.__scopedHash,
  css: _Button2.default.__scoped
})
					)
        case 'a':
          return _react2.default.createElement(
						'a',
						_extends({}, props, { className: className, 'data-jsx-ext': _Button2.default.__scopedHash
}),
						children,
						_react2.default.createElement(_style2.default, {
  styleId: _Button2.default.__scopedHash,
  css: _Button2.default.__scoped
})
					)
        default:
          return _react2.default.createElement(
						'div',
						_extends({}, props, { className: className, 'data-jsx-ext': _Button2.default.__scopedHash
}),
						children,
						_react2.default.createElement(_style2.default, {
  styleId: _Button2.default.__scopedHash,
  css: _Button2.default.__scoped
})
					)
      }
    }
  }])

  return Button
}(_react.Component))

exports.default = Button

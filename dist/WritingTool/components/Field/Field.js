'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = undefined

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

var _dec, _class

var _style = require('styled-jsx/style')

var _style2 = _interopRequireDefault(_style)

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _Field = require('./Field.styles')

var _Field2 = _interopRequireDefault(_Field)

var _classnames = require('classnames')

var _classnames2 = _interopRequireDefault(_classnames)

var _Icon = require('../../../Icon/Icon')

var _Icon2 = _interopRequireDefault(_Icon)

var _reactGsapEnhancer = require('react-gsap-enhancer')

var _reactGsapEnhancer2 = _interopRequireDefault(_reactGsapEnhancer)

var _gsap = require('gsap')

var _color = require('color')

var _color2 = _interopRequireDefault(_color)

var _throttle = require('lodash/throttle')

var _throttle2 = _interopRequireDefault(_throttle)

function _interopRequireDefault (obj) {
  return obj && obj.__esModule ? obj : { default: obj }
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

var RemoveButton = function RemoveButton (_ref) {
  var className = _ref.className,
    onClick = _ref.onClick

  return _react2.default.createElement(
    'div',
    {
      className: className,
      onClick: onClick,
      'data-jsx-ext': _Field2.default.__scopedHash
    },
    _react2.default.createElement(
      'div',
      {
        className: 'icon',
        'data-jsx-ext': _Field2.default.__scopedHash
      },
      _react2.default.createElement(_Icon2.default, {
        name: 'cross',
        fontSize: '12px'
      })
    ),
    _react2.default.createElement(_style2.default, {
      styleId: _Field2.default.__scopedHash,
      css: _Field2.default.__scoped
    })
  )
}

var Field = (
  (_dec = (0, _reactGsapEnhancer2.default)()),
  _dec(
    (_class = (function (_Component) {
      _inherits(Field, _Component)

      function Field (props) {
        _classCallCheck(this, Field)

        var _this = _possibleConstructorReturn(
          this,
          (Field.__proto__ || Object.getPrototypeOf(Field)).call(this, props)
        )

        _this.state = {
          value: props.content,
          visible: true
        }
        _this.handleChange = _this.handleChange.bind(_this)
        _this.throttledTypingAnimation = (0, _throttle2.default)(function () {
          _this.addAnimation(_this.animateTyping)
        }, 200)
        return _this
      }

      _createClass(Field, [
        {
          key: 'componentDidMount',
          value: function componentDidMount () {
            if (this.props.element === 'textarea') {
              this.addAnimation(this.resizeTextarea)
            }
            this.addAnimation(this.animateAppear.bind(this))
          }
        },
        {
          key: 'animateAppear',
          value: function animateAppear (utils) {
            return new _gsap.TimelineMax().from(utils.target, 0.3, {
              scale: 3,
              opacity: 0
            })
          }
        },
        {
          key: 'animateRemove',
          value: function animateRemove (utils) {
            var _this2 = this

            return new _gsap.TimelineMax({
              onComplete: function onComplete () {
                _this2.props.removeAction(_this2.props.index)
              }
            })
              .to(utils.target, 1, { rotation: 360, opacity: 0 })
              .to(utils.target, 0, { opacity: 1 })
          }
        },
        {
          key: 'animateTyping',
          value: function animateTyping (utils) {
            var random = Math.random() * 2
            return new _gsap.TimelineMax()
              .to(utils.target, 0.1, { rotation: random })
              .to(utils.target, 0.1, { rotation: -random }, 0.1)
          }
        },
        {
          key: 'shouldComponentUpdate',
          value: function shouldComponentUpdate (nextProps, nextState) {
            return (
              this.props.value !== nextProps.value ||
              this.props.bgColor !== nextProps.bgColor
            )
          }
        },
        {
          key: 'resizeTextarea',
          value: function resizeTextarea (_ref2) {
            var target = _ref2.target

            var textarea = target.find({ name: 'textarea' })
            return new _gsap.TimelineMax()
              .to(textarea, 0, { height: '1px' })
              .to(textarea, 0, { height: 10 + textarea[0].scrollHeight + 'px' })
          }
        },
        {
          key: 'handleChange',
          value: function handleChange (event) {
            // this.throttledTypingAnimation()

            if (this.props.element === 'textarea') {
              this.textAreaAdjust(event)
            }
            this.props.onChange(this.props.index, event.target.value)
            this.setState({ value: event.target.value })
          }
        },
        {
          key: 'removeAction',
          value: function removeAction () {
            this.addAnimation(
              this.animateRemove.bind(this)
              // this.props.removeAction(this.props.index)
              // this.setState({ visible: false })
            )
          }
        },
        {
          key: 'textAreaAdjust',
          value: function textAreaAdjust (o) {
            // o.target.style.height = '1px'
            // o.target.style.height = `${10 + o.target.scrollHeight}px`
            this.addAnimation(this.resizeTextarea)
          }
        },
        {
          key: 'render',
          value: function render () {
            var _props = this.props,
              bgColor = _props.bgColor,
              height = _props.height,
              color = _props.color,
              block = _props.block,
              borders = _props.borders,
              element = _props.element,
              children = _props.children,
              onClick = _props.onClick,
              removeable = _props.removeable,
              light = _props.light,
              removeAction = _props.removeAction,
              striked = _props.striked

            var style = {
              backgroundColor: bgColor,
              color: this.props.light ? 'black' : 'white',
              height: height,
              fontSize: '16px',
              overflow: 'hidden'
            }

            var className = (0, _classnames2.default)({
              input: true,
              block: block,
              borders: borders,
              button: element === 'button',
              striked: striked
            })

            var removeButtonClass = (0, _classnames2.default)({
              removeButton: true,
              light: light,
              dark: !light
            })

            switch (element) {
              case 'button':
                var buttonColor = new _color2.default(bgColor).fade(0.5)

                var buttonStyle = {
                  backgroundColor: buttonColor,
                  color: color,
                  height: height,
                  fontSize: '16px',
                  cursor: 'pointer',
                  lineHeight: '38px'
                }
                return _react2.default.createElement(
                  'div',
                  {
                    className: className,
                    style: buttonStyle,
                    onClick: onClick,
                    'data-jsx-ext': _Field2.default.__scopedHash
                  },
                  children,
                  _react2.default.createElement(_style2.default, {
                    styleId: _Field2.default.__scopedHash,
                    css: _Field2.default.__scoped
                  })
                )
              case 'input': {
                return this.state.visible
                  ? _react2.default.createElement(
                      'li',
                    {
                      style: {
                        width: this.props.width,
                        margin: this.props.margin
                      }
                    },
                      _react2.default.createElement(
                        'div',
                        {
                          className: 'input',
                          name: 'field',
                          'data-jsx-ext': _Field2.default.__scopedHash
                        },
                        _react2.default.createElement('input', {
                          className: className,
                          type: 'text',
                          style: style,
                          value: this.props.value,
                          onChange: this.handleChange,
                          'data-jsx-ext': _Field2.default.__scopedHash
                        }),
                        removeable
                          ? _react2.default.createElement(RemoveButton, {
                            className: removeButtonClass,
                            onClick: this.removeAction.bind(this)
                          })
                          : null,
                        _react2.default.createElement(_style2.default, {
                          styleId: _Field2.default.__scopedHash,
                          css: _Field2.default.__scoped
                        })
                      )
                    )
                  : null
              }
              case 'textarea':
                return this.state.visible
                  ? _react2.default.createElement(
                      'li',
                    {
                      style: { width: '100%', margin: this.props.margin }
                    },
                      _react2.default.createElement(
                        'div',
                        {
                          className: 'input',
                          'data-jsx-ext': _Field2.default.__scopedHash
                        },
                        _react2.default.createElement('textarea', {
                          className: className,
                          style: style,
                          value: this.props.value,
                          onChange: this.handleChange,
                          name: 'textarea',
                          'data-jsx-ext': _Field2.default.__scopedHash
                        }),
                        removeable
                          ? _react2.default.createElement(RemoveButton, {
                            onClick: this.removeAction.bind(this)
                          })
                          : null,
                        _react2.default.createElement(_style2.default, {
                          styleId: _Field2.default.__scopedHash,
                          css: _Field2.default.__scoped
                        })
                      )
                    )
                  : null

              case 'div':
                return _react2.default.createElement(
                  'div',
                  {
                    className: className,
                    type: 'text',
                    style: style,
                    'data-jsx-ext': _Field2.default.__scopedHash
                  },
                  children,
                  removeable
                    ? _react2.default.createElement('div', {
                      className: removeButtonClass,
                      onClick: removeAction,
                      'data-jsx-ext': _Field2.default.__scopedHash
                    })
                    : null,
                  _react2.default.createElement(_style2.default, {
                    styleId: _Field2.default.__scopedHash,
                    css: _Field2.default.__scoped
                  })
                )
              default:
                return null
            }
          }
        }
      ])

      return Field
    })(_react.Component))
  ) || _class
)
Field.propTypes = {
  bgColor: _propTypes2.default.object,
  index: _propTypes2.default.number,
  height: _propTypes2.default.string,
  width: _propTypes2.default.string,
  content: _propTypes2.default.string,
  value: _propTypes2.default.string,
  block: _propTypes2.default.bool,
  borders: _propTypes2.default.bool,
  element: _propTypes2.default.string,
  children: _propTypes2.default.any,
  onClick: _propTypes2.default.func,
  color: _propTypes2.default.string,
  removeable: _propTypes2.default.bool,
  light: _propTypes2.default.bool,
  removeAction: _propTypes2.default.func,
  stacking: _propTypes2.default.bool,
  margin: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  striked: _propTypes2.default.bool
}
Field.defaultProps = {
  height: '35px',
  width: '50%',
  content: '',
  block: false,
  borders: false,
  element: 'input',
  color: 'white',
  removeable: true,
  light: true,
  stacking: true,
  margin: '4px',
  striked: false
}
exports.default = Field

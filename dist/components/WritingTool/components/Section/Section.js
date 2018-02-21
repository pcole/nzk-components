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

var _dec, _class

var _style = require('styled-jsx/style')

var _style2 = _interopRequireDefault(_style)

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _reactRedux = require('react-redux')

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _Field = require('../Field/Field')

var _Field2 = _interopRequireDefault(_Field)

var _Icon = require('../../../Icon/Icon')

var _Icon2 = _interopRequireDefault(_Icon)

var _Button = require('../../../Button/Button')

var _Button2 = _interopRequireDefault(_Button)

var _Section = require('./Section.styles')

var _Section2 = _interopRequireDefault(_Section)

var _actions = require('../../store/actions')

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

var Section = ((_dec = (0, _reactRedux.connect)(function (store, ownProps) {
  var section = store.sections[ownProps.index]
  return _extends({}, section)
})),
  _dec(
    (_class = (function (_Component) {
      _inherits(Section, _Component)

      function Section () {
        var _ref

        var _temp, _this, _ret

        _classCallCheck(this, Section)

        for (
          var _len = arguments.length, args = Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key]
        }

        return (
          (_ret = ((_temp = ((_this = _possibleConstructorReturn(
            this,
            (_ref =
            Section.__proto__ || Object.getPrototypeOf(Section)).call.apply(
              _ref,
              [this].concat(args)
            )
          )),
            _this)),
            (_this.state = {
              clientWidth: 385
            }),
            _temp)),
          _possibleConstructorReturn(_this, _ret)
        )
      }

      _createClass(Section, [
        {
          key: 'onAdd',
          value: function onAdd () {
            this.props.dispatch((0, _actions.addField)(this.props.index))
          }
        },
        {
          key: 'onRemove',
          value: function onRemove (index) {
            this.props.dispatch(
              (0, _actions.removeField)(this.props.index, index)
            )
          }
        },
        {
          key: 'onChange',
          value: function onChange (index, value) {
            this.props.dispatch(
              (0, _actions.setFieldValue)(this.props.index, index, value)
            )
          }
        },
        {
          key: 'hostRef',
          value: function hostRef (el) {
            this.host = el
          }
        },
        {
          key: 'componentDidMount',
          value: function componentDidMount () {
            this.setState({
              clientWidth: this.host.clientWidth
            })
          }
        },
        {
          key: 'render',
          value: function render () {
            var _this2 = this

            var hostStyle = {
              color: this.props.textColor
            }

            return _react2.default.createElement(
              'div',
              {
                className: 'host',
                ref: this.hostRef.bind(this),
                style: hostStyle,
                'data-jsx-ext': _Section2.default.__scopedHash
              },
              _react2.default.createElement('h3', {
                dangerouslySetInnerHTML: { __html: this.props.title },
                'data-jsx-ext': _Section2.default.__scopedHash
              }),
              _react2.default.createElement(
                'ul',
                {
                  className: 'fields',
                  'data-jsx-ext': _Section2.default.__scopedHash
                },
                this.props.fields.map(function (elem, index) {
                  return _react2.default.createElement(_Field2.default, {
                    key: index,
                    index: index,
                    type: _this2.props.fieldType,
                    value: elem.value,
                    removable: _this2.props.fieldsAreRemovable,
                    bgColor: _this2.props.bgColor,
                    textColor: _this2.props.textColor,
                    onChange: _this2.onChange.bind(_this2),
                    onRemove: _this2.onRemove.bind(_this2),
                    parentClientWidth: _this2.state.clientWidth
                  })
                }),
                this.props.userCanAddFields &&
                _react2.default.createElement(
                  'li',
                  {
                    className: 'add-container',
                    'data-jsx-ext': _Section2.default.__scopedHash
                  },
                  _react2.default.createElement(
                    _Button2.default,
                    {
                      onClick: this.onAdd.bind(this),
                      bgColor: this.props.bgColor,
                      color: this.props.textColor,
                      shadow: true,
                      block: true,
                      height: '35px',
                      style: { padding: '6px' }
                    },
                    _react2.default.createElement(_Icon2.default, {
                      name: 'plus',
                      fontSize: '24px'
                    })
                  )
                )
              ),
              _react2.default.createElement(_style2.default, {
                styleId: _Section2.default.__scopedHash,
                css: _Section2.default.__scoped
              })
            )
          }
        }
      ])

      return Section
    })(_react.Component))
  ) || _class)
Section.propTypes = {
  index: _propTypes2.default.number,
  title: _propTypes2.default.string,
  fields: _propTypes2.default.array,
  userCanAddFields: _propTypes2.default.bool,
  fieldsAreRemovable: _propTypes2.default.bool,
  bgColor: _propTypes2.default.object,
  textColor: _propTypes2.default.string
}
exports.default = Section

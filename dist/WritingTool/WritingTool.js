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

var _dec,
  _class /**
                   * Created by benjaminafonso on 20/06/2017.
                   */

var _style = require('styled-jsx/style')

var _style2 = _interopRequireDefault(_style)

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _WritingTool = require('./WritingTool.styles')

var _WritingTool2 = _interopRequireDefault(_WritingTool)

var _Writer = require('./components/Writer/Writer')

var _Writer2 = _interopRequireDefault(_Writer)

var _PlanningDrawer = require('./components/PlanningDrawer/PlanningDrawer')

var _PlanningDrawer2 = _interopRequireDefault(_PlanningDrawer)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _reactRedux = require('react-redux')

var _store = require('./store/store')

var _store2 = _interopRequireDefault(_store)

var _planningActions = require('./store/actions/planningActions')

var _writingActions = require('./store/actions/writingActions')

var _reactIntl = require('react-intl')

var _nodeVibrant = require('node-vibrant')

var Vibrant = _interopRequireWildcard(_nodeVibrant)

var _reactGsapEnhancer = require('react-gsap-enhancer')

var _reactGsapEnhancer2 = _interopRequireDefault(_reactGsapEnhancer)

var _gsap = require('gsap')

var _Icon = require('../Icon/Icon')

var _Icon2 = _interopRequireDefault(_Icon)

var _classnames = require('classnames')

var _classnames2 = _interopRequireDefault(_classnames)

var _color = require('color')

var _color2 = _interopRequireDefault(_color)

var _ProgressBar = require('./components/ProgressBar/ProgressBar')

var _ProgressBar2 = _interopRequireDefault(_ProgressBar)

var _TypePickerPopover = require('./components/TypePickerPopover/TypePickerPopover')

var _TypePickerPopover2 = _interopRequireDefault(_TypePickerPopover)

var _ConfirmModal = require('./components/ConfirmModal/ConfirmModal')

var _ConfirmModal2 = _interopRequireDefault(_ConfirmModal)

function _interopRequireWildcard (obj) {
  if (obj && obj.__esModule) {
    return obj
  } else {
    var newObj = {}
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key]
      }
    }
    newObj.default = obj
    return newObj
  }
}

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
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}

var WritingTool = (
  (_dec = (0, _reactGsapEnhancer2.default)()),
  _dec(
    (_class = (function (_Component) {
      _inherits(WritingTool, _Component)

      function WritingTool () {
        var _ref

        var _temp, _this, _ret

        _classCallCheck(this, WritingTool)

        for (
          var _len = arguments.length, args = Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key]
        }

        return (_ret = (
          (_temp = (
            (_this = _possibleConstructorReturn(
              this,
              (_ref =
                WritingTool.__proto__ ||
                Object.getPrototypeOf(WritingTool)).call.apply(
                _ref,
                [this].concat(args)
              )
            )),
            _this
          )),
          (_this.state = {
            step: 1,
            planningExpanded: true,
            primaryColor: undefined,
            secondaryColor: undefined,
            image: undefined,
            light: false,
            modal: undefined
          }),
          _temp
        )), _possibleConstructorReturn(_this, _ret)
      }

      _createClass(WritingTool, [
        {
          key: 'componentWillMount',
          value: function componentWillMount () {
            window.usePreset = function (preset) {
              ;(0, _planningActions.usePreset)(_store2.default.dispatch, preset)
            }
            if (this.props.type === 'custom' || this.props.customType) {
              ;(0, _planningActions.useCustomPreset)(
                _store2.default.dispatch,
                this.props.customType
              )
            } else {
              ;(0, _planningActions.usePreset)(
                _store2.default.dispatch,
                this.props.type
              )
            }

            _store2.default.dispatch(
              (0, _planningActions.setInformations)(
                this.props.writingImage,
                this.props.writingDescription
              )
            )

            window.addEventListener('resize', this.onResize.bind(this))
          }
        },
        {
          key: 'getColorsFromBackground',
          value: function getColorsFromBackground () {
            var _this2 = this

            if (this.props.image) {
              var pickedImage = this.props.image
            } else {
              var images = [
                '/assets/angry-alligator-creek-back.jpg',
                '/assets/arctic-wanderlust-back.jpg',
                '/assets/doomed-sea-back.jpg',
                '/assets/lava-tunnel-back.jpg',
                '/assets/lesson-hive.jpg',
                '/assets/temple.jpg',
                '/assets/welcome-bg.jpg',
                '/assets/what-why-where-woods-back.jpg',
                '/assets/ac7ywy8tv3qf3quimykx.jpg',
                '/assets/aa7ellrkrwfyljjnryne.jpg',
                '/assets/papbnwocavrkia6fai0n.jpg',
                '/assets/hhzgyh7bgdbhtbu8rpzs.jpg',
                '/assets/fqutf1jckgysqaivhgpq.jpg'
              ]
              var pickedImage =
                images[Math.floor(Math.random() * (images.length - 1))]
            }

            // CACHED BACKGROUND COLORS
            if (window.localStorage.getItem('nzk-bg-' + pickedImage)) {
              var cached = JSON.parse(
                window.localStorage.getItem('nzk-bg-' + pickedImage)
              )

              var secondaryColor = new _color2.default(
                cached.primaryColor.color
              )
              if (cached.light) {
                secondaryColor = secondaryColor.darken(0.2)
              } else {
                secondaryColor = secondaryColor.lighten(0.2)
              }

              this.setState({
                primaryColor: new _color2.default(cached.primaryColor.color),
                secondaryColor: secondaryColor,
                image: cached.image,
                light: cached.light
              })
              return
            }

            // NOT CACHED BACKGROUND COLORS
            Vibrant.from(pickedImage).getPalette(function (err, palette) {
              if (err) {
                return
              }

              var primaryColor = new _color2.default(palette.Vibrant.getRgb())

              var light
              var secondaryColor = new _color2.default(palette.Vibrant.getRgb())
              if (primaryColor.light()) {
                light = true
                secondaryColor = secondaryColor.darken(0.2)
              } else {
                light = false
                secondaryColor = secondaryColor.lighten(0.2)
              }

              _this2.setState({
                primaryColor: primaryColor,
                secondaryColor: secondaryColor,
                image: pickedImage,
                light: light
              })

              window.localStorage.setItem(
                'nzk-bg-' + pickedImage,
                JSON.stringify({
                  primaryColor: primaryColor,
                  secondaryColor: secondaryColor,
                  image: pickedImage,
                  light: light
                })
              )
            })
          }
        },
        {
          key: 'componentDidMount',
          value: function componentDidMount () {
            this.getColorsFromBackground()

            if (window.localStorage.getItem('nzk-planning')) {
              ;(0, _planningActions.loadPlanningLocalstorage)(
                _store2.default.dispatch
              )
            }

            document.addEventListener('touchmove', function (e) {
              e.preventDefault()
            })

            document
              .getElementsByClassName('host')[0]
              .addEventListener('touchmove', function (e) {
                e.preventDefault()
              })

            document
              .getElementsByClassName('background')[0]
              .addEventListener('touchmove', function (e) {
                e.preventDefault()
              })
          }
        },
        {
          key: 'displayModal',
          value: function displayModal (
            message,
            onConfirm,
            onCancel,
            confirmMessage,
            cancelMessage
          ) {
            this.setState({
              modal: _react2.default.createElement(_ConfirmModal2.default, {
                message: message,
                onConfirm: onConfirm,
                onCancel: onCancel,
                confirmText: confirmMessage,
                cancelText: cancelMessage
              })
            })
          }
        },
        {
          key: 'dismissModal',
          value: function dismissModal () {
            this.setState({
              modal: null
            })
          }
        },
        {
          key: 'onResize',
          value: function onResize (e) {
            if (e.target.window.innerWidth > 1280) {
              this.setState({ planningExpanded: true })
              this.addAnimation(this.expandDrawerAnimation.bind(this))
            }
          }
        },
        {
          key: 'expandDrawerAnimation',
          value: function expandDrawerAnimation (_ref2) {
            var target = _ref2.target

            var left = target.find({ name: 'leftCol' })
            var right = target.find({ name: 'rightCol' })

            if (!this.state.planningExpanded) {
              return new _gsap.TimelineMax()
                .to(
                  left,
                  1,
                  {
                    ease: _gsap.Bounce.easeOut,
                    className: '-=planningExpanded'
                  },
                  0
                )
                .to(
                  right,
                  1,
                  {
                    ease: _gsap.Bounce.easeOut,
                    className: '-=planningExpanded'
                  },
                  0
                )
            } else {
              return new _gsap.TimelineMax()
                .to(left, 0, { position: 'absolute' }, 0)
                .to(
                  left,
                  1.5,
                  {
                    ease: _gsap.Bounce.easeOut,
                    className: '+=planningExpanded'
                  },
                  0
                )
                .to(
                  right,
                  1.5,
                  {
                    ease: _gsap.Bounce.easeOut,
                    className: '+=planningExpanded'
                  },
                  0
                )
                .to(left, 0, { position: 'relative' }, 1.5)
            }
          }
        },
        {
          key: 'toggleExpand',
          value: function toggleExpand () {
            this.addAnimation(this.expandDrawerAnimation.bind(this))
            this.setState({ planningExpanded: !this.state.planningExpanded })
          }
        },
        {
          key: 'closeDrawer',
          value: function closeDrawer () {
            this.addAnimation(this.expandDrawerAnimation.bind(this))
            this.setState({ planningExpanded: false })
          }
        },
        {
          key: 'pick',
          value: function pick (type) {
            var POSSIBLE_TYPES = [
              'story',
              'poetry',
              'letter',
              'instructions',
              'opinion',
              'news'
            ]
            if (POSSIBLE_TYPES.indexOf(type) < 0) {
              return
            }

            ;(0, _planningActions.usePreset)(_store2.default.dispatch, type)
          }
        },
        {
          key: 'clearPlanning',
          value: function clearPlanning () {
            window.localStorage.removeItem('nzk-planning')
            _store2.default.dispatch((0, _planningActions.clearPlanning)())
          }
        },
        {
          key: 'clearWriting',
          value: function clearWriting () {
            window.localStorage.removeItem('nzk-writing')
            _store2.default.dispatch((0, _writingActions.clearWriting)())
          }
        },
        {
          key: 'render',
          value: function render () {
            var _this3 = this

            var buttonsClassNames = (0, _classnames2.default)({
              withTitle: _store2.default.getState().planning.needsTitle,
              withoutTitle: !_store2.default.getState().planning.needsTitle,
              buttons: true
            })

            var buttonBackgroundClassNames = (0, _classnames2.default)({
              withTitle: _store2.default.getState().planning.needsTitle,
              withoutTitle: !_store2.default.getState().planning.needsTitle,
              buttonBackground: true
            })

            var buttonsStyle = {
              backgroundColor: this.state.secondaryColor,
              borderColor: this.state.secondaryColor
            }

            return _react2.default.createElement(
              _reactRedux.Provider,
              { store: _store2.default },
              _react2.default.createElement(
                'div',
                {
                  className: 'host',
                  ref: function ref (w) {
                    return (_this3.writingtool = w)
                  },
                  'data-jsx': 4006594116,
                  'data-jsx-ext': _WritingTool2.default.__scopedHash
                },
                _react2.default.createElement(_TypePickerPopover2.default, {
                  pick: this.pick
                }),
                this.state.modal,
                _react2.default.createElement('div', {
                  className: 'background',
                  style: {
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundImage: 'url("' + this.state.image + '")'
                  },
                  'data-jsx': 4006594116,
                  'data-jsx-ext': _WritingTool2.default.__scopedHash
                }),
                _react2.default.createElement(
                  'div',
                  {
                    className: 'column left planningExpanded',
                    name: 'leftCol',
                    'data-jsx': 4006594116,
                    'data-jsx-ext': _WritingTool2.default.__scopedHash
                  },
                  _react2.default.createElement(_Writer2.default, {
                    primaryColor: this.state.primaryColor,
                    secondaryColor: this.state.secondaryColor,
                    light: this.state.light,
                    minNbWords: this.props.minNbWords,
                    onMobileFocus: this.closeDrawer.bind(this),
                    backCallback: this.props.backCallback,
                    hideTextStyleButtons: this.props.hideTextStyleButtons,
                    hideAlignButtons: this.props.hideAlignButtons,
                    hideImageButton: this.props.hideImageButton,
                    hideClearButton: this.props.hideClearButton,
                    clearWriting: this.clearWriting,
                    clearPlanning: this.clearPlanning,
                    displayModal: this.displayModal.bind(this),
                    dismissModal: this.dismissModal.bind(this)
                  })
                ),
                _react2.default.createElement(
                  'div',
                  {
                    className: 'column right planningExpanded',
                    name: 'rightCol',
                    'data-jsx': 4006594116,
                    'data-jsx-ext': _WritingTool2.default.__scopedHash
                  },
                  _react2.default.createElement('div', {
                    className: buttonBackgroundClassNames,
                    style: {
                      backgroundColor: this.state.primaryColor
                    },
                    'data-jsx': 4006594116,
                    'data-jsx-ext': _WritingTool2.default.__scopedHash
                  }),
                  _react2.default.createElement(
                    'div',
                    {
                      className: buttonsClassNames,
                      'data-jsx': 4006594116,
                      'data-jsx-ext': _WritingTool2.default.__scopedHash
                    },
                    _react2.default.createElement(
                      'div',
                      {
                        onClick: this.toggleExpand.bind(this),
                        style: buttonsStyle,
                        'data-jsx': 4006594116,
                        'data-jsx-ext': _WritingTool2.default.__scopedHash
                      },
                      _react2.default.createElement(_Icon2.default, {
                        name: this.state.planningExpanded ? 'right' : 'left',
                        fontSize: '25px',
                        color: this.state.light ? 'black' : 'white'
                      })
                    )
                  ),
                  _react2.default.createElement(_PlanningDrawer2.default, {
                    primaryColor: this.state.primaryColor,
                    secondaryColor: this.state.secondaryColor,
                    light: this.state.light
                  })
                ),
                _react2.default.createElement(_style2.default, {
                  styleId: 4006594116,
                  css: '*{box-sizing:border-box}'
                }),
                _react2.default.createElement(_style2.default, {
                  styleId: _WritingTool2.default.__scopedHash,
                  css: _WritingTool2.default.__scoped
                }),
                _react2.default.createElement(
                  'div',
                  {
                    className: 'progressBar',
                    'data-jsx': 4006594116,
                    'data-jsx-ext': _WritingTool2.default.__scopedHash
                  },
                  _react2.default.createElement(_ProgressBar2.default, {
                    minNbWords: _store2.default.getState().writing.constraints
                      .minNbWords,
                    maxNbWords: _store2.default.getState().writing.constraints
                      .maxNbWords,
                    progress: _store2.default.getState().writing.progress,
                    primaryColor: this.state.primaryColor,
                    secondaryColor: this.state.secondaryColor,
                    light: this.state.light
                  })
                )
              )
            )
          }
        }
      ])

      return WritingTool
    })(_react.Component))
  ) || _class
)
WritingTool.propTypes = {
  image: _propTypes2.default.string,
  planning: _propTypes2.default.any,
  type: _propTypes2.default.oneOf([
    'story',
    'poetry',
    'explanation',
    'instructions',
    'opinion',
    'news',
    'letter',
    'diary',
    'playscript',
    'recount',
    'biography',
    'report, freewrite',
    'custom'
  ]),
  customType: _propTypes2.default.shape({
    title: _propTypes2.default.string,
    icon: _propTypes2.default.string,
    needsTitle: _propTypes2.default.bool,
    fields: _propTypes2.default.arrayOf(
      _propTypes2.default.shape({
        title: _propTypes2.default.string,
        type: _propTypes2.default.oneOf(['input', 'textarea']),
        numberOfFields: _propTypes2.default.number,
        numberPerRow: _propTypes2.default.number,
        overloadable: _propTypes2.default.bool,
        removeable: _propTypes2.default.bool,
        fields: _propTypes2.default.arrayOf(_propTypes2.default.string)
      })
    )
  }),
  writingImage: _propTypes2.default.string,
  writingDescription: _propTypes2.default.string,
  backCallback: _propTypes2.default.func,
  hideImageButton: _propTypes2.default.bool,
  hideTextStyleButtons: _propTypes2.default.bool,
  hideAlignButtons: _propTypes2.default.bool,
  hideClearButton: _propTypes2.default.bool
}
WritingTool.defaultProps = {
  writingImage:
    'https://az801952.vo.msecnd.net/uploads/f1003e55-127d-42de-a49e-82a10d80b5f1.jpg',
  writingDescription:
    'Cupcake ipsum dolor sit amet fruitcake gummi bears. Liquorice chocolate dessert toffee.',
  hideClearButton: true
}
exports.default = WritingTool

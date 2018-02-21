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

var _dec, _dec2, _class

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

var _style = require('styled-jsx/style')

var _style2 = _interopRequireDefault(_style)

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _slate = require('slate')

var _slateReact = require('slate-react')

var _slateHtmlSerializer = require('slate-html-serializer')

var _slateHtmlSerializer2 = _interopRequireDefault(_slateHtmlSerializer)

var _slatePlainSerializer = require('slate-plain-serializer')

var _slatePlainSerializer2 = _interopRequireDefault(_slatePlainSerializer)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _reactGsapEnhancer = require('react-gsap-enhancer')

var _reactGsapEnhancer2 = _interopRequireDefault(_reactGsapEnhancer)

var _reactRedux = require('react-redux')

var _gsap = require('gsap')

var _reactIntl = require('react-intl')

var _debounce = require('lodash/debounce')

var _debounce2 = _interopRequireDefault(_debounce)

var _words = require('lodash/words')

var _words2 = _interopRequireDefault(_words)

var _actions = require('../../store/actions')

var _Modal = require('../../../Modal')

var _Modal2 = _interopRequireDefault(_Modal)

var _Uploader = require('../../../Uploader')

var _Uploader2 = _interopRequireDefault(_Uploader)

var _Icon = require('../../../Icon')

var _Icon2 = _interopRequireDefault(_Icon)

var _Button = require('../../../Button')

var _Button2 = _interopRequireDefault(_Button)

var _Writer = require('./Writer.styles')

var _Writer2 = _interopRequireDefault(_Writer)

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

/**
 * Define the default node type.
 */
var DEFAULT_NODE = 'paragraph'

var defaultBlock = {
  kind: 'block',
  type: 'paragraph',
  isVoid: false,
  data: {}

  /**
   * Define a schema.
   *
   * @type {Object}
   */
}
var schema = {
  nodes: {
    image: function image (props) {
      var node = props.node

      var src = node.data.get('src')
      return _react2.default.createElement(
        'img',
        _extends(
          {
            src: src,
            className: 'importedImage',
            alt: '',
            style: {
              maxWidth: '75%',
              maxHeight: '400px',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '20px',
              marginBottom: '20px'
            }
          },
          props.attributes
        )
      )
    },
    'align-left': function alignLeft (props) {
      return _react2.default.createElement(
        'p',
        {
          style: {
            textAlign: 'left'
          }
        },
        props.children
      )
    },
    'align-center': function alignCenter (props) {
      return _react2.default.createElement(
        'p',
        {
          style: {
            textAlign: 'center'
          }
        },
        props.children
      )
    },
    'align-right': function alignRight (props) {
      return _react2.default.createElement(
        'p',
        {
          style: {
            textAlign: 'right'
          }
        },
        props.children
      )
    }
  },
  rules: [
    // Rule to insert a paragraph below a void node (the image) if that node is
    // the last one in the document.
    {
      match: function match (node) {
        return node.kind === 'document'
      },
      validate: function validate (document) {
        var lastNode = document.nodes.last()
        return lastNode && lastNode.isVoid ? true : null
      },
      normalize: function normalize (transform, document) {
        var block = _slate.Block.create(defaultBlock)
        transform.insertNodeByKey(document.key, document.nodes.size, block)
      }
    }
  ],
  marks: {
    bold: {
      fontWeight: 'bold'
    },
    italic: {
      fontStyle: 'italic'
    },
    underline: {
      textDecoration: 'underline'
    }
  }
}

var BLOCK_TAGS = {
  p: 'paragraph',
  img: 'image'
}

var MARK_TAGS = {
  em: 'italic',
  strong: 'bold',
  u: 'underline'
}

var rules = [
  {
    deserialize: function deserialize (el, next) {
      var type = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (!type) return

      if (type === 'paragraph' && el.style && el.style['text-align']) {
        switch (el.style['text-align']) {
          case 'left':
            type = 'align-left'
            break
          case 'center':
            type = 'align-center'
            break
          case 'right':
            type = 'align-right'
            break
        }
      }

      var data = {}

      if (type === 'image') {
        data.src = el.src
      }

      return {
        kind: 'block',
        type: type,
        nodes: next(el.childNodes),
        data: data
      }
    },
    serialize: function serialize (object, children) {
      if (object.kind !== 'block') return

      switch (object.type) {
        case 'paragraph':
          return _react2.default.createElement('p', null, children)
        case 'align-left':
          return _react2.default.createElement(
            'p',
            { style: { textAlign: 'left' } },
            children
          )
        case 'align-center':
          return _react2.default.createElement(
            'p',
            { style: { textAlign: 'center' } },
            children
          )
        case 'align-right':
          return _react2.default.createElement(
            'p',
            { style: { textAlign: 'right' } },
            children
          )
        case 'image':
          return _react2.default.createElement('img', {
            src: object.data.get('src'),
            className: 'importedImage',
            alt: '',
            style: {
              maxWidth: '75%',
              maxHeight: '400px',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '20px',
              marginBottom: '20px'
            }
          })
      }
    }
  },
  {
    deserialize: function deserialize (el, next) {
      var type = MARK_TAGS[el.tagName.toLowerCase()]
      if (!type) return
      return {
        kind: 'mark',
        type: type,
        nodes: next(el.childNodes)
      }
    }
  },
  {
    serialize: function serialize (object, children) {
      if (object.kind !== 'mark') return
      switch (object.type) {
        case 'bold':
          return _react2.default.createElement('strong', null, children)
        case 'italic':
          return _react2.default.createElement('em', null, children)
        case 'underline':
          return _react2.default.createElement('u', null, children)
      }
    }
  }
]
var html = new _slateHtmlSerializer2.default({ rules: rules })

var Writer = ((_dec = (0, _reactRedux.connect)(function (store) {
  return {
    placeholders: store.placeholders,
    writing: store.writing,
    constraints: store.constraints
  }
})),
  (_dec2 = (0, _reactGsapEnhancer2.default)()),
  _dec(
    (_class =
    _dec2(
      (_class = (function (_Component) {
        _inherits(Writer, _Component)

        function Writer (props) {
          _classCallCheck(this, Writer)

          var _this = _possibleConstructorReturn(
            this,
            (Writer.__proto__ || Object.getPrototypeOf(Writer)).call(
              this,
              props
            )
          )

          _this.hasMark = function (type) {
            var writingState = _this.state.writingState

            return writingState.marks.some(function (mark) {
              return mark.type === type
            })
          }

          _this.hasBlock = function (type) {
            var writingState = _this.state.writingState

            return writingState.blocks.some(function (node) {
              return node.type === type
            })
          }

          _this.onStateChange = function (_ref) {
            var state = _ref.state

            if (state.document != _this.state.writingState.document) {
              _this.updateWordCount(state)
              _this.onDebouncedDocumentChange(state)
            }

            _this.setState({ writingState: state })
          }

          _this.onDebouncedDocumentChange = function (state) {
            _this.props.dispatch(
              (0, _actions.setWriting)({
                text: html.serialize(state)
              })
            )
          }

          _this.getWordCountForState = function (state) {
            var text = _slatePlainSerializer2.default.serialize(state)

            if (_this.props.lang === 'jp') {
              return text.replace(/\s+/g, '').length
            }
            return (0, _words2.default)(text).length
          }

          _this.onClickMark = function (e, type) {
            e.preventDefault()
            var writingState = _this.state.writingState

            writingState = writingState
              .transform()
              .toggleMark(type)
              .apply()
            _this.setState({ writingState: writingState })
          }

          _this.insertImage = function (state, src) {
            return state
              .transform()
              .insertBlock({
                type: 'image',
                isVoid: true,
                data: { src: src }
              })
              .apply()
          }

          _this.onClickBlock = function (e, type) {
            e.preventDefault()
            var writingState = _this.state.writingState

            var transform = writingState.transform()

            if (type === 'image') {
              _this.openImageUploaderModal()
            } else {
              var isActive = _this.hasBlock(type)
              transform.setBlock(isActive ? DEFAULT_NODE : type)
            }

            writingState = transform.apply()
            _this.setState({ writingState: writingState })
          }

          _this.render = function () {
            var colorStyle = {
              color: _this.props.textColor
            }

            var dividerColor = _this.props.light
              ? 'rgba(0, 0, 0, .25)'
              : 'rgba(255, 255, 255, .25)'

            return _react2.default.createElement(
              'div',
              {
                className: 'host',
                'data-jsx-ext': _Writer2.default.__scopedHash
              },
              _this.renderToolbar(),
              _this.renderImageUploaderModal(),
              _react2.default.createElement(
                'div',
                {
                  className: 'writer',
                  ref: _this.writerRef,
                  'data-jsx-ext': _Writer2.default.__scopedHash
                },
                _react2.default.createElement(
                  'div',
                  {
                    className:
                      'title-container ' +
                      (_this.props.light ? 'light' : 'dark'),
                    'data-jsx-ext': _Writer2.default.__scopedHash
                  },
                  _react2.default.createElement('textarea', {
                    className: 'title',
                    tabIndex: 1,
                    placeholder: _this.props.placeholders.title,
                    ref: _this.titleRef,
                    onKeyDown: _this.onTitleKeyDown,
                    style: _extends({}, colorStyle, {
                      borderBottom: '2px solid ' + dividerColor
                    }),
                    onChange: _this.onTitleChange,
                    value: _this.state.writingTitle,
                    'data-jsx-ext': _Writer2.default.__scopedHash
                  })
                ),
                _this.renderEditor()
              ),
              _react2.default.createElement(_style2.default, {
                styleId: _Writer2.default.__scopedHash,
                css: _Writer2.default.__scoped
              })
            )
          }

          _this.renderToolbar = function () {
            var bgStyle = {
              color: _this.props.textColor,
              backgroundColor: _this.props.toolbarColor
            }
            return _react2.default.createElement(
              'div',
              {
                style: {
                  color: _this.props.textColor
                },
                'data-jsx-ext': _Writer2.default.__scopedHash
              },
              _react2.default.createElement(
                'div',
                {
                  className: 'menu toolbar-menu',
                  style: bgStyle,
                  'data-jsx-ext': _Writer2.default.__scopedHash
                },
                _react2.default.createElement(
                  'div',
                  {
                    className: 'toolbar-button',
                    'data-jsx-ext': _Writer2.default.__scopedHash
                  },
                  _react2.default.createElement(
                    _Button2.default,
                    {
                      bgColor: 'white',
                      shadow: true,
                      round: true,
                      onClick: _this.props.onBack
                    },
                    _react2.default.createElement(_Icon2.default, {
                      name: 'left',
                      color: 'black'
                    })
                  )
                ),
                !_this.props.hideSaveButton &&
                  _react2.default.createElement(
                    'div',
                    {
                      className: 'toolbar-button save',
                      'data-jsx-ext': _Writer2.default.__scopedHash
                    },
                    _react2.default.createElement(
                      _Button2.default,
                      { bgColor: 'white', shadow: true, onClick: _this.onSave },
                      _react2.default.createElement(
                        _reactIntl.FormattedMessage,
                        { id: 'save', defaultMessage: 'Save' }
                      )
                    )
                  ),
                !_this.props.hideClearButton &&
                  _react2.default.createElement(
                    'div',
                    {
                      className: 'toolbar-button clear',
                      'data-jsx-ext': _Writer2.default.__scopedHash
                    },
                    _react2.default.createElement(
                      _Button2.default,
                      {
                        bgColor: 'white',
                        shadow: true,
                        onClick: _this.props.onClear
                      },
                      _react2.default.createElement(
                        _reactIntl.FormattedMessage,
                        { id: 'clear', defaultMessage: 'Clear' }
                      )
                    )
                  ),
                !_this.props.hideTextStyleButtons &&
                  _this.renderMarkButton('bold', 'bold'),
                !_this.props.hideTextStyleButtons &&
                  _this.renderMarkButton('italic', 'italic'),
                !_this.props.hideTextStyleButtons &&
                  _this.renderMarkButton('underline', 'underline'),
                !_this.props.hideAlignButtons &&
                  _this.renderBlockButton('align-left', 'align-left'),
                !_this.props.hideAlignButtons &&
                  _this.renderBlockButton('align-center', 'align-center'),
                !_this.props.hideAlignButtons &&
                  _this.renderBlockButton('align-right', 'align-right'),
                !_this.props.hideImageButton &&
                  _this.renderBlockButton('image', 'picture')
              ),
              _react2.default.createElement(_style2.default, {
                styleId: _Writer2.default.__scopedHash,
                css: _Writer2.default.__scoped
              })
            )
          }

          _this.renderMarkButton = function (type, icon) {
            var isActive = _this.hasMark(type)
            var isDisabled = _this.state.toolbarDisabled
            var onMouseDown = function onMouseDown (e) {
              return _this.onClickMark(e, type)
            }

            var style = {
              cursor: 'pointer'
            }

            var activeStyle = _extends({}, style, {
              color: _this.props.light
                ? 'rgba(255,255,255,.8)'
                : 'rgba(0,0,0,.8)'
            })

            var disabledStyle = {
              opacity: 0.3
            }

            return _react2.default.createElement(
              'span',
              {
                className: 'button',
                onMouseDown: isDisabled ? function () {} : onMouseDown,
                'data-active': isActive,
                'data-jsx-ext': _Writer2.default.__scopedHash
              },
              _react2.default.createElement(
                'span',
                {
                  style: isDisabled
                    ? disabledStyle
                    : isActive ? activeStyle : style,
                  'data-jsx-ext': _Writer2.default.__scopedHash
                },
                _react2.default.createElement(_Icon2.default, { name: icon })
              ),
              _react2.default.createElement(_style2.default, {
                styleId: _Writer2.default.__scopedHash,
                css: _Writer2.default.__scoped
              })
            )
          }

          _this.renderBlockButton = function (type, icon) {
            var isActive = _this.hasBlock(type)
            var onMouseDown = function onMouseDown (e) {
              return _this.onClickBlock(e, type)
            }
            var isDisabled = _this.state.toolbarDisabled

            var style = {
              cursor: 'pointer'
            }

            var activeStyle = _extends({}, style, {
              color: _this.props.light ? 'white' : 'black'
            })

            var disabledStyle = {
              opacity: 0.3
            }

            return _react2.default.createElement(
              'span',
              {
                className: 'button',
                onMouseDown: isDisabled ? function () {} : onMouseDown,
                'data-active': isActive,
                'data-jsx-ext': _Writer2.default.__scopedHash
              },
              _react2.default.createElement(
                'span',
                {
                  style: isDisabled
                    ? disabledStyle
                    : isActive ? activeStyle : style,
                  'data-jsx-ext': _Writer2.default.__scopedHash
                },
                _react2.default.createElement(_Icon2.default, { name: icon })
              ),
              _react2.default.createElement(_style2.default, {
                styleId: _Writer2.default.__scopedHash,
                css: _Writer2.default.__scoped
              })
            )
          }

          _this.renderImageUploaderModal = function () {
            return _react2.default.createElement(
              _Modal2.default,
              {
                contentLabel: 'image-uploader',
                isOpen: _this.state.imageUploaderModalIsOpen
              },
              _react2.default.createElement(
                'div',
                {
                  onClick: _this.closeImageUploaderModal,
                  className: 'image-uploader-container',
                  'data-jsx-ext': _Writer2.default.__scopedHash
                },
                _react2.default.createElement(
                  'div',
                  {
                    className: 'image-uploader',
                    'data-jsx-ext': _Writer2.default.__scopedHash
                  },
                  _react2.default.createElement(_Uploader2.default, {
                    api: 'https://file.nightzookeeper.com/images/upload',
                    uploadedImage: function uploadedImage (url) {
                      if (!url) return
                      var writingState = _this.state.writingState

                      writingState = _this.insertImage(writingState, url)
                      _this.onStateChange(writingState)
                      _this.closeImageUploaderModal()
                    }
                  })
                ),
                _react2.default.createElement(
                  'div',
                  {
                    className: 'image-uploader-close-button',
                    'data-jsx-ext': _Writer2.default.__scopedHash
                  },
                  _react2.default.createElement(
                    _Button2.default,
                    { round: true, shadow: true, bgColor: 'grey' },
                    _react2.default.createElement(_Icon2.default, {
                      name: 'cross'
                    })
                  )
                )
              ),
              _react2.default.createElement(_style2.default, {
                styleId: _Writer2.default.__scopedHash,
                css: _Writer2.default.__scoped
              })
            )
          }

          _this.renderEditor = function () {
            var placeholder = _react2.default.createElement('span', {
              style: {
                color: _this.state.placeholderColor
              },
              dangerouslySetInnerHTML: { __html: _this.props.placeholders.text }
            })

            return _react2.default.createElement(
              'div',
              {
                className: 'editor-wrapper',
                'data-jsx-ext': _Writer2.default.__scopedHash
              },
              _react2.default.createElement(
                'div',
                {
                  className: 'editor',
                  style: {
                    color: _this.props.textColor
                  },
                  ref: _this.editorRef,
                  onClick: _this.focusEditor.bind(_this),
                  name: 'editor',
                  'data-jsx-ext': _Writer2.default.__scopedHash
                },
                _react2.default.createElement(_slateReact.Editor, {
                  key: 'editor',
                  spellCheck: true,
                  placeholder: placeholder,
                  schema: schema,
                  tabIndex: 2,
                  ref: _this.slateEditorRef,
                  state: _this.state.writingState,
                  onFocus: _this.onSlateEditorFocus.bind(_this),
                  onBlur: _this.onBlur.bind(_this),
                  onChange: _this.onStateChange,
                  style: {
                    height: 'calc(100% - 40px)',
                    paddingBottom: '100px'
                  }
                })
              ),
              _react2.default.createElement(_style2.default, {
                styleId: _Writer2.default.__scopedHash,
                css: _Writer2.default.__scoped
              })
            )
          }

          var initialState = _this.props.writing.text || '<p></p>'

          _this.state = {
            writingTitle: _this.props.writing.title,
            writingState: html.deserialize(initialState),
            placeholderColor: _this.props.light
              ? 'rgba(0,0,0,.6)'
              : 'rgba(255,255,255,.6)',
            mobile: false,
            focusSlateEditor: false,
            toolbarDisabled: true,
            imageUploaderModalIsOpen: false
          }

          _this.onStateChange = _this.onStateChange.bind(_this)
          _this.onTitleChange = _this.onTitleChange.bind(_this)
          _this.resizeTitle = _this.resizeTitle.bind(_this)
          _this.titleRef = _this.titleRef.bind(_this)
          _this.editorRef = _this.editorRef.bind(_this)
          _this.writerRef = _this.writerRef.bind(_this)
          _this.slateEditorRef = _this.slateEditorRef.bind(_this)
          _this.onTitleKeyDown = _this.onTitleKeyDown.bind(_this)
          _this.closeImageUploaderModal = _this.closeImageUploaderModal.bind(
            _this
          )
          _this.insertImage = _this.insertImage.bind(_this)
          _this.onSave = _this.onSave.bind(_this)

          _this.onDebouncedDocumentChange = (0, _debounce2.default)(
            _this.onDebouncedDocumentChange,
            1000
          )
          return _this
        }

        _createClass(Writer, [
          {
            key: 'componentDidMount',
            value: function componentDidMount () {
              if (/Android|iPad/i.test(navigator.userAgent)) {
                this.setState({ mobile: true })
                this.writer.style.height = 'calc(100vh - 155px)'
              }

              this.editor.addEventListener(
                'touchmove',
                function (e) {
                  e.stopPropagation()
                },
                { passive: true }
              )

              this.writer.addEventListener('click', function (e) {})

              this.updateWordCount(this.state.writingState)
            }
          },
          {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps (nextProps) {
              // Just support case where we are clearing the writing
              if (
                nextProps.writing.title === '' &&
                nextProps.writing.text === ''
              ) {
                this.setState({
                  writingTitle: '',
                  writingState: html.deserialize('<p></p>')
                })
              }

              if (nextProps.light !== this.props.light) {
                this.setState({
                  placeholderColor: nextProps.light
                    ? 'rgba(0,0,0,.6)'
                    : 'rgba(255,255,255,.6)'
                })
              }
            }

            /**
             * Check if the current selection has a mark with `type` in it.
             *
             * @param {String} type
             * @return {Boolean}
             */

            /**
             * Check if the any of the currently selected blocks are of `type`.
             *
             * @param {String} type
             * @return {Boolean}
             */
          },
          {
            key: 'onTitleChange',
            value: function onTitleChange (event) {
              this.setState({
                writingTitle: event.target.value
              })
              this.props.dispatch(
                (0, _actions.setWriting)({
                  title: event.target.value
                })
              )
              this.addAnimation(this.resizeTitle)
            }
          },
          {
            key: 'updateWordCount',
            value: function updateWordCount (state) {
              this.props.dispatch(
                (0, _actions.setWordCount)(this.getWordCountForState(state))
              )
            }
          },
          {
            key: 'focusEditor',
            value: function focusEditor () {
              var writingState = this.state.writingState
                .transform()
                .focus()
                .apply()
              this.setState({ writingState: writingState })
            }

            /**
             * When a mark button is clicked, toggle the current mark.
             *
             * @param {Event} e
             * @param {String} type
             */

            /**
             * When a block button is clicked, toggle the block type.
             *
             * @param {Event} e
             * @param {String} type
             */
          },
          {
            key: 'onSave',
            value: function onSave () {
              var text = this.props.saveAsHtml
                ? html.serialize(this.state.writingState)
                : _slatePlainSerializer2.default.serialize(
                  this.state.writingState
                )

              this.props.dispatch((0, _actions.setWriting)({ text: text }))
              this.props.onSave()
            }
          },
          {
            key: 'titleRef',
            value: function titleRef (el) {
              this.title = el
            }
          },
          {
            key: 'writerRef',
            value: function writerRef (el) {
              this.writer = el
            }
          },
          {
            key: 'editorRef',
            value: function editorRef (el) {
              this.editor = el
            }
          },
          {
            key: 'slateEditorRef',
            value: function slateEditorRef (el) {
              this.slateEditor = el
            }
          },
          {
            key: 'resizeTitle',
            value: function resizeTitle () {
              return new _gsap.TimelineMax()
                .to(this.title, 0, { height: '1px' })
                .to(this.title, 0, {
                  height: 10 + this.title.scrollHeight + 'px'
                })
            }
          },
          {
            key: 'onTitleKeyDown',
            value: function onTitleKeyDown (event) {
              if (event.key === 'Enter') {
                event.preventDefault()
              }
              if (event.key === 'Tab') {
                event.preventDefault()
                this.focusEditor()
              }
            }

            /**
             * Render the toolbar.
             *
             * @return {Element}
             */

            /**
             * Render a mark-toggling toolbar button.
             *
             * @param {String} type
             * @param {String} icon
             * @return {Element}
             */
          },
          {
            key: 'resizeEditorAnimation',
            value: function resizeEditorAnimation (_ref2) {
              var target = _ref2.target

              var editor = target.find({ name: 'editor' })
              return new _gsap.TimelineMax().to(editor, 1, {
                height: '40px',
                maxHeight: '100px'
              })
            }
          },
          {
            key: 'onSlateEditorFocus',
            value: function onSlateEditorFocus () {
              this.setState({ toolbarDisabled: false })

              if (this.state.mobile) {
                this.props.onMobileFocus()

                // Disables iPad view pushing
                window.scrollTo(0, 0)
                document.body.scrollTop = 0

                if (window.innerHeight < window.innerWidth) {
                  this.writer.style.minHeight = '218px'
                  this.writer.style.height = '218px'
                } else {
                  this.writer.style.minHeight = '565px'
                  this.writer.style.height = '565px'
                }
              }
            }
          },
          {
            key: 'onBlur',
            value: function onBlur () {
              this.setState({ toolbarDisabled: true })

              if (this.state.mobile) {
                this.writer.style.minHeight = '300px'
                this.writer.style.height = 'calc(100vh - 155px)'
              }
            }
          },
          {
            key: 'openImageUploaderModal',
            value: function openImageUploaderModal () {
              this.setState({
                imageUploaderModalIsOpen: true
              })
            }
          },
          {
            key: 'closeImageUploaderModal',
            value: function closeImageUploaderModal () {
              this.setState({
                imageUploaderModalIsOpen: false
              })
            }

            /**
             * Render the Slate editor.
             *
             * @return {Element}
             */
          }
        ])

        return Writer
      })(_react.Component))
    ) || _class)
  ) || _class)
Writer.propTypes = {
  lang: _propTypes2.default.string,
  placeholders: _propTypes2.default.object,
  writing: _propTypes2.default.object,
  constraints: _propTypes2.default.object,
  primaryColor: _propTypes2.default.any,
  toolbarColor: _propTypes2.default.any,
  textColor: _propTypes2.default.any,
  light: _propTypes2.default.bool,
  onMobileFocus: _propTypes2.default.func,
  onBack: _propTypes2.default.func,
  onClear: _propTypes2.default.func,
  onSave: _propTypes2.default.func,
  saveAsHtml: _propTypes2.default.bool,
  hideImageButton: _propTypes2.default.bool,
  hideTextStyleButtons: _propTypes2.default.bool,
  hideAlignButtons: _propTypes2.default.bool,
  hideClearButton: _propTypes2.default.bool
}
Writer.defaultProps = {
  hideImageButton: false,
  hideTextStyleButtons: false,
  hideAlignButtons: false,
  hideClearButton: true,
  saveAsHtml: true,
  lang: 'en',
  onBack: function onBack () {},
  onClear: function onClear () {},
  onSave: function onSave () {}
}
exports.default = Writer

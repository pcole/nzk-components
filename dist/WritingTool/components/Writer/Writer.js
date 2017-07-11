'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _style = require('styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _slate = require('slate');

var _Writer = require('./Writer.styles');

var _Writer2 = _interopRequireDefault(_Writer);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ProgressBar = require('../ProgressBar/ProgressBar');

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _reactRedux = require('react-redux');

var _writingActions = require('../../store/actions/writingActions');

var _Uploader = require('../../../Uploader/Uploader');

var _Uploader2 = _interopRequireDefault(_Uploader);

var _throttle = require('lodash/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _reactIntl = require('react-intl');

var _Icon = require('../../../Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Button = require('../../../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _reactGsapEnhancer = require('react-gsap-enhancer');

var _reactGsapEnhancer2 = _interopRequireDefault(_reactGsapEnhancer);

var _gsap = require('gsap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Define the default node type.
 */
var DEFAULT_NODE = 'paragraph';

var defaultBlock = {
  type: 'paragraph',
  isVoid: false,
  data: {}
  /**
   * Define a schema.
   *
   * @type {Object}
   */
};var schema = {
  nodes: {
    image: function image(props) {
      var node = props.node;

      var src = node.data.get('src');
      return _react2.default.createElement('img', _extends({ src: src, className: 'importedImage', style: {
          width: '100%',
          marginTop: '20px',
          marginBottom: '20px'
        }
      }, props.attributes));
    },
    'bulleted-list': function bulletedList(props) {
      return _react2.default.createElement(
        'ul',
        props.attributes,
        props.children
      );
    },
    'list-item': function listItem(props) {
      return _react2.default.createElement(
        'li',
        props.attributes,
        props.children
      );
    },
    'heading-one': function headingOne(props) {
      return _react2.default.createElement(
        'h1',
        { style: {
            fontSize: '24px'
          } },
        props.children
      );
    },
    'align-left': function alignLeft(props) {
      return _react2.default.createElement(
        'p',
        { style: {
            textAlign: 'left'
          } },
        props.children
      );
    },
    'align-center': function alignCenter(props) {
      return _react2.default.createElement(
        'p',
        { style: {
            textAlign: 'center'
          } },
        props.children
      );
    },
    'align-right': function alignRight(props) {
      return _react2.default.createElement(
        'p',
        { style: {
            textAlign: 'right'
          } },
        props.children
      );
    },
    'heading-two': function headingTwo(props) {
      return _react2.default.createElement(
        'h2',
        props.attributes,
        props.children
      );
    },
    'heading-three': function headingThree(props) {
      return _react2.default.createElement(
        'p',
        props.attributes,
        props.children
      );
    }
  },
  rules: [
  // Rule to insert a paragraph block if the document is empty.
  {
    match: function match(node) {
      return node.kind === 'document';
    },
    validate: function validate(document) {
      return document.nodes.size ? null : true;
    },
    normalize: function normalize(transform, document) {
      var block = _slate.Block.create(defaultBlock);
      transform.insertNodeByKey(document.key, 0, block);
    }
  },
  // Rule to insert a paragraph below a void node (the image) if that node is
  // the last one in the document.
  {
    match: function match(node) {
      return node.kind === 'document';
    },
    validate: function validate(document) {
      var lastNode = document.nodes.last();
      return lastNode && lastNode.isVoid ? true : null;
    },
    normalize: function normalize(transform, document) {
      var block = _slate.Block.create(defaultBlock);
      transform.insertNodeByKey(document.key, document.nodes.size, block);
    }
  }],
  marks: {
    bold: {
      fontWeight: 'bold'
    },
    italic: {
      fontStyle: 'italic'
    },
    underlined: {
      textDecoration: 'underline'
    },
    sizeOne: {
      fontSize: '12px'
    },
    sizeTwo: {
      fontSize: '17px'
    },
    sizeThree: {
      fontSize: '22px'
    }
  }
};

var Writer = (_dec = (0, _reactRedux.connect)(function (store) {
  return {
    writing: store.writing,
    needsTitle: store.planning.needsTitle
  };
}), _dec2 = (0, _reactGsapEnhancer2.default)(), _dec(_class = _dec2(_class = function (_React$Component) {
  _inherits(Writer, _React$Component);

  /**
   * Deserialize the initial editor state.
   *
   * @type {Object}
   */

  function Writer(props) {
    _classCallCheck(this, Writer);

    var _this = _possibleConstructorReturn(this, (Writer.__proto__ || Object.getPrototypeOf(Writer)).call(this, props));

    _this.hasMark = function (type) {
      var state = _this.state.state;

      return state.marks.some(function (mark) {
        return mark.type === type;
      });
    };

    _this.hasBlock = function (type) {
      var state = _this.state.state;

      return state.blocks.some(function (node) {
        return node.type === type;
      });
    };

    _this.onChange = function (state) {
      _this.setState({ state: state });
      _this.props.dispatch((0, _writingActions.textChanged)(state));
      _this.recordScreenHeight();
    };

    _this.onDocumentChange = function (document, state) {
      var count = document.text.split(' ').filter(function (w) {
        return w.length > 0;
      }).length;
      var progress = state.progress;
      var nbWords = Math.abs(count - _this.props.writing.nbWords);

      if (count > _this.props.writing.nbWords) {
        // Addition
        if (count / _this.props.writing.constraints.minNbWords * 50 > 50) {
          for (var i = 0; i < nbWords; i++) {
            progress += _this.props.writing.constraints.minNbWords / (2 * count);
          }
        } else {
          progress = count / _this.props.writing.constraints.minNbWords * 50;
        }
      } else if (count < _this.props.writing.nbWords) {
        // Deletion
        if (count / _this.props.writing.constraints.minNbWords * 50 > 50) {
          for (var _i = 0; _i < nbWords; _i++) {
            progress -= _this.props.writing.constraints.minNbWords / (2 * count);
          }
        } else {
          progress = count / _this.props.writing.constraints.minNbWords * 50;
        }
      }

      _this.props.dispatch((0, _writingActions.updateNbWords)(count));
      _this.props.dispatch((0, _writingActions.updateProgress)(progress));
      _this.throttledSave();
    };

    _this.onClickMark = function (e, type) {
      e.preventDefault();
      var state = _this.state.state;


      var sizes = ['sizeOne', 'sizeTwo', 'sizeThree'];
      if (sizes.indexOf(type) > -1) {
        sizes.map(function (size) {
          if (size !== type) {
            state = state.transform().removeMark(size).apply();
          }
        });
      }
      state = state.transform().toggleMark(type).apply();
      _this.setState({ state: state });
    };

    _this.insertImage = function (state, src) {
      return state.transform().insertBlock({
        type: 'image',
        isVoid: true,
        data: { src: src }
      }).apply();
    };

    _this.onClickBlock = function (e, type) {
      e.preventDefault();
      var state = _this.state.state;

      var transform = state.transform();
      var _state = state,
          document = _state.document;

      // Handle everything but list buttons.

      if (type !== 'bulleted-list' && type !== 'image') {
        var isActive = _this.hasBlock(type);
        var isList = _this.hasBlock('list-item');
        if (isList) {
          transform.setBlock(isActive ? DEFAULT_NODE : type).unwrapBlock('bulleted-list');
        } else {
          transform.setBlock(isActive ? DEFAULT_NODE : type);
        }
      } else if (type === 'image') {
        _this.displayImagePopover();
      } else {
        var _isList = _this.hasBlock('list-item');
        var isType = state.blocks.some(function (block) {
          return !!document.getClosest(block.key, function (parent) {
            return parent.type === type;
          });
        });

        if (_isList && isType) {
          transform.setBlock(DEFAULT_NODE).unwrapBlock('bulleted-list');
        } else {
          transform.setBlock('list-item').wrapBlock(type);
        }
      }

      state = transform.apply();
      _this.setState({ state: state });
    };

    _this.render = function () {
      return _react2.default.createElement(
        'div',
        {
          'data-jsx-ext': _Writer2.default.__scopedHash
        },
        _this.props.needsTitle ? _react2.default.createElement(
          'div',
          {
            'data-jsx-ext': _Writer2.default.__scopedHash
          },
          _react2.default.createElement(
            _reactIntl.FormattedMessage,
            { id: 'enter_title', defaultMessage: 'Enter your title here' },
            function (msg) {
              return _react2.default.createElement('input', { className: 'title-bar', type: 'text', placeholder: msg, style: {
                  color: _this.props.light ? 'black' : 'white',
                  background: '' + (_this.props.light ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)')
                }, value: _this.props.writing.title, onChange: _this.handleTitleChange.bind(_this), 'data-jsx-ext': _Writer2.default.__scopedHash
              });
            }
          )
        ) : null,
        _this.renderToolbar(),
        _this.renderEditor(),
        _react2.default.createElement(_style2.default, {
          styleId: _Writer2.default.__scopedHash,
          css: _Writer2.default.__scoped
        })
      );
    };

    _this.renderToolbar = function () {
      return _react2.default.createElement(
        'div',
        {
          style: {
            color: _this.props.light ? 'black' : 'white'
          },
          'data-jsx-ext': _Writer2.default.__scopedHash
        },
        _react2.default.createElement(
          'div',
          { className: 'menu toolbar-menu',
            style: {
              backgroundColor: _this.props.primaryColor,
              color: _this.props.light ? 'black' : 'white'
            }, 'data-jsx-ext': _Writer2.default.__scopedHash
          },
          _react2.default.createElement(
            'div',
            { className: 'toolbar-button', 'data-jsx-ext': _Writer2.default.__scopedHash
            },
            _react2.default.createElement(
              _Button2.default,
              { bgColor: 'white', shadow: true, round: true },
              _react2.default.createElement(_Icon2.default, { name: 'left', color: 'black' })
            )
          ),
          _this.renderMarkButton('bold', 'bold'),
          _this.renderMarkButton('italic', 'italic'),
          _this.renderMarkButton('underlined', 'underline'),
          _this.renderBlockButton('align-left', 'align-left'),
          _this.renderBlockButton('align-center', 'align-center'),
          _this.renderBlockButton('align-right', 'align-right'),
          _this.renderBlockButton('image', 'picture-o'),
          _react2.default.createElement(
            'div',
            { className: 'toolbar-button save', 'data-jsx-ext': _Writer2.default.__scopedHash
            },
            _react2.default.createElement(
              _Button2.default,
              { bgColor: 'white', shadow: true },
              'SAVE'
            )
          )
        ),
        _react2.default.createElement(_style2.default, {
          styleId: _Writer2.default.__scopedHash,
          css: _Writer2.default.__scoped
        })
      );
    };

    _this.renderMarkButton = function (type, icon) {
      var isActive = _this.hasMark(type);
      var onMouseDown = function onMouseDown(e) {
        return _this.onClickMark(e, type);
      };

      return _react2.default.createElement(
        'span',
        { className: 'button', onMouseDown: onMouseDown, 'data-active': isActive, 'data-jsx-ext': _Writer2.default.__scopedHash
        },
        _react2.default.createElement(
          'span',
          {
            style: {
              backgroundColor: isActive ? 'rgba(0,0,0,0.04)' : null,
              color: isActive ? 'grey' : null,
              cursor: 'pointer'
            },
            'data-jsx-ext': _Writer2.default.__scopedHash
          },
          _react2.default.createElement(_Icon2.default, { name: icon })
        ),
        _react2.default.createElement(_style2.default, {
          styleId: _Writer2.default.__scopedHash,
          css: _Writer2.default.__scoped
        })
      );
    };

    _this.renderBlockButton = function (type, icon) {
      var isActive = _this.hasBlock(type);
      var onMouseDown = function onMouseDown(e) {
        return _this.onClickBlock(e, type);
      };

      return _react2.default.createElement(
        'span',
        { className: 'button', onMouseDown: onMouseDown, 'data-active': isActive, 'data-jsx-ext': _Writer2.default.__scopedHash
        },
        _react2.default.createElement(
          'span',
          {
            style: {
              backgroundColor: isActive ? 'rgba(0,0,0,0.04)' : null,
              color: isActive ? 'grey' : null,
              cursor: 'pointer'
            },
            'data-jsx-ext': _Writer2.default.__scopedHash
          },
          _react2.default.createElement(_Icon2.default, { name: icon })
        ),
        _react2.default.createElement(_style2.default, {
          styleId: _Writer2.default.__scopedHash,
          css: _Writer2.default.__scoped
        })
      );
    };

    _this.renderEditor = function () {
      return _react2.default.createElement(
        'div',
        { className: 'host', 'data-jsx-ext': _Writer2.default.__scopedHash
        },
        _react2.default.createElement(
          'div',
          { className: 'editor', style: {
              background: '' + (_this.props.light ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'),
              boxShadow: '22px 62px 170px 100px ' + (_this.props.light ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'),
              color: _this.props.light ? 'black' : 'white'
            }, onClick: _this.focusEditor.bind(_this), name: 'editor', 'data-jsx-ext': _Writer2.default.__scopedHash
          },
          _react2.default.createElement(
            _reactIntl.FormattedMessage,
            { id: 'editor_placeholder', defaultMessage: 'Start writing here...' },
            function (msg) {
              return _react2.default.createElement(_slate.Editor, {
                spellCheck: true,
                placeholder: msg,
                schema: schema,
                state: _this.state.state,
                onFocus: _this.onFocus.bind(_this),
                onBlur: _this.onBlur.bind(_this),
                onChange: _this.onChange,
                onDocumentChange: _this.onDocumentChange,
                style: {
                  height: '100%'
                }
              });
            }
          ),
          _this.state.imagePopoverDisplayed ? _this.renderImagePopover() : null,
          _react2.default.createElement(
            'div',
            { className: 'progressBar', 'data-jsx-ext': _Writer2.default.__scopedHash
            },
            _react2.default.createElement(_ProgressBar2.default, {
              nbWords: _this.props.writing.nbWords,
              minNbWords: _this.props.writing.constraints.minNbWords,
              maxNbWords: _this.props.writing.constraints.maxNbWords,
              progress: _this.props.writing.progress,
              primaryColor: _this.props.primaryColor,
              secondaryColor: _this.props.secondaryColor,
              light: _this.props.light
            })
          )
        ),
        _react2.default.createElement(_style2.default, {
          styleId: _Writer2.default.__scopedHash,
          css: _Writer2.default.__scoped
        })
      );
    };

    _this.state = {
      state: _slate.Raw.deserialize(_this.props.writing.state, { terse: true }),
      wordCount: 0,
      mobile: false,
      focus: false,
      imagePopoverDisplayed: false
    };
    _this.throttledSave = (0, _throttle2.default)(_this.save, 3000);
    return _this;
  }

  _createClass(Writer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (/Android|iPad/i.test(navigator.userAgent)) {
        this.setState({ mobile: true });
      }

      document.addEventListener('touchmove', '.editor', function (e) {
        if (e.currentTarget.scrollTop === 0) {
          e.currentTarget.scrollTop = 1;
        } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
          e.currentTarget.scrollTop = -1;
        }
      });

      document.getElementsByClassName('editor')[0].addEventListener('touchmove', function (e) {
        e.stopPropagation();
      });
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

    /**
     * On change, save the new state.
     *
     * @param {State} state
     */

  }, {
    key: 'focusEditor',
    value: function focusEditor() {
      var state = this.state.state.transform().focus().apply();

      this.setState({ state: state });
    }
  }, {
    key: 'save',
    value: function save() {
      if (this.props.writing.lastSave > 3) {
        this.props.dispatch((0, _writingActions.saveWritingLocalstorage)());
      }
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

  }, {
    key: 'displayImagePopover',
    value: function displayImagePopover() {
      this.setState({ imagePopoverDisplayed: true });
    }
  }, {
    key: 'dismissImagePopover',
    value: function dismissImagePopover() {
      this.setState({ imagePopoverDisplayed: false });
    }
  }, {
    key: 'imageUploadSucceeded',
    value: function imageUploadSucceeded(url) {
      if (!url) return;
      var state = this.state.state;

      state = this.insertImage(state, url);
      this.onChange(state);
    }
  }, {
    key: 'handleTitleChange',
    value: function handleTitleChange(e) {
      this.props.dispatch({
        type: 'SET_TITLE',
        payload: e.target.value
      });
    }
  }, {
    key: 'renderImagePopover',
    value: function renderImagePopover() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'popover-background', onClick: function onClick(e) {
            e.preventDefault();
            _this2.dismissImagePopover();
          }, 'data-jsx-ext': _Writer2.default.__scopedHash
        },
        _react2.default.createElement(
          'div',
          { className: 'image-popover', 'data-jsx-ext': _Writer2.default.__scopedHash
          },
          _react2.default.createElement(_Uploader2.default, { api: 'http://localhost:3000/images/upload', uploadedImage: this.imageUploadSucceeded.bind(this) })
        ),
        _react2.default.createElement(_style2.default, {
          styleId: _Writer2.default.__scopedHash,
          css: _Writer2.default.__scoped
        })
      );
    }

    /**
     * Render.
     *
     * @return {Element}
     */

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

  }, {
    key: 'resizeEditorAnimation',
    value: function resizeEditorAnimation(_ref) {
      var target = _ref.target;

      var editor = target.find({ name: 'editor' });
      return new _gsap.TimelineMax().to(editor, 1, { height: '40px', maxHeight: '100px' });
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      this.setState({ focus: true });
      if (this.state.mobile) {
        var a = document.getElementsByClassName('editor')[0];
        a.style.maxHeight = '150px';
        a.style.minHeight = '150px';
        a.style.height = '150px';
        //this.addAnimation(this.resizeEditorAnimation)
      }
    }
  }, {
    key: 'virtualKeyboardHeight',
    value: function virtualKeyboardHeight() {
      return 700;
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      this.setState({ focus: false });

      if (this.state.mobile) {
        var a = document.getElementsByClassName('editor')[0];
        a.style.maxHeight = '100%';
      }
    }
  }, {
    key: 'recordScreenHeight',
    value: function recordScreenHeight() {
      var a = document.getElementsByClassName('editor')[0];

      if (this.state.mobile) {
        a.style.maxHeight = parseInt(window.innerHeight) - 370 + 'px';
      }

      /* setTimeout(() => {
       a.scrollTop = a.scrollHeight
       }, 100) */
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown() {
      this.recordScreenHeight();
    }
  }, {
    key: 'focus',
    value: function focus() {}

    /**
     * Render the Slate editor.
     *
     * @return {Element}
     */

  }]);

  return Writer;
}(_react2.default.Component)) || _class) || _class);
Writer.propTypes = {
  nbWords: _propTypes2.default.number,
  minNbWords: _propTypes2.default.number,
  primaryColor: _propTypes2.default.object,
  secondaryColor: _propTypes2.default.object,
  light: _propTypes2.default.bool
};
Writer.defaultProps = {
  progress: 0,
  light: false
};
exports.default = Writer;
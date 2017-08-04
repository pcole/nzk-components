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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _jspdf = require('jspdf');

var _jspdf2 = _interopRequireDefault(_jspdf);

var _ProgressBar = require('../ProgressBar/ProgressBar');

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _ConfirmModal = require('../ConfirmModal/ConfirmModal');

var _ConfirmModal2 = _interopRequireDefault(_ConfirmModal);

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
      return _react2.default.createElement('img', _extends({ src: src, className: 'importedImage', alt: '', align: 'middle', style: {
          maxWidth: '75%',
          maxHeight: '400px',
          textAlign: 'center',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '20px',
          marginBottom: '20px'
        }
      }, props.attributes));
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

var BLOCK_TAGS = {
  p: 'paragraph',
  em: 'italic',
  u: 'underline',
  s: 'strikethrough'
};

var MARK_TAGS = {
  strong: 'bold',
  em: 'italic',
  u: 'underline'
};

var RULES = [{
  deserialize: function deserialize(el, next) {
    var block = BLOCK_TAGS[el.tagName];
    if (!block) return;
    return {
      kind: 'block',
      type: block,
      nodes: next(el.childNodes)
    };
  }
}, {
  serialize: function serialize(object, children) {
    if (object.kind !== 'block') return;
    switch (object.type) {
      case 'paragraph':
        return _react2.default.createElement(
          'p',
          null,
          children
        );
      case 'align-left':
        return _react2.default.createElement(
          'p',
          { style: { textAlign: 'left' } },
          children
        );
      case 'align-center':
        return _react2.default.createElement(
          'p',
          { style: { textAlign: 'center' } },
          children
        );
      case 'align-right':
        return _react2.default.createElement(
          'p',
          { style: { textAlign: 'right' } },
          children
        );
      case 'image':
        return _react2.default.createElement('img', { src: object.data.get('src'), className: 'importedImage', alt: '', align: 'middle', style: {
            maxWidth: '75%',
            maxHeight: '400px',
            textAlign: 'center',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '20px',
            marginBottom: '20px'
          }
        });
    }
  }
}, {
  deserialize: function deserialize(el, next) {
    var mark = MARK_TAGS[el.tagName];
    if (!mark) return;
    return {
      kind: 'mark',
      type: mark,
      nodes: next(el.childNodes)
    };
  }
}, {
  serialize: function serialize(object, children) {
    if (object.kind !== 'mark') return;
    switch (object.type) {
      case 'bold':
        return _react2.default.createElement(
          'strong',
          null,
          children
        );
      case 'italic':
        return _react2.default.createElement(
          'em',
          null,
          children
        );
      case 'underlined':
        return _react2.default.createElement(
          'u',
          null,
          children
        );
    }
  }
}];

var serializer = new _slate.Html({ rules: RULES });

var Writer = (_dec = (0, _reactRedux.connect)(function (store) {
  return {
    writing: store.writing,
    planning: store.planning,
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

    _this.clear = function () {
      _this.props.clearPlanning();
      _this.props.clearWriting();
      _this.setState({ state: _slate.Plain.deserialize('') });
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
          return null;
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

      var titlebarClassNames = (0, _classnames2.default)({
        titleBar: true,
        dark: _this.props.light,
        light: !_this.props.light
      });

      return _react2.default.createElement(
        'div',
        { className: 'host', style: {
            boxShadow: (_this.props.light ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)') + ' 0px 60px 59px 140px'
          }, 'data-jsx-ext': _Writer2.default.__scopedHash
        },
        _this.renderToolbar(),
        _react2.default.createElement(
          'div',
          { className: 'writer', ref: 'writer', 'data-jsx-ext': _Writer2.default.__scopedHash
          },
          _this.props.needsTitle ? _react2.default.createElement(
            'div',
            {
              'data-jsx-ext': _Writer2.default.__scopedHash
            },
            _react2.default.createElement('input', { className: titlebarClassNames, type: 'text', placeholder: 'Enter your title here', style: {
                color: _this.props.light ? 'black' : 'white',
                background: '' + (_this.props.light ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'),
                borderBottom: '5px solid ' + _this.props.primaryColor
              }, value: _this.props.writing.title, onChange: _this.handleTitleChange.bind(_this), 'data-jsx-ext': _Writer2.default.__scopedHash
            })
          ) : null,
          _this.renderEditor(),
          _this.state.modal
        ),
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
              { bgColor: 'white', shadow: true, round: true, onClick: _this.props.backCallback ? function () {
                  _this.displayModal("Are you sure? Have you saved your work?", function () {
                    _this.clear();_this.props.backCallback();
                  }, _this.dismissModal.bind(_this), 'Yes', 'No');
                } : function () {} },
              _react2.default.createElement(_Icon2.default, { name: 'left', color: 'black' })
            )
          ),
          _this.props.hideTextStyleButtons ? null : _this.renderMarkButton('bold', 'bold'),
          _this.props.hideTextStyleButtons ? null : _this.renderMarkButton('italic', 'italic'),
          _this.props.hideTextStyleButtons ? null : _this.renderMarkButton('underlined', 'underline'),
          _this.props.hideAlignButtons ? null : _this.renderBlockButton('align-left', 'align-left'),
          _this.props.hideAlignButtons ? null : _this.renderBlockButton('align-center', 'align-center'),
          _this.props.hideAlignButtons ? null : _this.renderBlockButton('align-right', 'align-right'),
          _this.props.hideImageButton ? null : _this.renderBlockButton('image', 'picture-o'),
          _react2.default.createElement(
            'div',
            { className: 'toolbar-button save', 'data-jsx-ext': _Writer2.default.__scopedHash
            },
            _react2.default.createElement(
              _Button2.default,
              { bgColor: 'white', shadow: true, onClick: _this.saveAction.bind(_this) },
              'SAVE'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'toolbar-button save', 'data-jsx-ext': _Writer2.default.__scopedHash
            },
            _react2.default.createElement(
              _Button2.default,
              { bgColor: 'white', shadow: true, onClick: function onClick() {
                  _this.displayModal("Are you sure? This will clear everything on the page.", _this.clear.bind(_this), _this.dismissModal.bind(_this));
                } },
              'Clear'
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
      var isDisabled = _this.state.toolbarDisabled;
      var onMouseDown = function onMouseDown(e) {
        return _this.onClickMark(e, type);
      };

      var style = {
        cursor: 'pointer'
      };

      var activeStyle = _extends({}, style, {
        color: _this.props.light ? 'white' : 'black'
      });

      var disabledStyle = {
        opacity: 0.3
      };

      return _react2.default.createElement(
        'span',
        { className: 'button', onMouseDown: isDisabled ? function () {} : onMouseDown, 'data-active': isActive, 'data-jsx-ext': _Writer2.default.__scopedHash
        },
        _react2.default.createElement(
          'span',
          {
            style: isDisabled ? disabledStyle : isActive ? activeStyle : style,
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
      var isDisabled = _this.state.toolbarDisabled;

      var style = {
        cursor: 'pointer'
      };

      var activeStyle = _extends({}, style, {
        color: _this.props.light ? 'white' : 'black'
      });

      var disabledStyle = {
        opacity: 0.3
      };

      return _react2.default.createElement(
        'span',
        { className: 'button', onMouseDown: isDisabled ? function () {} : onMouseDown, 'data-active': isActive, 'data-jsx-ext': _Writer2.default.__scopedHash
        },
        _react2.default.createElement(
          'span',
          {
            style: isDisabled ? disabledStyle : isActive ? activeStyle : style,
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
        { className: 'host', ref: 'host', style: {
            boxShadow: '0px 149px 207px 72px ' + (_this.props.light ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)')
          }, 'data-jsx-ext': _Writer2.default.__scopedHash
        },
        _react2.default.createElement(
          'div',
          { className: 'editor', ref: 'editor', style: {
              background: '' + (_this.props.light ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'),
              color: _this.props.light ? 'black' : 'white'
            }, onClick: _this.focusEditor.bind(_this), name: 'editor', 'data-jsx-ext': _Writer2.default.__scopedHash
          },
          _react2.default.createElement(_slate.Editor, {
            spellCheck: true,
            placeholder: 'Start writing here...',
            schema: schema,
            ref: 'slate',
            state: _this.state.state,
            onFocus: _this.onFocus.bind(_this),
            onBlur: _this.onBlur.bind(_this),
            onChange: _this.onChange,
            onDocumentChange: _this.onDocumentChange,
            style: {
              height: '100%'
            }
          })
        ),
        _this.state.imagePopoverDisplayed ? _this.renderImagePopover() : null,
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
      imagePopoverDisplayed: false,
      toolbarDisabled: true,
      modal: null
    };
    _this.throttledSave = (0, _throttle2.default)(_this.save, 3000);
    return _this;
  }

  _createClass(Writer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (/Android|iPad/i.test(navigator.userAgent)) {
        this.setState({ mobile: true });
        this.refs.writer.style.height = 'calc(100vh - 155px)';
      }

      this.refs.writer.addEventListener('touchmove', function (e) {
        e.stopPropagation();
      });

      this.refs.writer.addEventListener('click', function (e) {}.bind(this));

      this.refs.writer.addEventListener('touchstart', function (e) {
        var _this2 = this;

        if (!this.state.focus) {
          setTimeout(function () {
            if (e.target.offsetTop > 120) {
              _this2.refs.writer.scrollTop = e.target.offsetTop;
            }
          }.bind(this), 200);
        }

        e.stopPropagation();
      }.bind(this));
    }
  }, {
    key: 'setCaretPosition',
    value: function setCaretPosition(ctrl, pos) {

      if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange(pos, pos);
      } else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
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
  }, {
    key: 'displayModal',
    value: function displayModal(message, onConfirm, onCancel, confirmMessage, cancelMessage) {
      this.setState({
        modal: _react2.default.createElement(_ConfirmModal2.default, { message: message,
          onConfirm: onConfirm,
          onCancel: onCancel,
          confirmText: confirmMessage,
          cancelText: cancelMessage })
      });
    }
  }, {
    key: 'dismissModal',
    value: function dismissModal() {
      this.setState({
        modal: null
      });
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
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: 'popover-background', onClick: function onClick(e) {
            e.preventDefault();
            _this3.dismissImagePopover();
          }, 'data-jsx-ext': _Writer2.default.__scopedHash
        },
        _react2.default.createElement(
          'div',
          { className: 'image-popover', 'data-jsx-ext': _Writer2.default.__scopedHash
          },
          _react2.default.createElement(_Uploader2.default, { api: 'http://file.nightzookeeper.com/images/upload',
            uploadedImage: this.imageUploadSucceeded.bind(this) })
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

  }, {
    key: 'saveAction',
    value: function saveAction() {
      this.exportAsPdf();
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
      this.setState({ focus: true, toolbarDisabled: false });
      if (this.state.mobile) {
        this.props.onMobileFocus

        // Disables iPad view pushing
        ();window.scrollTo(0, 0);
        document.body.scrollTop = 0;

        if (window.innerHeight < window.innerWidth) {
          this.refs.writer.style.minHeight = '220px';
          this.refs.writer.style.height = '220px';
        } else {
          this.refs.writer.style.minHeight = '560px';
          this.refs.writer.style.height = '560px';
        }
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
      this.setState({ focus: false, toolbarDisabled: true });

      if (this.state.mobile) {
        this.refs.writer.style.minHeight = '300px';
        this.refs.writer.style.height = 'calc(100vh - 155px)';
        //  var a = this.refs.writer
        //  a.style.height = 'calc(100vh - 95px)'
      }
    }
  }, {
    key: 'recordScreenHeight',
    value: function recordScreenHeight() {

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
  }, {
    key: 'print',
    value: function print() {
      var html = serializer.serialize(this.state.state);

      var printWindow = window.open('', '', 'height=400,width=800');
      printWindow.document.write('<html><head><title>Writing Tool Export</title>');
      printWindow.document.write('</head><body style="margin: 20px; max-width: calc(100vw - 40px);">');
      var content = '<div style="width: 100%; word-wrap: break-word;"><h1>' + this.props.writing.title + '</h1><div>' + html + '</div></div>';
      printWindow.document.write('<div id="print">' + content + '</div>');
      printWindow.document.write('<footer>Created by NightZooKeeper</footer>');
      printWindow.document.write('</body></html>'
      //printWindow.print()
      //printWindow.close()
      );
    }
  }, {
    key: 'exportAsPdf',
    value: function exportAsPdf() {
      var plain = _slate.Plain.serialize(this.state.state);
      plain = '<p>' + plain.replace(/\n\n/g, '</p><p>');
      plain += '</p>';
      var content = '\n    <div style="height: 100%; background: red;">\n        <h1> Writing Sparks </h1>\n        \n        \n        <h2>Your ' + this.props.planning.title + '</h2>\n        <div><b>Date:</b> ' + new Date() + '</div>\n        \n        <br/>\n        <div>__________________________________________________________________________________</div>\n        <br/>\n        <h2>' + this.props.writing.title + '</h2>\n        <div>' + plain.replace(/\n/g, '<br />') + '</div>\n        <br/>\n        <div>__________________________________________________________________________________</div>\n        <br/>\n        <div style="position: absolute; bottom: 0;">Writing Sparks was created by the team at Night Zookeeper. Visit nightzookeeper.com for more writing challenges and interactive lessons.</div>\n    </div>\n    ';

      var pdf = new _jspdf2.default();

      pdf.fromHTML(content, 15, 15, {
        'width': 175
      }, function () {
        pdf.save('WritingToolExport.pdf');
      });
    }

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
  light: _propTypes2.default.bool,
  onMobileFocus: _propTypes2.default.func,
  backCallback: _propTypes2.default.func,
  hideImageButton: _propTypes2.default.bool,
  hideTextStyleButtons: _propTypes2.default.bool,
  hideAlignButtons: _propTypes2.default.bool
};
Writer.defaultProps = {
  progress: 0,
  light: false
};
exports.default = Writer;
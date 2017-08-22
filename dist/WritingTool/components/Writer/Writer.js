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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactGsapEnhancer = require('react-gsap-enhancer');

var _reactGsapEnhancer2 = _interopRequireDefault(_reactGsapEnhancer);

var _reactRedux = require('react-redux');

var _gsap = require('gsap');

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _jspdf = require('jspdf');

var _jspdf2 = _interopRequireDefault(_jspdf);

var _Icon = require('../../../Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Button = require('../../../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Writer = require('./Writer.styles');

var _Writer2 = _interopRequireDefault(_Writer);

var _actions = require('../../store/actions');

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
      return _react2.default.createElement('img', _extends({
        src: src,
        className: 'importedImage',
        alt: '',
        style: {
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
        {
          style: {
            textAlign: 'left'
          }
        },
        props.children
      );
    },
    'align-center': function alignCenter(props) {
      return _react2.default.createElement(
        'p',
        {
          style: {
            textAlign: 'center'
          }
        },
        props.children
      );
    },
    'align-right': function alignRight(props) {
      return _react2.default.createElement(
        'p',
        {
          style: {
            textAlign: 'right'
          }
        },
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

var rules = [{
  deserialize: function deserialize(el, next) {
    if (!el.tagName) return;
    var block = BLOCK_TAGS[el.tagName.toLowerCase()];
    if (!block) return;

    var type = block;

    if (block === 'paragraph' && el.style && el.style['text-align']) {
      switch (el.style['text-align']) {
        case 'left':
          type = 'align-left';
          break;
        case 'center':
          type = 'align-center';
          break;
        case 'right':
          type = 'align-right';
          break;
      }
    }

    return {
      kind: 'block',
      type: type,
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
        return _react2.default.createElement('img', {
          src: object.data.get('src'),
          className: 'importedImage',
          alt: '',
          align: 'middle',
          style: {
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
var html = new _slate.Html({ rules: rules });

var Writer = (_dec = (0, _reactRedux.connect)(function (store) {
  return {
    placeholders: store.placeholders,
    writing: store.writing,
    constraints: store.constraints
  };
}, null, null, { withRef: true }), _dec2 = (0, _reactGsapEnhancer2.default)(), _dec(_class = _dec2(_class = function (_Component) {
  _inherits(Writer, _Component);

  function Writer(props) {
    _classCallCheck(this, Writer);

    var _this = _possibleConstructorReturn(this, (Writer.__proto__ || Object.getPrototypeOf(Writer)).call(this, props));

    _this.hasMark = function (type) {
      var writingState = _this.state.writingState;

      return writingState.marks.some(function (mark) {
        return mark.type === type;
      });
    };

    _this.hasBlock = function (type) {
      var writingState = _this.state.writingState;

      return writingState.blocks.some(function (node) {
        return node.type === type;
      });
    };

    _this.onStateChange = function (state) {
      _this.setState({
        writingState: state
      });
    };

    _this.onDebouncedDocumentChange = function (document, state) {
      _this.props.dispatch((0, _actions.setWriting)({
        text: html.serialize(state)
      }));
    };

    _this.onDocumentChange = function (document, state) {
      _this.onDebouncedDocumentChange(document, state);
      _this.props.dispatch((0, _actions.setWordCount)(_this.getWordCountForState(state)));
    };

    _this.getWordCountForState = function (state) {
      return state.document.text.split(' ').filter(function (w) {
        return w.length > 0;
      }).length;
    };

    _this.onClickMark = function (e, type) {
      e.preventDefault();
      var writingState = _this.state.writingState;

      writingState = writingState.transform().toggleMark(type).apply();
      _this.setState({ writingState: writingState });
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
      var writingState = _this.state.writingState;

      var transform = writingState.transform();

      if (type === 'image') {
        _this.props.displayImageUploader();
      } else {
        var isActive = _this.hasBlock(type);
        transform.setBlock(isActive ? DEFAULT_NODE : type);
      }

      writingState = transform.apply();
      _this.setState({ writingState: writingState });
    };

    _this.render = function () {
      var hostStyle = {
        boxShadow: (_this.props.light ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)') + ' 0px 60px 59px 140px'
      };

      var colorStyle = {
        color: _this.props.textColor
      };

      var bgColorStyle = {
        background: '' + (_this.props.light ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)')
      };

      return _react2.default.createElement(
        'div',
        { className: 'host', style: hostStyle, 'data-jsx-ext': _Writer2.default.__scopedHash
        },
        _this.renderToolbar(),
        _react2.default.createElement(
          'div',
          { className: 'writer', ref: _this.writerRef, 'data-jsx-ext': _Writer2.default.__scopedHash
          },
          _react2.default.createElement(
            'div',
            {
              className: 'title-container ' + (_this.props.light ? 'light' : 'dark'),
              style: _extends({}, bgColorStyle),
              'data-jsx-ext': _Writer2.default.__scopedHash
            },
            _react2.default.createElement('textarea', {
              className: 'title',
              tabIndex: 1,
              placeholder: _this.props.placeholders.title,
              ref: _this.titleRef,
              onKeyDown: _this.onTitleKeyDown,
              style: _extends({}, colorStyle, {
                borderBottom: '2px solid ' + _this.props.primaryColor
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
      );
    };

    _this.renderToolbar = function () {
      var bgStyle = {
        color: _this.props.textColor,
        backgroundColor: _this.props.secondaryColor
      };
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
          { className: 'menu toolbar-menu', style: bgStyle, 'data-jsx-ext': _Writer2.default.__scopedHash
          },
          _react2.default.createElement(
            'div',
            { className: 'toolbar-button', 'data-jsx-ext': _Writer2.default.__scopedHash
            },
            _react2.default.createElement(
              _Button2.default,
              {
                bgColor: 'white',
                shadow: true,
                round: true,
                onClick: _this.props.onBack ? function () {
                  _this.props.displayModal('Are you sure? Have you saved your work?', function () {
                    _this.props.onClear();
                    _this.props.onBack();
                  }, _this.props.dismissModal, 'Yes', 'No');
                } : function () {}
              },
              _react2.default.createElement(_Icon2.default, { name: 'left', color: 'black' })
            )
          ),
          !_this.props.hideTextStyleButtons && _this.renderMarkButton('bold', 'bold'),
          !_this.props.hideTextStyleButtons && _this.renderMarkButton('italic', 'italic'),
          !_this.props.hideTextStyleButtons && _this.renderMarkButton('underlined', 'underline'),
          !_this.props.hideAlignButtons && _this.renderBlockButton('align-left', 'align-left'),
          !_this.props.hideAlignButtons && _this.renderBlockButton('align-center', 'align-center'),
          !_this.props.hideAlignButtons && _this.renderBlockButton('align-right', 'align-right'),
          !_this.props.hideImageButton && _this.renderBlockButton('image', 'picture-o'),
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
          !_this.props.hideClearButton && _react2.default.createElement(
            'div',
            { className: 'toolbar-button save', 'data-jsx-ext': _Writer2.default.__scopedHash
            },
            _react2.default.createElement(
              _Button2.default,
              {
                bgColor: 'white',
                shadow: true,
                onClick: function onClick() {
                  _this.props.displayModal('Are you sure? This will clear everything on the page.', _this.props.onclear, _this.props.dismissModal);
                }
              },
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
        color: _this.props.light ? 'rgba(255,255,255,.8)' : 'rgba(0,0,0,.8)'
      });

      var disabledStyle = {
        opacity: 0.3
      };

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
        {
          className: 'button',
          onMouseDown: isDisabled ? function () {} : onMouseDown,
          'data-active': isActive,
          'data-jsx-ext': _Writer2.default.__scopedHash
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
        {
          className: 'editor-wrapper',
          style: {
            boxShadow: '0px 149px 207px 72px ' + (_this.props.light ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)')
          },
          'data-jsx-ext': _Writer2.default.__scopedHash
        },
        _react2.default.createElement(
          'div',
          {
            className: 'editor',
            style: {
              background: '' + (_this.props.light ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'),
              color: _this.props.light ? 'black' : 'white'
            },
            ref: _this.editorRef,
            onClick: _this.focusEditor.bind(_this),
            name: 'editor',
            'data-jsx-ext': _Writer2.default.__scopedHash
          },
          _react2.default.createElement(_slate.Editor, {
            key: 'editor',
            spellCheck: true,
            placeholder: _this.props.placeholders.text,
            placeholderStyle: {
              color: _this.props.light ? 'rgba(0,0,0, .7)' : 'rgba(255,255,255, .7)'
            },
            schema: schema,
            tabIndex: 2,
            ref: _this.slateEditorRef,
            state: _this.state.writingState,
            onFocus: _this.onSlateEditorFocus.bind(_this),
            onBlur: _this.onBlur.bind(_this),
            onChange: _this.onStateChange,
            onDocumentChange: _this.onDocumentChange,
            style: {
              height: '100%'
            }
          })
        ),
        _react2.default.createElement(_style2.default, {
          styleId: _Writer2.default.__scopedHash,
          css: _Writer2.default.__scoped
        })
      );
    };

    _this.state = {
      writingTitle: _this.props.writing.title,
      writingState: html.deserialize(_this.props.writing.text || '<p></p>', {
        terse: true
      }),
      mobile: false,
      focusSlateEditor: false,
      toolbarDisabled: true,
      modal: null
    };

    _this.onStateChange = _this.onStateChange.bind(_this);
    _this.onDocumentChange = _this.onDocumentChange.bind(_this);
    _this.onTitleChange = _this.onTitleChange.bind(_this);
    _this.resizeTitle = _this.resizeTitle.bind(_this);
    _this.titleRef = _this.titleRef.bind(_this);
    _this.editorRef = _this.editorRef.bind(_this);
    _this.writerRef = _this.writerRef.bind(_this);
    _this.slateEditorRef = _this.slateEditorRef.bind(_this);
    _this.onTitleKeyDown = _this.onTitleKeyDown.bind(_this);
    _this.imageUploadSucceeded = _this.imageUploadSucceeded.bind(_this);
    _this.insertImage = _this.insertImage.bind(_this);

    _this.onDebouncedDocumentChange = (0, _debounce2.default)(_this.onDebouncedDocumentChange, 1000);
    return _this;
  }

  _createClass(Writer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (/Android|iPad/i.test(navigator.userAgent)) {
        this.setState({ mobile: true });
        this.writer.style.height = 'calc(100vh - 155px)';
      }

      this.editor.addEventListener('touchmove', function (e) {
        e.stopPropagation();
      });

      this.writer.addEventListener('click', function (e) {});
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

  }, {
    key: 'onTitleChange',
    value: function onTitleChange(event) {
      this.setState({
        writingTitle: event.target.value
      });
      this.props.dispatch((0, _actions.setWriting)({
        title: event.target.value
      }));
      this.addAnimation(this.resizeTitle);
    }
  }, {
    key: 'focusEditor',
    value: function focusEditor() {
      var writingState = this.state.writingState.transform().focus().apply();
      this.setState({ writingState: writingState });
    }
  }, {
    key: 'save',
    value: function save() {}

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
    key: 'imageUploadSucceeded',
    value: function imageUploadSucceeded(url) {
      if (!url) return;
      var writingState = this.state.writingState;

      writingState = this.insertImage(writingState, url);
      this.onStateChange(writingState);
    }
  }, {
    key: 'saveAction',
    value: function saveAction() {
      this.props.onSave();
    }
  }, {
    key: 'titleRef',
    value: function titleRef(el) {
      this.title = el;
    }
  }, {
    key: 'writerRef',
    value: function writerRef(el) {
      this.writer = el;
    }
  }, {
    key: 'editorRef',
    value: function editorRef(el) {
      this.editor = el;
    }
  }, {
    key: 'slateEditorRef',
    value: function slateEditorRef(el) {
      this.slateEditor = el;
    }
  }, {
    key: 'resizeTitle',
    value: function resizeTitle() {
      return new _gsap.TimelineMax().to(this.title, 0, { height: '1px' }).to(this.title, 0, { height: 10 + this.title.scrollHeight + 'px' });
    }
  }, {
    key: 'onTitleKeyDown',
    value: function onTitleKeyDown(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
      if (event.key === 'Tab') {
        event.preventDefault();
        this.focusEditor();
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

  }, {
    key: 'resizeEditorAnimation',
    value: function resizeEditorAnimation(_ref) {
      var target = _ref.target;

      var editor = target.find({ name: 'editor' });
      return new _gsap.TimelineMax().to(editor, 1, {
        height: '40px',
        maxHeight: '100px'
      });
    }
  }, {
    key: 'onSlateEditorFocus',
    value: function onSlateEditorFocus() {
      this.setState({ toolbarDisabled: false });

      if (this.state.mobile) {
        this.props.onMobileFocus();

        // Disables iPad view pushing
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;

        if (window.innerHeight < window.innerWidth) {
          this.writer.style.minHeight = '218px';
          this.writer.style.height = '218px';
        } else {
          this.writer.style.minHeight = '565px';
          this.writer.style.height = '565px';
        }
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      this.setState({ toolbarDisabled: true });

      if (this.state.mobile) {
        this.writer.style.minHeight = '300px';
        this.writer.style.height = 'calc(100vh - 155px)';
      }
    }
  }, {
    key: 'exportAsPdf',
    value: function exportAsPdf() {
      var plain = _slate.Plain.serialize(this.state.writingState);
      plain = '<p>' + plain.replace(/\n\n/g, '</p><p>');
      plain += '</p>';
      var content = '\n    <div style="height: 100%; background: red;">\n        <h1> Writing Sparks </h1>\n        \n        \n        <h2>Your ' + this.props.planning.title + '</h2>\n        <div><b>Date:</b> ' + new Date() + '</div>\n        \n        <br/>\n        <div>__________________________________________________________________________________</div>\n        <br/>\n        <h2>' + this.props.writing.title + '</h2>\n        <div>' + plain.replace(/\n/g, '<br />') + '</div>\n        <br/>\n        <div>__________________________________________________________________________________</div>\n        <br/>\n        <div style="position: absolute; bottom: 0;">Writing Sparks was created by the team at Night Zookeeper. Visit nightzookeeper.com for more writing challenges and interactive lessons.</div>\n    </div>\n    ';

      var pdf = new _jspdf2.default();

      pdf.fromHTML(content, 15, 15, {
        width: 175
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
}(_react.Component)) || _class) || _class);
Writer.propTypes = {
  placeholders: _propTypes2.default.object,
  writing: _propTypes2.default.object,
  constraints: _propTypes2.default.object,
  primaryColor: _propTypes2.default.any,
  secondaryColor: _propTypes2.default.any,
  textColor: _propTypes2.default.any,
  light: _propTypes2.default.bool,
  onMobileFocus: _propTypes2.default.func,
  displayImageUploader: _propTypes2.default.func,
  dismissImageUploader: _propTypes2.default.func,
  onBack: _propTypes2.default.func,
  onClear: _propTypes2.default.func,
  onSave: _propTypes2.default.func,
  hideImageButton: _propTypes2.default.bool,
  hideTextStyleButtons: _propTypes2.default.bool,
  hideAlignButtons: _propTypes2.default.bool,
  hideClearButton: _propTypes2.default.bool
};
Writer.defaultProps = {
  hideImageButton: false,
  hideTextStyleButtons: false,
  hideAlignButtons: false,
  hideClearButton: true,
  onBack: function onBack() {},
  onClear: function onClear() {},
  onSave: function onSave() {}
};
exports.default = Writer;
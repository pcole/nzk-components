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

var _jspdf = require('jspdf');

var _jspdf2 = _interopRequireDefault(_jspdf);

var _Uploader = require('../../../Uploader/Uploader');

var _Uploader2 = _interopRequireDefault(_Uploader);

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

  // const BLOCK_TAGS = {
  //   p: 'paragraph',
  //   em: 'italic',
  //   u: 'underline',
  //   s: 'strikethrough'
  // }

  // const MARK_TAGS = {
  //   strong: 'bold',
  //   em: 'italic',
  //   u: 'underline'
  // }

  // const RULES = [
  //   {
  //     deserialize (el, next) {
  //       const block = BLOCK_TAGS[el.tagName]
  //       if (!block) return
  //       return {
  //         kind: 'block',
  //         type: block,
  //         nodes: next(el.childNodes)
  //       }
  //     }
  //   },
  //   {
  //     serialize (object, children) {
  //       if (object.kind !== 'block') return
  //       switch (object.type) {
  //         case 'paragraph':
  //           return (
  //             <p>
  //               {children}
  //             </p>
  //           )
  //         case 'align-left':
  //           return (
  //             <p style={{ textAlign: 'left' }}>
  //               {children}
  //             </p>
  //           )
  //         case 'align-center':
  //           return (
  //             <p style={{ textAlign: 'center' }}>
  //               {children}
  //             </p>
  //           )
  //         case 'align-right':
  //           return (
  //             <p style={{ textAlign: 'right' }}>
  //               {children}
  //             </p>
  //           )
  //         case 'image':
  //           return (
  //             <img
  //               src={object.data.get('src')}
  //               className='importedImage'
  //               alt=''
  //               align='middle'
  //               style={{
  //                 maxWidth: '75%',
  //                 maxHeight: '400px',
  //                 textAlign: 'center',
  //                 display: 'block',
  //                 marginLeft: 'auto',
  //                 marginRight: 'auto',
  //                 marginTop: '20px',
  //                 marginBottom: '20px'
  //               }}
  //             />
  //           )
  //       }
  //     }
  //   },
  //   {
  //     deserialize (el, next) {
  //       const mark = MARK_TAGS[el.tagName]
  //       if (!mark) return
  //       return {
  //         kind: 'mark',
  //         type: mark,
  //         nodes: next(el.childNodes)
  //       }
  //     }
  //   },
  //   {
  //     serialize (object, children) {
  //       if (object.kind !== 'mark') return
  //       switch (object.type) {
  //         case 'bold':
  //           return (
  //             <strong>
  //               {children}
  //             </strong>
  //           )
  //         case 'italic':
  //           return (
  //             <em>
  //               {children}
  //             </em>
  //           )
  //         case 'underlined':
  //           return (
  //             <u>
  //               {children}
  //             </u>
  //           )
  //       }
  //     }
  //   }
  // ]

  // const serializer = new Html({ rules: RULES })

};var Writer = (_dec = (0, _reactRedux.connect)(function (store) {
  return {
    placeholders: store.placeholders,
    writing: store.writing,
    constraints: store.constraints
  };
}), _dec2 = (0, _reactGsapEnhancer2.default)(), _dec(_class = _dec2(_class = function (_Component) {
  _inherits(Writer, _Component);

  function Writer(props) {
    _classCallCheck(this, Writer);

    var _this = _possibleConstructorReturn(this, (Writer.__proto__ || Object.getPrototypeOf(Writer)).call(this, props));

    _initialiseProps.call(_this);

    var writingState = {
      nodes: [{
        kind: 'block',
        type: 'paragraph',
        nodes: []
      }]
    };

    _this.state = {
      writingTitle: _this.props.writing.title,
      writingState: _slate.Raw.deserialize(writingState, { terse: true }),
      mobile: false,
      focusSlateEditor: false,
      imagePopoverDisplayed: false,
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
    key: 'renderImagePopover',
    value: function renderImagePopover() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        {
          className: 'popover-background',
          onClick: function onClick(e) {
            e.preventDefault();
            _this2.dismissImagePopover();
          },
          'data-jsx-ext': _Writer2.default.__scopedHash
        },
        _react2.default.createElement(
          'div',
          { className: 'image-popover', 'data-jsx-ext': _Writer2.default.__scopedHash
          },
          _react2.default.createElement(_Uploader2.default, {
            api: 'http://file.nightzookeeper.com/images/upload',
            uploadedImage: this.imageUploadSucceeded.bind(this)
          })
        ),
        _react2.default.createElement(_style2.default, {
          styleId: _Writer2.default.__scopedHash,
          css: _Writer2.default.__scoped
        })
      );
    }
  }, {
    key: 'saveAction',
    value: function saveAction() {
      this.exportAsPdf();
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
          this.writer.style.minHeight = '255px';
          this.writer.style.height = '255px';
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
  primaryColor: _propTypes2.default.string,
  secondaryColor: _propTypes2.default.string,
  textColor: _propTypes2.default.string,
  light: _propTypes2.default.bool,
  onMobileFocus: _propTypes2.default.func,
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

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.hasMark = function (type) {
    var writingState = _this3.state.writingState;

    return writingState.marks.some(function (mark) {
      return mark.type === type;
    });
  };

  this.hasBlock = function (type) {
    var writingState = _this3.state.writingState;

    return writingState.blocks.some(function (node) {
      return node.type === type;
    });
  };

  this.onStateChange = function (state) {
    _this3.setState({
      writingState: state
    });
  };

  this.onDocumentChange = function (document, state) {
    _this3.props.dispatch((0, _actions.setWordCount)(_this3.getWordCountForState(state)));
  };

  this.getWordCountForState = function (state) {
    return state.document.text.split(' ').filter(function (w) {
      return w.length > 0;
    }).length;
  };

  this.onClickMark = function (e, type) {
    e.preventDefault();
    var writingState = _this3.state.writingState;

    writingState = writingState.transform().toggleMark(type).apply();
    _this3.setState({ writingState: writingState });
  };

  this.insertImage = function (state, src) {
    return state.transform().insertBlock({
      type: 'image',
      isVoid: true,
      data: { src: src }
    }).apply();
  };

  this.onClickBlock = function (e, type) {
    e.preventDefault();
    var writingState = _this3.state.writingState;

    var transform = writingState.transform();

    if (type === 'image') {
      _this3.displayImagePopover();
    } else {
      var isActive = _this3.hasBlock(type);
      transform.setBlock(isActive ? DEFAULT_NODE : type);
    }

    writingState = transform.apply();
    _this3.setState({ writingState: writingState });
  };

  this.render = function () {
    var hostStyle = {
      boxShadow: (_this3.props.light ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)') + ' 0px 60px 59px 140px'
    };

    var colorStyle = {
      color: _this3.props.textColor
    };

    var bgColorStyle = {
      background: '' + (_this3.props.light ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)')
    };

    return _react2.default.createElement(
      'div',
      { className: 'host', style: hostStyle, 'data-jsx-ext': _Writer2.default.__scopedHash
      },
      _this3.renderToolbar(),
      _react2.default.createElement(
        'div',
        { className: 'writer', ref: _this3.writerRef, 'data-jsx-ext': _Writer2.default.__scopedHash
        },
        _react2.default.createElement(
          'div',
          {
            className: 'title-container ' + (_this3.props.light ? 'light' : 'dark'),
            style: _extends({}, bgColorStyle),
            'data-jsx-ext': _Writer2.default.__scopedHash
          },
          _react2.default.createElement('textarea', {
            className: 'title',
            tabIndex: '1',
            placeholder: _this3.props.placeholders.title,
            ref: _this3.titleRef,
            onKeyDown: _this3.onTitleKeyDown,
            style: _extends({}, colorStyle, {
              borderBottom: '2px solid ' + _this3.props.primaryColor
            }),
            onChange: _this3.onTitleChange,
            value: _this3.state.writingTitle,
            'data-jsx-ext': _Writer2.default.__scopedHash
          })
        ),
        _this3.renderEditor()
      ),
      _react2.default.createElement(_style2.default, {
        styleId: _Writer2.default.__scopedHash,
        css: _Writer2.default.__scoped
      })
    );
  };

  this.renderToolbar = function () {
    var bgStyle = {
      color: _this3.props.textColor,
      backgroundColor: _this3.props.secondaryColor
    };
    return _react2.default.createElement(
      'div',
      {
        style: {
          color: _this3.props.textColor
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
              onClick: _this3.props.onBack ? function () {
                _this3.props.displayModal('Are you sure? Have you saved your work?', function () {
                  _this3.props.onClear();
                  _this3.props.onBack();
                }, _this3.props.dismissModal, 'Yes', 'No');
              } : function () {}
            },
            _react2.default.createElement(_Icon2.default, { name: 'left', color: 'black' })
          )
        ),
        !_this3.props.hideTextStyleButtons && _this3.renderMarkButton('bold', 'bold'),
        !_this3.props.hideTextStyleButtons && _this3.renderMarkButton('italic', 'italic'),
        !_this3.props.hideTextStyleButtons && _this3.renderMarkButton('underlined', 'underline'),
        !_this3.props.hideAlignButtons && _this3.renderBlockButton('align-left', 'align-left'),
        !_this3.props.hideAlignButtons && _this3.renderBlockButton('align-center', 'align-center'),
        !_this3.props.hideAlignButtons && _this3.renderBlockButton('align-right', 'align-right'),
        !_this3.props.hideImageButton && _this3.renderBlockButton('image', 'picture-o'),
        _react2.default.createElement(
          'div',
          { className: 'toolbar-button save', 'data-jsx-ext': _Writer2.default.__scopedHash
          },
          _react2.default.createElement(
            _Button2.default,
            { bgColor: 'white', shadow: true, onClick: _this3.saveAction.bind(_this3) },
            'SAVE'
          )
        ),
        !_this3.props.hideClearButton && _react2.default.createElement(
          'div',
          { className: 'toolbar-button save', 'data-jsx-ext': _Writer2.default.__scopedHash
          },
          _react2.default.createElement(
            _Button2.default,
            {
              bgColor: 'white',
              shadow: true,
              onClick: function onClick() {
                _this3.props.displayModal('Are you sure? This will clear everything on the page.', _this3.props.onclear, _this3.props.dismissModal);
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

  this.renderMarkButton = function (type, icon) {
    var isActive = _this3.hasMark(type);
    var isDisabled = _this3.state.toolbarDisabled;
    var onMouseDown = function onMouseDown(e) {
      return _this3.onClickMark(e, type);
    };

    var style = {
      cursor: 'pointer'
    };

    var activeStyle = _extends({}, style, {
      color: _this3.props.light ? 'rgba(255,255,255,.8)' : 'rgba(0,0,0,.8)'
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

  this.renderBlockButton = function (type, icon) {
    var isActive = _this3.hasBlock(type);
    var onMouseDown = function onMouseDown(e) {
      return _this3.onClickBlock(e, type);
    };
    var isDisabled = _this3.state.toolbarDisabled;

    var style = {
      cursor: 'pointer'
    };

    var activeStyle = _extends({}, style, {
      color: _this3.props.light ? 'white' : 'black'
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

  this.renderEditor = function () {
    return _react2.default.createElement(
      'div',
      {
        className: 'editor-wrapper',
        style: {
          boxShadow: '0px 149px 207px 72px ' + (_this3.props.light ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)')
        },
        'data-jsx-ext': _Writer2.default.__scopedHash
      },
      _react2.default.createElement(
        'div',
        {
          className: 'editor',
          style: {
            background: '' + (_this3.props.light ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'),
            color: _this3.props.light ? 'black' : 'white'
          },
          ref: _this3.editorRef,
          onClick: _this3.focusEditor.bind(_this3),
          name: 'editor',
          'data-jsx-ext': _Writer2.default.__scopedHash
        },
        _react2.default.createElement(_slate.Editor, {
          key: 'editor',
          spellCheck: true,
          placeholder: _this3.props.placeholders.text,
          placeholderStyle: {
            color: _this3.props.light ? 'rgba(0,0,0, .7)' : 'rgba(255,255,255, .7)'
          },
          schema: schema,
          tabIndex: '2',
          ref: _this3.slateEditorRef,
          state: _this3.state.writingState,
          onFocus: _this3.onSlateEditorFocus.bind(_this3),
          onBlur: _this3.onBlur.bind(_this3),
          onChange: _this3.onStateChange,
          onDocumentChange: _this3.onDocumentChange,
          style: {
            height: '100%'
          }
        })
      ),
      _this3.state.imagePopoverDisplayed ? _this3.renderImagePopover() : null,
      _react2.default.createElement(_style2.default, {
        styleId: _Writer2.default.__scopedHash,
        css: _Writer2.default.__scoped
      })
    );
  };
};

exports.default = Writer;
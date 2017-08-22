'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _style = require('styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactGsapEnhancer = require('react-gsap-enhancer');

var _reactGsapEnhancer2 = _interopRequireDefault(_reactGsapEnhancer);

var _gsap = require('gsap');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _getColorFromImage = require('../../util/getColorFromImage');

var _getColorFromImage2 = _interopRequireDefault(_getColorFromImage);

var _Writer = require('./components/Writer/Writer');

var _Writer2 = _interopRequireDefault(_Writer);

var _Sidebar = require('./components/Sidebar/Sidebar');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _StatusBar = require('./components/StatusBar/StatusBar');

var _StatusBar2 = _interopRequireDefault(_StatusBar);

var _ConfirmModal = require('../Modal/ConfirmModal');

var _ConfirmModal2 = _interopRequireDefault(_ConfirmModal);

var _WritingTool = require('./WritingTool.styles');

var _WritingTool2 = _interopRequireDefault(_WritingTool);

var _store = require('./store/store');

var _store2 = _interopRequireDefault(_store);

var _actions = require('./store/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var store = (0, _store2.default)();

var WritingTool = (_dec = (0, _reactGsapEnhancer2.default)(), _dec(_class = function (_Component) {
  _inherits(WritingTool, _Component);

  function WritingTool(props) {
    _classCallCheck(this, WritingTool);

    var _this = _possibleConstructorReturn(this, (WritingTool.__proto__ || Object.getPrototypeOf(WritingTool)).call(this, props));

    _this.state = {
      sidebarOpen: true,
      primaryColor: undefined,
      secondaryColor: undefined,
      textColor: undefined,
      backConfirmModalIsOpen: false,
      clearConfirmModalIsOpen: false
    };


    _this.onSave = _this.onSave.bind(_this);
    _this.onBack = _this.onBack.bind(_this);
    _this.onBackConfirm = _this.onBackConfirm.bind(_this);
    _this.onBackCancel = _this.onBackCancel.bind(_this);
    _this.onClear = _this.onClear.bind(_this);
    _this.onClearConfirm = _this.onClearConfirm.bind(_this);
    _this.onClearCancel = _this.onClearCancel.bind(_this);
    _this.toggleSidebarAnimation = _this.toggleSidebarAnimation.bind(_this);
    _this.toggleSidebar = _this.toggleSidebar.bind(_this);
    _this.closeSidebar = _this.closeSidebar.bind(_this);
    _this.onResize = _this.onResize.bind(_this);
    return _this;
  }

  _createClass(WritingTool, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      store.dispatch((0, _actions.init)(store.dispatch, {
        lang: this.props.lang,
        writingType: this.props.writingType,
        placeholders: this.props.placeholders,
        writing: this.props.writing,
        constraints: this.props.constraints,
        prompt: this.props.prompt,
        sections: this.props.sections,
        loadPresetSections: this.props.loadPresetSections
      }));

      window.addEventListener('resize', this.onResize);
    }
  }, {
    key: 'setColorsFromBackgroundImage',
    value: function setColorsFromBackgroundImage() {
      var _this2 = this;

      (0, _getColorFromImage2.default)(this.props.backgroundImage, function (err, color) {
        if (err) {
          return;
        }

        var primaryColor = new _color2.default(color);
        var light = primaryColor.light();
        var secondaryColor = light ? primaryColor.darken(0.3) : primaryColor.lighten(0.3);

        _this2.setState({
          primaryColor: primaryColor,
          primaryFadedColor: primaryColor.fade(0.3),
          secondaryColor: secondaryColor,
          textColor: light ? 'black' : 'white',
          light: light
        });
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setColorsFromBackgroundImage();

      document.addEventListener('touchmove', function (e) {
        e.preventDefault();
      });

      document.getElementsByClassName('host')[0].addEventListener('touchmove', function (e) {
        e.preventDefault();
      });

      document.getElementsByClassName('background')[0].addEventListener('touchmove', function (e) {
        e.preventDefault();
      });
    }
  }, {
    key: 'onResize',
    value: function onResize(e) {
      if (e.target.window.innerWidth > 1280) {
        this.setState({ sidebarOpen: true });
        this.addAnimation(this.toggleSidebarAnimation);
      }
    }
  }, {
    key: 'toggleSidebarAnimation',
    value: function toggleSidebarAnimation(_ref) {
      var target = _ref.target;

      var left = target.find({ name: 'leftCol' });
      var right = target.find({ name: 'rightCol' });

      if (!this.state.sidebarOpen) {
        return new _gsap.TimelineMax().to(left, 1, { ease: _gsap.Bounce.easeOut,
          width: 'calc(100vw - 20px)'
        }, 0).to(right, 1, { ease: _gsap.Bounce.easeOut,
          width: '20px'

        }, 0);
      } else {
        return new _gsap.TimelineMax().to(left, 1, { ease: _gsap.Bounce.easeOut, width: 'calc(100vw - 415px)' }, 0).to(right, 1, { ease: _gsap.Bounce.easeOut, width: '415px' }, 0);
      }
    }
  }, {
    key: 'toggleSidebar',
    value: function toggleSidebar() {
      this.addAnimation(this.toggleSidebarAnimation);
      this.setState({ sidebarOpen: !this.state.sidebarOpen });
    }
  }, {
    key: 'closeSidebar',
    value: function closeSidebar() {
      this.addAnimation(this.toggleSidebarAnimation);
      this.setState({ sidebarOpen: false });
    }

    // SAVE

  }, {
    key: 'onSave',
    value: function onSave() {
      if (!this.onSavePreventDefault) {
        // TODO, modal warning about min words and saving as draft
      }
      this.props.onSave();
    }

    // BACK

  }, {
    key: 'onBack',
    value: function onBack() {
      if (!this.onBackPreventDefault) {
        this.openBackConfirmModal();
      } else {
        this.props.onBack();
      }
    }
  }, {
    key: 'openBackConfirmModal',
    value: function openBackConfirmModal() {
      this.setState({
        backConfirmModalIsOpen: true
      });
    }
  }, {
    key: 'closeBackConfirmModal',
    value: function closeBackConfirmModal() {
      this.setState({
        backConfirmModalIsOpen: false
      });
    }
  }, {
    key: 'renderBackConfirmModal',
    value: function renderBackConfirmModal() {
      return _react2.default.createElement(_ConfirmModal2.default, {
        isOpen: this.state.backConfirmModalIsOpen,
        message: this.props.backConfirmMessage,
        onConfirm: this.onBackConfirm,
        onCancel: this.onBackCancel,
        confirmText: this.props.backConfirmButtonText,
        cancelText: this.props.backCancelButtonText
      });
    }
  }, {
    key: 'onBackConfirm',
    value: function onBackConfirm() {
      this.closeBackConfirmModal();
      this.props.onBack();
    }
  }, {
    key: 'onBackCancel',
    value: function onBackCancel() {
      this.closeBackConfirmModal();
    }

    // CLEAR

  }, {
    key: 'onClear',
    value: function onClear() {
      if (!this.onClearPreventDefault) {
        this.openClearConfirmModal();
      }
      this.props.onClear();
    }
  }, {
    key: 'openClearConfirmModal',
    value: function openClearConfirmModal() {
      this.setState({
        clearConfirmModalIsOpen: true
      });
    }
  }, {
    key: 'closeClearConfirmModal',
    value: function closeClearConfirmModal() {
      this.setState({
        clearConfirmModalIsOpen: false
      });
    }
  }, {
    key: 'renderClearConfirmModal',
    value: function renderClearConfirmModal() {
      return _react2.default.createElement(_ConfirmModal2.default, {
        isOpen: this.state.clearConfirmModalIsOpen,
        message: this.props.clearConfirmMessage,
        onConfirm: this.onClearConfirm,
        onCancel: this.onClearCancel,
        confirmText: this.props.clearConfirmButtonText,
        cancelText: this.props.clearCancelButtonText
      });
    }
  }, {
    key: 'onClearConfirm',
    value: function onClearConfirm() {
      store.dispatch((0, _actions.clear)());
      this.closeClearConfirmModal();
      // TODO: fix hack, figure out why the tool doesn't
      // rerender after clear
    }
  }, {
    key: 'onClearCancel',
    value: function onClearCancel() {
      this.closeClearConfirmModal();
    }

    // Render

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
          'div',
          { className: 'host', 'data-jsx-ext': _WritingTool2.default.__scopedHash
          },
          this.renderBackConfirmModal(),
          this.renderClearConfirmModal(),
          _react2.default.createElement('div', {
            className: 'background',
            style: {
              backgroundImage: 'url("' + this.props.backgroundImage + '")'
            },
            'data-jsx-ext': _WritingTool2.default.__scopedHash
          }),
          _react2.default.createElement(
            'div',
            { className: 'column left sidebarOpen', name: 'leftCol', 'data-jsx-ext': _WritingTool2.default.__scopedHash
            },
            _react2.default.createElement(_Writer2.default, {
              primaryColor: this.state.primaryColor,
              secondaryColor: this.state.primaryFadedColor,
              textColor: this.state.textColor,
              backgroundImage: this.props.backgroundImage,
              light: this.state.light,
              onMobileFocus: this.closeSidebar,
              hideTextStyleButtons: this.props.hideTextStyleButtons,
              hideAlignButtons: this.props.hideAlignButtons,
              hideImageButton: this.props.hideImageButton,
              hideClearButton: this.props.hideClearButton,
              onBack: this.onBack,
              onSave: this.onSave,
              onClear: this.onClear
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'column right sidebarOpen', name: 'rightCol', 'data-jsx-ext': _WritingTool2.default.__scopedHash
            },
            _react2.default.createElement(
              'div',
              {
                className: 'sidebar-toggle-btn-container',
                style: {
                  backgroundColor: this.state.primaryColor
                },
                'data-jsx-ext': _WritingTool2.default.__scopedHash
              },
              _react2.default.createElement(
                _Button2.default,
                {
                  onClick: this.toggleSidebar,
                  bgColor: this.state.secondaryColor,
                  color: this.state.textColor,
                  round: true,
                  shadow: true
                },
                _react2.default.createElement(_Icon2.default, { name: 'menu', color: this.state.textColor })
              )
            ),
            _react2.default.createElement(_Sidebar2.default, {
              primaryColor: this.state.primaryColor,
              secondaryColor: this.state.secondaryColor,
              textColor: this.state.textColor
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'status-bar', 'data-jsx-ext': _WritingTool2.default.__scopedHash
            },
            _react2.default.createElement(_StatusBar2.default, {
              bgColor: this.state.primaryColor,
              light: this.state.light
            })
          ),
          _react2.default.createElement(_style2.default, {
            styleId: _WritingTool2.default.__scopedHash,
            css: _WritingTool2.default.__scoped
          })
        )
      );
    }
  }]);

  return WritingTool;
}(_react.Component)) || _class);
WritingTool.propTypes = {
  lang: _propTypes2.default.string,
  backgroundImage: _propTypes2.default.string,
  writingType: _propTypes2.default.string,
  placeholders: _propTypes2.default.shape({
    title: _propTypes2.default.string,
    text: _propTypes2.default.string
  }),
  writing: _propTypes2.default.shape({
    title: _propTypes2.default.string,
    text: _propTypes2.default.string
  }),
  constraints: _propTypes2.default.shape({
    minWords: _propTypes2.default.number,
    maxWords: _propTypes2.default.number
  }),
  prompt: _propTypes2.default.shape({
    icon: _propTypes2.default.string,
    title: _propTypes2.default.string,
    description: _propTypes2.default.string,
    image: _propTypes2.default.string
  }),
  loadPresetSections: _propTypes2.default.bool,
  sections: _propTypes2.default.shape({
    prepend: _propTypes2.default.bool,
    title: _propTypes2.default.string,
    component: _propTypes2.default.node,
    fieldType: _propTypes2.default.oneOf(['input', 'textarea']),
    numberOfFields: _propTypes2.default.number,
    userCanAddFields: _propTypes2.default.bool,
    fieldsAreRemovable: _propTypes2.default.bool
  }),
  onBack: _propTypes2.default.func,
  onSave: _propTypes2.default.func,
  onBackPreventDefault: _propTypes2.default.bool,
  onSavePreventDefault: _propTypes2.default.bool,
  hideImageButton: _propTypes2.default.bool,
  hideTextStyleButtons: _propTypes2.default.bool,
  hideAlignButtons: _propTypes2.default.bool,
  hideClearButton: _propTypes2.default.bool
};
WritingTool.defaultProps = {
  lang: 'en',
  hideClearButton: true,
  backgroundImage: '/assets/temple.jpg',
  onSave: function onSave() {},
  onBack: function onBack() {},
  onSavePreventDefault: false,
  onBackPreventDefault: false,
  backConfirmMessage: 'Are you sure? Have you saved your work?',
  backConfirmButtonText: 'Yes',
  backCancelButtonText: 'No',
  clearConfirmMessage: 'Are you sure? You will loose your work.',
  clearConfirmButtonText: 'Yes',
  clearCancelButtonText: 'No'
};
exports.default = WritingTool;
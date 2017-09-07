'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _lodash = require('lodash');

var _reactIntl = require('react-intl');

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

var _jp = require('../../translations/locales/jp.json');

var _jp2 = _interopRequireDefault(_jp);

var _simpEn = require('../../translations/locales/simp-en.json');

var _simpEn2 = _interopRequireDefault(_simpEn);

var _jv = require('react-intl/locale-data/jv');

var _jv2 = _interopRequireDefault(_jv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var messages = {
  'jv': _jp2.default,
  'simp-en': _simpEn2.default
};

(0, _reactIntl.addLocaleData)([].concat(_toConsumableArray(_jv2.default)));

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
      confirmModal: {
        isOpen: false
      },
      wordLimit: false
    };


    _this.onBackConfirm = _this.onBackConfirm.bind(_this);
    _this.closeConfirmModal = _this.closeConfirmModal.bind(_this);
    _this.onSave = _this.onSave.bind(_this);
    _this.onBack = _this.onBack.bind(_this);
    _this.onClear = _this.onClear.bind(_this);
    _this.toggleSidebarAnimation = _this.toggleSidebarAnimation.bind(_this);
    _this.toggleSidebar = _this.toggleSidebar.bind(_this);
    _this.closeSidebar = _this.closeSidebar.bind(_this);
    _this.onResize = _this.onResize.bind(_this);
    _this.throttledCacheState = (0, _lodash.throttle)(_this.cacheState, 1000, { leading: false });
    return _this;
  }

  _createClass(WritingTool, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      (0, _actions.init)(store.dispatch, {
        lang: this.props.lang,
        writingType: this.props.writingType,
        placeholders: this.props.placeholders,
        writing: this.props.writing,
        constraints: this.props.constraints,
        prompt: this.props.prompt,
        sections: this.props.sections,
        loadPresetSections: this.props.loadPresetSections,
        reset: this.props.reset
      });

      window.addEventListener('resize', this.onResize);
    }
  }, {
    key: 'setColorsFromBackgroundImage',
    value: function setColorsFromBackgroundImage() {
      var _this2 = this;

      (0, _getColorFromImage2.default)(this.props.backgroundImage, function (err, color) {
        if (err) {
          console.log(err);
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
      }, { passive: true });

      document.getElementsByClassName('host')[0].addEventListener('touchmove', function (e) {
        e.preventDefault();
      }, { passive: true });

      document.getElementsByClassName('background')[0].addEventListener('touchmove', function (e) {
        e.preventDefault();
      }, { passive: true });

      this.startAutoCache();
    }
  }, {
    key: 'cacheState',
    value: function cacheState() {
      var stateToCache = this.getStateToCache();
      if (!(0, _lodash.isEqual)(this._cachedState, stateToCache)) {
        this._cachedState = stateToCache;
        (0, _actions.cacheState)(store.dispatch, this._cachedState);
      }
    }
  }, {
    key: 'getStateToCache',
    value: function getStateToCache() {
      return (0, _lodash.cloneDeep)({
        writing: store.getState().writing,
        sections: store.getState().sections
      });
    }
  }, {
    key: 'startAutoCache',
    value: function startAutoCache() {
      this._cachedState = this.getStateToCache();
      this.unsubscribe = store.subscribe(this.throttledCacheState.bind(this));
    }
  }, {
    key: 'stopAutoCache',
    value: function stopAutoCache() {
      this.throttledCacheState.cancel();
      if (this.unsubscribe) {
        this.unsubscribe();
      }
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
        return new _gsap.TimelineMax().to(left, 1, {
          ease: _gsap.Bounce.easeOut,
          width: 'calc(100vw - 20px)'
        }, 0).to(right, 1, {
          ease: _gsap.Bounce.easeOut,
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
  }, {
    key: 'renderConfirmModal',
    value: function renderConfirmModal() {
      return _react2.default.createElement(_ConfirmModal2.default, _extends({
        isOpen: this.state.confirmModalIsOpen
      }, this.state.confirmModal));
    }
  }, {
    key: 'closeConfirmModal',
    value: function closeConfirmModal() {
      this.setState({
        confirmModalIsOpen: false
      });
    }
  }, {
    key: 'onSave',
    value: function onSave() {
      this.save();
    }
  }, {
    key: 'save',
    value: function save() {
      var _this3 = this;

      this.props.onSave(store.getState().writing, store.getState().sections, function (err) {
        if (!err) {
          _this3.stopAutoCache();
          (0, _actions.clearCachedState)(store.dispatch);
        }
      });
    }
  }, {
    key: 'onBack',
    value: function onBack() {
      if (this.props.askToSaveOnBack) {
        this.openSaveOnBackModal();
      } else {
        this.openBackConfirmModal();
      }
    }
  }, {
    key: 'openSaveOnBackModal',
    value: function openSaveOnBackModal() {
      var _this4 = this;

      this.setState({
        confirmModalIsOpen: true,
        confirmModal: {
          message: _react2.default.createElement(_reactIntl.FormattedMessage, {
            id: 'writingToolSaveOnBack',
            defaultMessage: 'Would you like to save your work?'
          }),
          onConfirm: function onConfirm() {
            _this4.closeConfirmModal();
            _this4.onSave();
          },
          onCancel: this.onBackConfirm
        }
      });
    }
  }, {
    key: 'openBackConfirmModal',
    value: function openBackConfirmModal() {
      this.setState({
        confirmModalIsOpen: true,
        confirmModal: {
          message: _react2.default.createElement(_reactIntl.FormattedMessage, {
            id: 'writingBackConfirm',
            defaultMessage: 'Are you sure? You will lose your work if you don\'t save it.'
          }),
          onConfirm: this.onBackConfirm,
          onCancel: this.closeConfirmModal
        }
      });
    }
  }, {
    key: 'onBackConfirm',
    value: function onBackConfirm() {
      this.closeConfirmModal();
      if (this.props.clearCacheOnBack) {
        this.stopAutoCache();
        (0, _actions.clearCachedState)(store.dispatch);
      }
      this.props.onBack();
    }
  }, {
    key: 'onClear',
    value: function onClear() {
      this.openClearConfirmModal();
    }
  }, {
    key: 'openClearConfirmModal',
    value: function openClearConfirmModal() {
      var _this5 = this;

      this.setState({
        confirmModalIsOpen: true,
        confirmModal: {
          message: _react2.default.createElement(_reactIntl.FormattedMessage, {
            id: 'writingToolClearConfirm',
            defaultMessage: 'Are you sure? Your work will be lost.'
          }),
          onConfirm: function onConfirm() {
            _this5.closeConfirmModal();
            store.dispatch((0, _actions.clear)());
            (0, _actions.clearCachedState)(store.dispatch);
          },
          onCancel: this.closeConfirmModal
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var lang = this.props.lang === 'jp' ? 'jv' : this.props.lang;
      lang = this.props.lang === 'simp-en' ? 'en' : this.props.lang;
      var localMessages = this.props.lang === 'simp-en' ? messages['simp-en'] : messages[lang];

      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
          _reactIntl.IntlProvider,
          { key: lang, locale: lang, messages: localMessages },
          _react2.default.createElement(
            'div',
            { className: 'host', 'data-jsx-ext': _WritingTool2.default.__scopedHash
            },
            this.renderConfirmModal(),
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
                lang: this.props.lang,
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
                hideSaveButton: this.props.hideSaveButton,
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
                lang: this.props.lang,
                bgColor: this.state.primaryColor,
                light: this.state.light
              })
            ),
            _react2.default.createElement(_style2.default, {
              styleId: _WritingTool2.default.__scopedHash,
              css: _WritingTool2.default.__scoped
            })
          )
        )
      );
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stopAutoCache();
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
  sections: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    prepend: _propTypes2.default.bool,
    title: _propTypes2.default.string,
    component: _propTypes2.default.node,
    fieldType: _propTypes2.default.oneOf(['input', 'textarea']),
    numberOfFields: _propTypes2.default.number,
    userCanAddFields: _propTypes2.default.bool,
    fieldsAreRemovable: _propTypes2.default.bool
  })),
  onBack: _propTypes2.default.func,
  onSave: _propTypes2.default.func,
  askToSaveOnBack: _propTypes2.default.bool,
  clearCacheOnBack: _propTypes2.default.bool,
  hideImageButton: _propTypes2.default.bool,
  hideTextStyleButtons: _propTypes2.default.bool,
  hideAlignButtons: _propTypes2.default.bool,
  hideClearButton: _propTypes2.default.bool,
  hideSaveButton: _propTypes2.default.bool
};
WritingTool.defaultProps = {
  lang: 'en',
  backgroundImage: '/assets/temple.jpg',
  onSave: function onSave() {},
  onBack: function onBack() {},
  hideClearButton: true,
  hideSaveButton: false,
  clearCacheOnBack: false,
  askToSaveOnBack: false
};
exports.default = WritingTool;
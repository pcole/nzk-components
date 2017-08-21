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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AutosizeInput = require('../../../AutosizeInput');

var _AutosizeInput2 = _interopRequireDefault(_AutosizeInput);

var _reactGsapEnhancer = require('react-gsap-enhancer');

var _reactGsapEnhancer2 = _interopRequireDefault(_reactGsapEnhancer);

var _gsap = require('gsap');

var _Button = require('../../../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Icon = require('../../../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Field = require('./Field.styles');

var _Field2 = _interopRequireDefault(_Field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fontStyle = {
  fontFamily: "'Libre Baskerville', Baskerville, 'Baskerville Old Face', 'Hoefler Text', Garamond, 'Times New Roman', serif",
  fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1, "pnum" 1, "tnum" 0, "onum" 1, "lnum" 0, "dlig" 0',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale'
};

var Field = (_dec = (0, _reactGsapEnhancer2.default)(), _dec(_class = function (_Component) {
  _inherits(Field, _Component);

  function Field(props) {
    _classCallCheck(this, Field);

    var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this, props));

    _this.textareaRef = _this.textareaRef.bind(_this);
    _this.resizeTextarea = _this.resizeTextarea.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.onRemove = _this.onRemove.bind(_this);
    _this.animateRemove = _this.animateRemove.bind(_this);

    _this.state = {
      value: _this.props.value
    };
    return _this;
  }

  _createClass(Field, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.type === 'textarea') {
        this.addAnimation(this.resizeTextarea);
      }
    }
  }, {
    key: 'animateRemove',
    value: function animateRemove(utils) {
      var _this2 = this;

      return new _gsap.TimelineMax({
        onComplete: function onComplete() {
          _this2.props.onRemove(_this2.props.index);
        }
      }).to(utils.target, 1, { rotation: 360, opacity: 0 }).to(utils.target, 0, { opacity: 1 });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.state.state !== nextState.value || this.props.value !== nextProps.value || this.props.bgColor !== nextProps.bgColor;
    }
  }, {
    key: 'resizeTextarea',
    value: function resizeTextarea() {
      return new _gsap.TimelineMax().to(this.textarea, 0, { height: '1px' }).to(this.textarea, 0, { height: 10 + this.textarea.scrollHeight + 'px' });
    }
  }, {
    key: 'onChange',
    value: function onChange(event) {
      this.setState({
        value: event.target.value
      });

      if (this.props.type === 'textarea') {
        this.addAnimation(this.resizeTextarea);
      }

      this.props.onChange(this.props.index, this.state.value);
    }
  }, {
    key: 'onRemove',
    value: function onRemove() {
      this.addAnimation(this.animateRemove);
    }
  }, {
    key: 'textareaAdjust',
    value: function textareaAdjust(o) {
      this.addAnimation(this.resizeTextarea);
    }
  }, {
    key: 'textareaRef',
    value: function textareaRef(el) {
      this.textarea = el;
    }
  }, {
    key: 'render',
    value: function render() {
      var hostStyle = {
        width: this.props.type === 'textarea' ? '100%' : 'auto'
      };
      var colorStyle = {
        color: this.props.textColor,
        backgroundColor: this.props.bgColor
      };

      var inputStyle = _extends({}, colorStyle, fontStyle, {
        padding: '5px 10px 5px 10px',
        textAlign: 'center',
        border: 'none',
        borderRadius: '5px',
        fontSize: '18px',
        outline: 'none',
        lineHeight: '1.5',
        minWidth: '162px',
        maxWidth: this.props.parentClientWidth - 30 + 'px',
        flex: '1'
      });

      var textareaStyle = _extends({}, colorStyle, fontStyle);

      return _react2.default.createElement(
        'li',
        { className: 'host', style: hostStyle, 'data-jsx-ext': _Field2.default.__scopedHash
        },
        this.props.type === 'input' && _react2.default.createElement(_AutosizeInput2.default, {
          inputStyle: inputStyle,
          value: this.state.value,
          onChange: this.onChange
        }),
        this.props.type === 'textarea' && _react2.default.createElement('textarea', {
          style: textareaStyle,
          value: this.state.value,
          onChange: this.onChange,
          ref: this.textareaRef,
          'data-jsx-ext': _Field2.default.__scopedHash
        }),
        this.props.removable && _react2.default.createElement(
          'div',
          { className: 'remove-button', 'data-jsx-ext': _Field2.default.__scopedHash
          },
          _react2.default.createElement(
            _Button2.default,
            {
              round: true,
              height: '20px',
              width: '20px',
              color: this.props.bgColor,
              bgColor: this.props.textColor,
              onClick: this.onRemove
            },
            _react2.default.createElement(_Icon2.default, { name: 'cross', fontSize: '13px' })
          )
        ),
        _react2.default.createElement(_style2.default, {
          styleId: _Field2.default.__scopedHash,
          css: _Field2.default.__scoped
        })
      );
    }
  }]);

  return Field;
}(_react.Component)) || _class);
Field.propTypes = {
  index: _propTypes2.default.number,
  type: _propTypes2.default.string,
  value: _propTypes2.default.string,
  bgColor: _propTypes2.default.any,
  textColor: _propTypes2.default.any,
  removable: _propTypes2.default.bool,
  onRemove: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  maxWidth: _propTypes2.default.number
};
Field.defaultProps = {
  type: 'input',
  bgColor: '#6CD4FF',
  textColor: 'white',
  value: '',
  parentClientWidth: 385,
  onChange: function onChange() {},
  onRemove: function onRemove() {}
};
exports.default = Field;
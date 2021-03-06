'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sizerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  visibility: 'hidden',
  height: 0,
  overflow: 'scroll',
  whiteSpace: 'pre'
};

var AutosizeInput = function (_Component) {
  _inherits(AutosizeInput, _Component);

  function AutosizeInput(props) {
    _classCallCheck(this, AutosizeInput);

    var _this = _possibleConstructorReturn(this, (AutosizeInput.__proto__ || Object.getPrototypeOf(AutosizeInput)).call(this, props));

    _this.state = {
      inputWidth: _this.props.minWidth
    };

    _this.inputRef = _this.inputRef.bind(_this);
    _this.sizerRef = _this.sizerRef.bind(_this);
    _this.placeHolderSizerRef = _this.placeHolderSizerRef.bind(_this);
    return _this;
  }

  _createClass(AutosizeInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.mounted = true;
      this.copyInputStyles();
      this.updateInputWidth();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      this.updateInputWidth();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;
    }
  }, {
    key: 'inputRef',
    value: function inputRef(el) {
      this.input = el;
    }
  }, {
    key: 'placeHolderSizerRef',
    value: function placeHolderSizerRef(el) {
      this.placeHolderSizer = el;
    }
  }, {
    key: 'sizerRef',
    value: function sizerRef(el) {
      this.sizer = el;
    }
  }, {
    key: 'copyInputStyles',
    value: function copyInputStyles() {
      if (!window.getComputedStyle) {
        return;
      }

      var inputStyle = this.input && window.getComputedStyle(this.input);

      if (!inputStyle) {
        return;
      }

      var sizerNode = this.sizer;

      sizerNode.style.fontSize = inputStyle.fontSize;
      sizerNode.style.fontFamily = inputStyle.fontFamily;
      sizerNode.style.fontWeight = inputStyle.fontWeight;
      sizerNode.style.fontStyle = inputStyle.fontStyle;
      sizerNode.style.letterSpacing = inputStyle.letterSpacing;
      sizerNode.style.textTransform = inputStyle.textTransform;

      if (this.props.placeholder) {
        var placeholderNode = this.placeHolderSizer;
        placeholderNode.style.fontSize = inputStyle.fontSize;
        placeholderNode.style.fontFamily = inputStyle.fontFamily;
        placeholderNode.style.fontWeight = inputStyle.fontWeight;
        placeholderNode.style.fontStyle = inputStyle.fontStyle;
        placeholderNode.style.letterSpacing = inputStyle.letterSpacing;
        placeholderNode.style.textTransform = inputStyle.textTransform;
      }
    }
  }, {
    key: 'updateInputWidth',
    value: function updateInputWidth() {
      if (!this.mounted || !this.sizer || typeof this.sizer.scrollWidth === 'undefined') {
        return;
      }

      var newInputWidth = void 0;

      if (this.props.placeholder && (!this.props.value || this.props.value && this.props.placeholderIsMinWidth)) {
        newInputWidth = Math.max(this.sizer.scrollWidth, this.placeHolderSizer.scrollWidth) + 2;
      } else {
        newInputWidth = this.sizer.scrollWidth + 2;
      }
      if (newInputWidth < this.props.minWidth) {
        newInputWidth = this.props.minWidth;
      }
      if (newInputWidth !== this.state.inputWidth) {
        this.setState({
          inputWidth: newInputWidth
        });
      }
    }
  }, {
    key: 'getInput',
    value: function getInput() {
      return this.input;
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.input.focus();
    }
  }, {
    key: 'blur',
    value: function blur() {
      this.input.blur();
    }
  }, {
    key: 'select',
    value: function select() {
      this.input.select();
    }
  }, {
    key: 'render',
    value: function render() {
      var sizerValue = [this.props.defaultValue, this.props.value, ''].reduce(function (previousValue, currentValue) {
        if (previousValue !== null && previousValue !== undefined) {
          return previousValue;
        }
        return currentValue;
      });

      var wrapperStyle = this.props.style || {};

      if (!wrapperStyle.display) wrapperStyle.display = 'inline-block';

      var inputStyle = _extends({}, this.props.inputStyle);

      inputStyle.width = this.state.inputWidth + 'px';
      inputStyle.boxSizing = 'content-box';

      var inputProps = _extends({}, this.props);

      inputProps.className = this.props.inputClassName;
      inputProps.style = inputStyle;

      // ensure props meant for `AutosizeInput` don't end up on the `input`
      delete inputProps.inputClassName;
      delete inputProps.inputStyle;
      delete inputProps.minWidth;
      delete inputProps.onAutosize;
      delete inputProps.placeholderIsMinWidth;

      return _react2.default.createElement(
        'div',
        { className: this.props.className, style: wrapperStyle },
        _react2.default.createElement('input', _extends({}, inputProps, { ref: this.inputRef })),
        _react2.default.createElement(
          'div',
          { ref: this.sizerRef, style: sizerStyle },
          sizerValue
        ),
        this.props.placeholder && _react2.default.createElement(
          'div',
          { ref: this.placeHolderSizerRef, style: sizerStyle },
          this.props.placeholder
        )
      );
    }
  }]);

  return AutosizeInput;
}(_react.Component);

AutosizeInput.propTypes = {
  className: _propTypes2.default.string, // className for the outer element
  defaultValue: _propTypes2.default.any, // default field value
  inputClassName: _propTypes2.default.string, // className for the input element
  inputStyle: _propTypes2.default.object, // css styles for the input element
  minWidth: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  onChange: _propTypes2.default.func, // onChange handler: function(newValue) {}
  placeholder: _propTypes2.default.string, // placeholder text
  placeholderIsMinWidth: _propTypes2.default.bool, // don't collapse size to less than the placeholder
  style: _propTypes2.default.object, // css styles for the outer element
  value: _propTypes2.default.any
};
AutosizeInput.defaultProps = {
  minWidth: 1
};
exports.default = AutosizeInput;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ProgressBar = require('./ProgressBar.styles');

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgressBar = function (_Component) {
  _inherits(ProgressBar, _Component);

  function ProgressBar() {
    _classCallCheck(this, ProgressBar);

    return _possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).apply(this, arguments));
  }

  _createClass(ProgressBar, [{
    key: 'render',
    value: function render() {
      var minBarClassNames = (0, _classnames2.default)({
        flag: this.props.barType === 'flag',
        bar: this.props.barType === 'bar',
        min: true
      });

      var maxBarClassNames = (0, _classnames2.default)({
        flag: this.props.barType === 'flag',
        bar: this.props.barType === 'bar',
        max: true
      });

      return _react2.default.createElement(
        'div',
        { className: 'host', style: {
            color: this.props.light ? 'black' : 'white'
          }, 'data-jsx-ext': _ProgressBar2.default.__scopedHash
        },
        _react2.default.createElement(
          'div',
          {
            className: 'full-bar',
            style: {
              backgroundColor: this.props.primaryColor
            },
            'data-jsx-ext': _ProgressBar2.default.__scopedHash
          },
          _react2.default.createElement('div', {
            className: 'progress',
            style: {
              backgroundColor: this.props.secondaryColor,
              width: this.props.progress + '%'
            },
            'data-jsx-ext': _ProgressBar2.default.__scopedHash
          }),
          _react2.default.createElement(
            'div',
            { className: 'counter', 'data-jsx-ext': _ProgressBar2.default.__scopedHash
            },
            this.props.nbWords
          ),
          _react2.default.createElement('div', { className: minBarClassNames, 'data-jsx-ext': _ProgressBar2.default.__scopedHash
          }),
          this.props.maxNbWords ? _react2.default.createElement('div', { className: maxBarClassNames, 'data-jsx-ext': _ProgressBar2.default.__scopedHash
          }) : null,
          _react2.default.createElement(
            'div',
            { className: 'limit', style: {}, 'data-jsx-ext': _ProgressBar2.default.__scopedHash
            },
            this.props.minNbWords
          )
        ),
        _react2.default.createElement(_style2.default, {
          styleId: _ProgressBar2.default.__scopedHash,
          css: _ProgressBar2.default.__scoped
        })
      );
    }
  }]);

  return ProgressBar;
}(_react.Component);

ProgressBar.propTypes = {
  nbWords: _propTypes2.default.number,
  minNbWords: _propTypes2.default.number,
  maxNbWords: _propTypes2.default.number,
  primaryColor: _propTypes2.default.object,
  secondaryColor: _propTypes2.default.object,
  light: _propTypes2.default.bool,
  barType: _propTypes2.default.oneOf(['bar', 'flag'])
};
ProgressBar.defaultProps = {
  nbWords: 0,
  minNbWords: 0,
  light: false,
  barType: 'bar'
};
exports.default = ProgressBar;
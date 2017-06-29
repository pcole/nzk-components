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

var _WordCount = require('./WordCount.styles');

var _WordCount2 = _interopRequireDefault(_WordCount);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WordCount = function (_Component) {
  _inherits(WordCount, _Component);

  function WordCount() {
    _classCallCheck(this, WordCount);

    return _possibleConstructorReturn(this, (WordCount.__proto__ || Object.getPrototypeOf(WordCount)).apply(this, arguments));
  }

  _createClass(WordCount, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          className: 'host',
          style: {
            width: '65px',
            textAlign: 'center',
            borderBottomWidth: '2px',
            borderBottomStyle: 'solid',
            borderBottomColor: this.props.nbWords < this.props.minNbWords ? 'red' : 'green'
          },
          'data-jsx-ext': _WordCount2.default.__scopedHash
        },
        this.props.nbWords,
        ' / ',
        this.props.minNbWords,
        _react2.default.createElement(_style2.default, {
          styleId: _WordCount2.default.__scopedHash,
          css: _WordCount2.default.__scoped
        })
      );
    }
  }]);

  return WordCount;
}(_react.Component);

WordCount.propTypes = {
  nbWords: _propTypes2.default.number,
  minNbWords: _propTypes2.default.number
};
WordCount.defaultProps = {
  nbWords: 0,
  minNbWords: 0
};
exports.default = WordCount;
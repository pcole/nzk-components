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

var _TypePickerPopover = require('./TypePickerPopover.styles');

var _TypePickerPopover2 = _interopRequireDefault(_TypePickerPopover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TypePickerPopover = function (_Component) {
  _inherits(TypePickerPopover, _Component);

  function TypePickerPopover(props) {
    _classCallCheck(this, TypePickerPopover);

    var _this = _possibleConstructorReturn(this, (TypePickerPopover.__proto__ || Object.getPrototypeOf(TypePickerPopover)).call(this, props));

    _this.state = {
      dismissed: false
    };
    return _this;
  }

  _createClass(TypePickerPopover, [{
    key: 'dismiss',
    value: function dismiss() {
      this.setState({
        dismissed: true
      });
    }
  }, {
    key: 'pick',
    value: function pick(type) {
      this.props.pick(type);
      this.dismiss();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var types = ['story', 'poetry', 'news', 'letter', 'opinion', 'instructions'];

      if (!this.state.dismissed || this.state.dismissed) {
        // Disabled TypePickerPopover
        return null;
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'host', onClick: this.dismiss.bind(this), 'data-jsx-ext': _TypePickerPopover2.default.__scopedHash
          },
          _react2.default.createElement(
            'div',
            { className: 'container', 'data-jsx-ext': _TypePickerPopover2.default.__scopedHash
            },
            _react2.default.createElement(
              'div',
              { className: 'title', 'data-jsx-ext': _TypePickerPopover2.default.__scopedHash
              },
              'Pick your writing type'
            ),
            _react2.default.createElement(
              'div',
              { className: 'picker', onClick: function onClick(e) {
                  e.stopPropagation();
                }, 'data-jsx-ext': _TypePickerPopover2.default.__scopedHash
              },
              types.map(function (type, i) {
                return _react2.default.createElement('div', { key: i, className: 'button ' + type, onClick: function onClick() {
                    _this2.pick(type);
                  }, 'data-jsx-ext': _TypePickerPopover2.default.__scopedHash
                });
              })
            )
          ),
          _react2.default.createElement(_style2.default, {
            styleId: _TypePickerPopover2.default.__scopedHash,
            css: _TypePickerPopover2.default.__scoped
          })
        );
      }
    }
  }]);

  return TypePickerPopover;
}(_react.Component);

TypePickerPopover.propTypes = {};
TypePickerPopover.defaultProps = {};
exports.default = TypePickerPopover;
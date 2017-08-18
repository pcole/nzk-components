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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ConfirmModal = require('./ConfirmModal.styles');

var _ConfirmModal2 = _interopRequireDefault(_ConfirmModal);

var _reactGsapEnhancer = require('react-gsap-enhancer');

var _reactGsapEnhancer2 = _interopRequireDefault(_reactGsapEnhancer);

var _Button = require('../../../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfirmModal = (_dec = (0, _reactGsapEnhancer2.default)(), _dec(_class = function (_Component) {
  _inherits(ConfirmModal, _Component);

  function ConfirmModal() {
    _classCallCheck(this, ConfirmModal);

    return _possibleConstructorReturn(this, (ConfirmModal.__proto__ || Object.getPrototypeOf(ConfirmModal)).apply(this, arguments));
  }

  _createClass(ConfirmModal, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'host', onClick: this.props.onCancel, 'data-jsx-ext': _ConfirmModal2.default.__scopedHash
        },
        _react2.default.createElement(
          'div',
          { className: 'modal', 'data-jsx-ext': _ConfirmModal2.default.__scopedHash
          },
          _react2.default.createElement(
            'div',
            { className: 'message', 'data-jsx-ext': _ConfirmModal2.default.__scopedHash
            },
            this.props.message
          ),
          _react2.default.createElement(
            'div',
            { className: 'buttons', 'data-jsx-ext': _ConfirmModal2.default.__scopedHash
            },
            _react2.default.createElement(
              _Button2.default,
              { bgColor: 'green', shadow: true, onClick: this.props.onConfirm },
              this.props.confirmText
            ),
            _react2.default.createElement(
              _Button2.default,
              { bgColor: 'red', shadow: true, onClick: this.props.onCancel },
              this.props.cancelText
            )
          )
        ),
        _react2.default.createElement(_style2.default, {
          styleId: _ConfirmModal2.default.__scopedHash,
          css: _ConfirmModal2.default.__scoped
        })
      );
    }
  }]);

  return ConfirmModal;
}(_react.Component)) || _class);
ConfirmModal.propTypes = {
  onConfirm: _propTypes2.default.func,
  onCancel: _propTypes2.default.func,
  onDismiss: _propTypes2.default.func,
  message: _propTypes2.default.string,
  confirmText: _propTypes2.default.string,
  cancelText: _propTypes2.default.string
};
ConfirmModal.defaultProps = {
  confirmText: 'OK',
  cancelText: 'Cancel'
};
exports.default = ConfirmModal;
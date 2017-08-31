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

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _ConfirmModal = require('./ConfirmModal.styles');

var _ConfirmModal2 = _interopRequireDefault(_ConfirmModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfirmModal = function (_Component) {
  _inherits(ConfirmModal, _Component);

  function ConfirmModal(props) {
    _classCallCheck(this, ConfirmModal);

    var _this = _possibleConstructorReturn(this, (ConfirmModal.__proto__ || Object.getPrototypeOf(ConfirmModal)).call(this, props));

    _this.state = {
      open: _this.props.isOpen,
      confirm: false
    };
    return _this;
  }

  _createClass(ConfirmModal, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.isOpen !== this.props.isOpen) {
        this.setState({
          open: newProps.isOpen
        });
      }
    }
  }, {
    key: 'onConfirm',
    value: function onConfirm() {
      this.setState({
        confirm: true,
        open: false
      });
    }
  }, {
    key: 'onCancel',
    value: function onCancel() {
      this.setState({
        confirm: false,
        open: false
      });
    }
  }, {
    key: 'onAfterClose',
    value: function onAfterClose() {
      this.props.onAfterClose && this.props.onAfterClose(this.state.confirm);
      this.state.confirm && this.props.onConfirm && this.props.onConfirm();
      !this.state.confirm && this.props.onCancel && this.props.onCancel();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _Modal2.default,
        {
          isOpen: this.state.open,
          delayCloseTimeoutMS: this.props.delayCloseTimeoutMS,
          overlayColor: 'transparent',
          onAfterClose: this.onAfterClose.bind(this),
          contentLabel: this.props.contentLabel
        },
        _react2.default.createElement(
          'div',
          { className: 'host' + (this.state.open ? ' fadeIn' : ''), 'data-jsx-ext': _ConfirmModal2.default.__scopedHash
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
                {
                  bgColor: 'green',
                  shadow: true,
                  round: !this.props.confirmText,
                  size: 'large',
                  onClick: this.onConfirm.bind(this)
                },
                this.props.confirmText || _react2.default.createElement(_Icon2.default, { name: 'check', color: 'white' })
              ),
              _react2.default.createElement(
                _Button2.default,
                {
                  bgColor: 'red',
                  shadow: true,
                  round: !this.props.cancelText,
                  size: 'large',
                  onClick: this.onCancel.bind(this)
                },
                this.props.cancelText || _react2.default.createElement(_Icon2.default, { name: 'cross', color: 'white' })
              )
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
}(_react.Component);

ConfirmModal.propTypes = {
  isOpen: _propTypes2.default.bool.isRequired,
  onConfirm: _propTypes2.default.func,
  onCancel: _propTypes2.default.func,
  message: _propTypes2.default.string,
  confirmText: _propTypes2.default.string,
  cancelText: _propTypes2.default.string,
  contentLabel: _propTypes2.default.string,
  delayCloseTimeoutMS: _propTypes2.default.number
};
ConfirmModal.defaultProps = {
  contentLabel: 'confirm',
  delayCloseTimeoutMS: 500
};
exports.default = ConfirmModal;
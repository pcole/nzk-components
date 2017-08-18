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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Section = require('../Section/Section');

var _Section2 = _interopRequireDefault(_Section);

var _Sidebar = require('./Sidebar.styles');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sidebar = (_dec = (0, _reactRedux.connect)(function (store) {
  return {
    prompt: store.prompt,
    sections: store.sections
  };
}), _dec(_class = function (_Component) {
  _inherits(Sidebar, _Component);

  function Sidebar() {
    _classCallCheck(this, Sidebar);

    return _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).apply(this, arguments));
  }

  _createClass(Sidebar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var scrolling = false;
      this.host.addEventListener('touchstart', function (e) {
        // Only execute the below code once at a time
        if (!scrolling) {
          scrolling = true;
          if (e.currentTarget.scrollTop === 0) {
            e.currentTarget.scrollTop = 1;
          } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
            e.currentTarget.scrollTop -= 1;
          }
          scrolling = false;
        }
        e.stopPropagation();
      });

      this.host.addEventListener('touchmove', function (e) {
        e.stopPropagation();
      });
    }
  }, {
    key: 'hostRef',
    value: function hostRef(el) {
      this.host = el;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var hostStyle = {
        backgroundColor: this.props.primaryColor
      };

      return _react2.default.createElement(
        'div',
        { className: 'host', ref: this.hostRef.bind(this), style: hostStyle, 'data-jsx-ext': _Sidebar2.default.__scopedHash
        },
        _react2.default.createElement(
          'div',
          { className: 'host-inner', 'data-jsx-ext': _Sidebar2.default.__scopedHash
          },
          this.renderPrompt(),
          this.props.sections.map(function (section, index) {
            return _react2.default.createElement(_Section2.default, {
              key: index,
              index: index,
              bgColor: _this2.props.secondaryColor,
              textColor: _this2.props.textColor
            });
          }),
          _react2.default.createElement('div', { className: 'bottom-gradient', 'data-jsx-ext': _Sidebar2.default.__scopedHash
          })
        ),
        _react2.default.createElement(_style2.default, {
          styleId: _Sidebar2.default.__scopedHash,
          css: _Sidebar2.default.__scoped
        })
      );
    }
  }, {
    key: 'renderPrompt',
    value: function renderPrompt() {
      var _props$prompt = this.props.prompt,
          icon = _props$prompt.icon,
          title = _props$prompt.title,
          image = _props$prompt.image,
          description = _props$prompt.description;

      var colorStyle = {
        color: this.props.textColor
      };

      return _react2.default.createElement(
        'div',
        { className: 'prompt', style: colorStyle, 'data-jsx-ext': _Sidebar2.default.__scopedHash
        },
        _react2.default.createElement(
          'div',
          { className: 'prompt-header', 'data-jsx-ext': _Sidebar2.default.__scopedHash
          },
          _react2.default.createElement('div', {
            className: 'prompt-icon',
            style: { backgroundImage: 'url("' + icon + '")' },
            'data-jsx-ext': _Sidebar2.default.__scopedHash
          }),
          _react2.default.createElement(
            'div',
            { className: 'prompt-title', 'data-jsx-ext': _Sidebar2.default.__scopedHash
            },
            title
          )
        ),
        (image || description) && _react2.default.createElement(
          'div',
          { className: 'prompt-content', 'data-jsx-ext': _Sidebar2.default.__scopedHash
          },
          this.props.prompt.image && _react2.default.createElement('div', {
            className: 'prompt-image',
            style: { backgroundImage: 'url("' + image + '")' },
            'data-jsx-ext': _Sidebar2.default.__scopedHash
          }),
          this.props.prompt.description && _react2.default.createElement(
            'div',
            { className: 'prompt-description', 'data-jsx-ext': _Sidebar2.default.__scopedHash
            },
            this.props.prompt.description
          )
        ),
        _react2.default.createElement(_style2.default, {
          styleId: _Sidebar2.default.__scopedHash,
          css: _Sidebar2.default.__scoped
        })
      );
    }
  }]);

  return Sidebar;
}(_react.Component)) || _class);
Sidebar.propTypes = {
  children: _propTypes2.default.any,
  primaryColor: _propTypes2.default.string,
  secondaryColor: _propTypes2.default.string,
  textColor: _propTypes2.default.string,
  prompt: _propTypes2.default.object,
  sections: _propTypes2.default.array
};
exports.default = Sidebar;
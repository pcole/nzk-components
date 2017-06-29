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

var _Icon = require('../Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _ShareDropdown = require('./ShareDropdown.styles');

var _ShareDropdown2 = _interopRequireDefault(_ShareDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShareDropdown = function (_Component) {
  _inherits(ShareDropdown, _Component);

  function ShareDropdown() {
    _classCallCheck(this, ShareDropdown);

    return _possibleConstructorReturn(this, (ShareDropdown.__proto__ || Object.getPrototypeOf(ShareDropdown)).apply(this, arguments));
  }

  _createClass(ShareDropdown, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          shareLink = _props.shareLink,
          position = _props.position,
          bgColor = _props.bgColor,
          color = _props.color;


      var hostStyle = {
        backgroundColor: bgColor,
        color: color
      };

      var style;
      switch (position) {
        case 'right':
          {
            style = { right: '-20px', borderBottom: '25px solid ' + bgColor };
            break;
          }
        case 'left':
          {
            style = { left: '-20px', borderBottom: '25px solid ' + bgColor };
            break;
          }
        case 'middle':
          {
            style = { right: '90px', borderBottom: '25px solid ' + bgColor };
            break;
          }
      }

      return _react2.default.createElement(
        'div',
        { className: 'host', style: hostStyle, 'data-jsx-ext': _ShareDropdown2.default.__scopedHash
        },
        _react2.default.createElement(
          'div',
          { className: 'drop attached-top', 'data-jsx-ext': _ShareDropdown2.default.__scopedHash
          },
          _react2.default.createElement('div', { className: 'arrow attached-top', style: style, 'data-jsx-ext': _ShareDropdown2.default.__scopedHash
          }),
          _react2.default.createElement(
            'div',
            { className: 'drop-content', 'data-jsx-ext': _ShareDropdown2.default.__scopedHash
            },
            _react2.default.createElement(
              'h4',
              {
                'data-jsx-ext': _ShareDropdown2.default.__scopedHash
              },
              'Share this with'
            ),
            _react2.default.createElement(
              'ul',
              {
                'data-jsx-ext': _ShareDropdown2.default.__scopedHash
              },
              _react2.default.createElement(
                'li',
                {
                  'data-jsx-ext': _ShareDropdown2.default.__scopedHash
                },
                _react2.default.createElement(
                  'a',
                  {
                    href: 'http://www.facebook.com/sharer/sharer.php?u=' + shareLink,
                    target: '_blank',
                    'data-jsx-ext': _ShareDropdown2.default.__scopedHash
                  },
                  _react2.default.createElement(_Icon2.default, { name: 'facebook', color: '#323091' }),
                  ' Facebook'
                )
              ),
              _react2.default.createElement(
                'li',
                {
                  'data-jsx-ext': _ShareDropdown2.default.__scopedHash
                },
                _react2.default.createElement(
                  'a',
                  {
                    href: 'http://twitter.com/share?url=' + shareLink + ';via=nightzookeeper',
                    target: '_blank',
                    'data-jsx-ext': _ShareDropdown2.default.__scopedHash
                  },
                  _react2.default.createElement(_Icon2.default, { name: 'twitter', color: '#3BABE6' }),
                  ' Twitter'
                )
              )
            ),
            _react2.default.createElement(
              'p',
              {
                'data-jsx-ext': _ShareDropdown2.default.__scopedHash
              },
              'Copy this link',
              _react2.default.createElement('input', { type: 'text', value: shareLink, onFocus: function onFocus(e) {
                  return e.target.select();
                }, 'data-jsx-ext': _ShareDropdown2.default.__scopedHash
              })
            ),
            _react2.default.createElement(
              'h4',
              {
                'data-jsx-ext': _ShareDropdown2.default.__scopedHash
              },
              'Follow us on'
            ),
            _react2.default.createElement(
              'a',
              { href: 'http://facebook.com/nightzookeeper', target: '_blank', 'data-jsx-ext': _ShareDropdown2.default.__scopedHash
              },
              _react2.default.createElement(_Icon2.default, { name: 'facebook', color: '#323091' })
            ),
            _react2.default.createElement(
              'a',
              { href: 'https://twitter.com/nightzookeeper', target: '_blank', 'data-jsx-ext': _ShareDropdown2.default.__scopedHash
              },
              _react2.default.createElement(_Icon2.default, { name: 'twitter', color: '#3BABE6' })
            ),
            _react2.default.createElement(
              'a',
              { href: 'https://www.pinterest.com/nightzookeeper/', target: '_blank', 'data-jsx-ext': _ShareDropdown2.default.__scopedHash
              },
              _react2.default.createElement(_Icon2.default, { name: 'pinterest', color: '#B60225' })
            )
          )
        ),
        _react2.default.createElement(_style2.default, {
          styleId: _ShareDropdown2.default.__scopedHash,
          css: _ShareDropdown2.default.__scoped
        })
      );
    }
  }]);

  return ShareDropdown;
}(_react.Component);

ShareDropdown.propTypes = {
  shareLink: _propTypes2.default.string,
  position: _propTypes2.default.string,
  bgColor: _propTypes2.default.string,
  color: _propTypes2.default.string
};
ShareDropdown.defaultProps = {
  position: 'right',
  bgColor: '#eee',
  color: '#555'
};
exports.default = ShareDropdown;
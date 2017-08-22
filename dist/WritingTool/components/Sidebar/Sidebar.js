'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PromptContainer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var PromptContainer = exports.PromptContainer = function (_React$Component) {
  _inherits(PromptContainer, _React$Component);

  function PromptContainer(props) {
    _classCallCheck(this, PromptContainer);

    var _this = _possibleConstructorReturn(this, (PromptContainer.__proto__ || Object.getPrototypeOf(PromptContainer)).call(this, props));

    _this.maxLength = props.image ? 130 : 280;
    var content = props.description;

    if (content.length > _this.maxLength) {
      content = content.substring(0, _this.maxLength).split(' ').filter(function (word) {
        return word !== '';
      }).join(' ');
      content += '... ';
    }

    _this.state = {
      content: content
    };
    return _this;
  }

  _createClass(PromptContainer, [{
    key: 'readMore',
    value: function readMore() {
      this.setState({
        content: this.state.content.length > this.props.description.length - 3 ? this.props.description.substring(0, this.maxLength).split(' ').filter(function (word) {
          return word !== '';
        }).join(' ') + '... ' : this.props.description + ' '
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'prompt-content', 'data-jsx-ext': _Sidebar2.default.__scopedHash
        },
        _react2.default.createElement(
          'p',
          { className: 'prompt-description', 'data-jsx-ext': _Sidebar2.default.__scopedHash
          },
          this.props.image && _react2.default.createElement('span', {
            className: 'prompt-image ' + (this.props.description ? '' : 'full'),
            style: { backgroundImage: 'url("' + this.props.image + '")' },
            onClick: this.props.onImageClick,
            'data-jsx-ext': _Sidebar2.default.__scopedHash
          }),
          _react2.default.createElement(
            'span',
            {
              'data-jsx-ext': _Sidebar2.default.__scopedHash
            },
            this.state.content,
            this.props.description.length > this.maxLength && _react2.default.createElement(
              'a',
              { className: 'read-more', onClick: this.readMore.bind(this), 'data-jsx-ext': _Sidebar2.default.__scopedHash
              },
              this.state.content.length < this.props.description.length ? _react2.default.createElement(
                'span',
                { className: 'read-more', 'data-jsx-ext': _Sidebar2.default.__scopedHash
                },
                'Read\xA0more'
              ) : _react2.default.createElement(
                'span',
                { className: 'read-less', 'data-jsx-ext': _Sidebar2.default.__scopedHash
                },
                'Read\xA0less'
              )
            )
          )
        ),
        _react2.default.createElement(_style2.default, {
          styleId: _Sidebar2.default.__scopedHash,
          css: _Sidebar2.default.__scoped
        })
      );
    }
  }]);

  return PromptContainer;
}(_react2.default.Component);

PromptContainer.propTypes = {
  description: _propTypes2.default.string,
  image: _propTypes2.default.string,
  content: _propTypes2.default.string,
  onImageClick: _propTypes2.default.func
};
PromptContainer.defaultProps = {
  onImageClick: function onImageClick() {}
};
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
      var _this3 = this;

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
              bgColor: _this3.props.secondaryColor,
              textColor: _this3.props.textColor
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

    /**
     * FOR PHIL, PromptContainer callback!
     */

  }, {
    key: 'onPromptImageClicked',
    value: function onPromptImageClicked() {
      console.log('Image clicked!');
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
        (image || description) && _react2.default.createElement(PromptContainer, _extends({}, this.props.prompt, {
          onImageClick: this.onPromptImageClicked
        })),
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
  primaryColor: _propTypes2.default.any,
  secondaryColor: _propTypes2.default.any,
  textColor: _propTypes2.default.any,
  prompt: _propTypes2.default.object,
  sections: _propTypes2.default.array
};
exports.default = Sidebar;
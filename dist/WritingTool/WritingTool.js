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

var _WritingTool = require('./WritingTool.styles');

var _WritingTool2 = _interopRequireDefault(_WritingTool);

var _Writer = require('./components/Writer/Writer');

var _Writer2 = _interopRequireDefault(_Writer);

var _PlanningDrawer = require('./components/PlanningDrawer/PlanningDrawer');

var _PlanningDrawer2 = _interopRequireDefault(_PlanningDrawer);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _store = require('./store/store');

var _store2 = _interopRequireDefault(_store);

var _planningActions = require('./store/actions/planningActions');

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by benjaminafonso on 20/06/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var WritingTool = function (_Component) {
  _inherits(WritingTool, _Component);

  function WritingTool() {
    _classCallCheck(this, WritingTool);

    return _possibleConstructorReturn(this, (WritingTool.__proto__ || Object.getPrototypeOf(WritingTool)).apply(this, arguments));
  }

  _createClass(WritingTool, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (!(_store2.default.getState().planning.fields.length > 0)) {
        (0, _planningActions.usePreset)(_store2.default.dispatch, 'story');
        _store2.default.dispatch((0, _planningActions.setInformations)('https://az801952.vo.msecnd.net/uploads/f1003e55-127d-42de-a49e-82a10d80b5f1.jpg', 'Cupcake ipsum dolor sit amet fruitcake gummi bears. Liquorice chocolate dessert toffee.'));
      }
    }
  }, {
    key: 'onStep',
    value: function onStep(n) {
      var leftWidth = document.getElementsByClassName('left')[0].style.width;
      var rightWidth = document.getElementsByClassName('right')[0].style.width;
      switch (n) {
        case 1:
          if (window.innerWidth > 1024) {
            leftWidth = 'calc(100% - 430px)';
            rightWidth = '430px';
          } else {
            leftWidth = 'calc(100vw - 75px)';
            rightWidth = '75px';
          }
          break;
        case 2:

          if (window.innerWidth > 1024) {
            leftWidth = '50%';
            rightWidth = '50%';
          } else {
            leftWidth = 'calc(100vw - 415px)';
            rightWidth = '415px';
          }

          break;
      }
      document.getElementsByClassName('right')[0].style.width = rightWidth;
      document.getElementsByClassName('left')[0].style.width = leftWidth;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _reactIntl.IntlProvider,
        { locale: 'en' },
        _react2.default.createElement(
          _reactRedux.Provider,
          { store: _store2.default },
          _react2.default.createElement(
            'div',
            { className: 'host', 'data-jsx-ext': _WritingTool2.default.__scopedHash
            },
            _react2.default.createElement('div', { className: 'background', style: {
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundImage: 'url("' + this.props.backgroundImageUrl + '")'
              }, 'data-jsx-ext': _WritingTool2.default.__scopedHash
            }),
            _react2.default.createElement('div', { className: 'left-margin', style: {
                background: this.props.primaryColor
              }, 'data-jsx-ext': _WritingTool2.default.__scopedHash
            }),
            _react2.default.createElement(
              'div',
              { className: 'column left', 'data-jsx-ext': _WritingTool2.default.__scopedHash
              },
              _store2.default.getState().planning.needsTitle ? _react2.default.createElement(
                'div',
                {
                  'data-jsx-ext': _WritingTool2.default.__scopedHash
                },
                _react2.default.createElement('div', { className: 'top-border', style: {
                    background: this.props.primaryColor
                  }, 'data-jsx-ext': _WritingTool2.default.__scopedHash
                }),
                _react2.default.createElement(
                  _reactIntl.FormattedMessage,
                  { id: 'enter_title', defaultMessage: 'Enter your title here' },
                  function (msg) {
                    return _react2.default.createElement('input', { className: 'title-bar', type: 'text', style: {
                        borderTop: '10px solid ' + _this2.props.primaryColor
                      }, placeholder: msg, 'data-jsx-ext': _WritingTool2.default.__scopedHash
                    });
                  }
                )
              ) : null,
              _react2.default.createElement(_Writer2.default, {
                primaryColor: this.props.primaryColor,
                secondaryColor: this.props.secondaryColor,
                light: this.props.light,
                minNbWords: 20
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'column right', 'data-jsx-ext': _WritingTool2.default.__scopedHash
              },
              _react2.default.createElement(_PlanningDrawer2.default, {
                onStep: this.onStep,
                primaryColor: this.props.primaryColor,
                secondaryColor: this.props.secondaryColor,
                light: this.props.light
              })
            ),
            _react2.default.createElement(_style2.default, {
              styleId: _WritingTool2.default.__scopedHash,
              css: _WritingTool2.default.__scoped
            })
          )
        )
      );
    }
  }]);

  return WritingTool;
}(_react.Component);

WritingTool.propTypes = {
  primaryColor: _propTypes2.default.string,
  secondaryColor: _propTypes2.default.string,
  light: _propTypes2.default.bool,
  backgroundImageUrl: _propTypes2.default.string
};
WritingTool.defaultProps = {
  backgroundImageUrl: 'https://s3.amazonaws.com/gumroad/files/6205413369590/4dacf067b6c54651b1b6b7bcc6d727d6/original/Cover_background.jpg'
};
exports.default = WritingTool;
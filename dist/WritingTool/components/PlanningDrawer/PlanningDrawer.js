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

var _PlanningDrawer = require('./PlanningDrawer.styles');

var _PlanningDrawer2 = _interopRequireDefault(_PlanningDrawer);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Fields = require('../Fields/Fields');

var _Fields2 = _interopRequireDefault(_Fields);

var _reactRedux = require('react-redux');

var _planningActions = require('../../store/actions/planningActions');

var _throttle = require('lodash/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlanningDrawer = (_dec = (0, _reactRedux.connect)(function (store) {
  return {
    description: store.planning.informations.description,
    image: store.planning.informations.image,
    fields: store.planning.fields,
    lastSave: store.planning.lastSave,
    title: store.planning.title,
    icon: store.planning.icon,
    titled: store.planning.needsTitle
  };
}), _dec(_class = function (_Component) {
  _inherits(PlanningDrawer, _Component);

  function PlanningDrawer(props) {
    _classCallCheck(this, PlanningDrawer);

    var _this = _possibleConstructorReturn(this, (PlanningDrawer.__proto__ || Object.getPrototypeOf(PlanningDrawer)).call(this, props));

    _this.state = {
      step: 1
    };
    _this.throttledSave = (0, _throttle2.default)(_this.save, 3000);
    return _this;
  }

  _createClass(PlanningDrawer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {

      var scrolling = false;
      document.getElementsByClassName('drawer')[0].addEventListener('touchstart', function (e) {
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

      document.getElementsByClassName('drawer')[0].addEventListener('touchmove', function (e) {
        e.stopPropagation();
      });
    }
  }, {
    key: 'nextStep',
    value: function nextStep() {
      if (this.state.step < 2) {
        var nextStep = (this.state.step + 1) % 3;
        if (nextStep === 0) {
          nextStep += 1;
        }

        if (this.props.onStep) {
          this.props.onStep(nextStep);
        }

        this.setState({ step: nextStep });
      }
    }
  }, {
    key: 'previousStep',
    value: function previousStep() {
      if (this.state.step > 1) {
        var nextStep = (this.state.step - 1) % 3;
        if (nextStep === 0) {
          nextStep = 2;
        }
        if (this.props.onStep) {
          this.props.onStep(nextStep);
        }

        this.setState({ step: nextStep });
      }
    }
  }, {
    key: 'save',
    value: function save() {
      if (this.props.lastSave > 3) {
        this.props.dispatch((0, _planningActions.savePlanningLocalStorage)());
      }
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      this.throttledSave();
    }
  }, {
    key: 'renderStoryDesc',
    value: function renderStoryDesc() {
      return _react2.default.createElement(
        'div',
        { className: 'story-desc', 'data-jsx-ext': _PlanningDrawer2.default.__scopedHash
        },
        _react2.default.createElement(
          'div',
          { className: 'title', 'data-jsx-ext': _PlanningDrawer2.default.__scopedHash
          },
          _react2.default.createElement('div', {
            className: 'icon',
            style: {
              height: '40px',
              width: '40px',
              position: 'absolute',
              backgroundImage: 'url("' + this.props.icon + '")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            },
            'data-jsx-ext': _PlanningDrawer2.default.__scopedHash
          }),
          _react2.default.createElement(
            'div',
            { className: 'plan-title', style: {
                color: this.props.light ? 'black' : 'white'
              }, 'data-jsx-ext': _PlanningDrawer2.default.__scopedHash
            },
            'Plan your ',
            this.props.title
          )
        ),
        this.props.image || this.props.description ? _react2.default.createElement(
          'div',
          { className: 'informations', 'data-jsx-ext': _PlanningDrawer2.default.__scopedHash
          },
          this.props.image ? _react2.default.createElement('div', {
            className: 'image',
            style: {
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              backgroundImage: 'url("' + this.props.image + '")',
              backgroundRepeat: 'no-repeat'
            },
            'data-jsx-ext': _PlanningDrawer2.default.__scopedHash
          }) : null,
          this.props.description ? _react2.default.createElement(
            'div',
            { className: 'description', style: {
                color: this.props.light ? 'black' : 'white'
              }, 'data-jsx-ext': _PlanningDrawer2.default.__scopedHash
            },
            this.props.description
          ) : null
        ) : null,
        _react2.default.createElement(_style2.default, {
          styleId: _PlanningDrawer2.default.__scopedHash,
          css: _PlanningDrawer2.default.__scoped
        })
      );
    }
  }, {
    key: 'renderFields',
    value: function renderFields() {
      this.props.fields.map(function (field, index) {
        return field;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var primaryColor = this.props.primaryColor;


      var style = {
        backgroundColor: primaryColor
      };

      var classNames = (0, _classnames2.default)({
        drawer: true
      });

      var hostClassNames = (0, _classnames2.default)({
        host: true
      });

      return _react2.default.createElement(
        'div',
        { name: 'host', className: hostClassNames, 'data-jsx-ext': _PlanningDrawer2.default.__scopedHash
        },
        _react2.default.createElement(
          'div',
          { name: 'drawer', className: classNames, style: style, 'data-jsx-ext': _PlanningDrawer2.default.__scopedHash
          },
          this.renderStoryDesc(),
          this.props.fields.map(function (field, index) {
            return _react2.default.createElement(_Fields2.default, {
              key: index,
              index: index,
              elements: field.type,
              instruction: field.title,
              nbFields: field.nbFields,
              nbPerRow: field.nbFieldsPerRow,
              removeable: field.removeable,
              overloadable: field.overloadable,
              primaryColor: _this2.props.primaryColor,
              secondaryColor: _this2.props.secondaryColor,
              light: _this2.props.light,
              onChange: _this2.onChange.bind(_this2)
            });
          }),
          _react2.default.createElement('div', { className: 'bottom-gradient', style: {
              position: 'fixed',
              bottom: '40px',
              left: '0',
              height: '20px',
              width: '100%',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)'
            }, 'data-jsx-ext': _PlanningDrawer2.default.__scopedHash
          })
        ),
        _react2.default.createElement(_style2.default, {
          styleId: _PlanningDrawer2.default.__scopedHash,
          css: _PlanningDrawer2.default.__scoped
        })
      );
    }
  }]);

  return PlanningDrawer;
}(_react.Component)) || _class);
PlanningDrawer.propTypes = {
  children: _propTypes2.default.any,
  step: _propTypes2.default.number,
  primaryColor: _propTypes2.default.object,
  secondaryColor: _propTypes2.default.object,
  light: _propTypes2.default.bool,
  preset: _propTypes2.default.string,
  customPreset: _propTypes2.default.any,
  image: _propTypes2.default.string,
  description: _propTypes2.default.string
};
PlanningDrawer.defaultProps = {
  light: false
};
exports.default = PlanningDrawer;
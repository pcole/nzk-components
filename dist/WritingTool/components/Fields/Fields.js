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

var _Fields = require('./Fields.styles');

var _Fields2 = _interopRequireDefault(_Fields);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Field = require('../Field/Field');

var _Field2 = _interopRequireDefault(_Field);

var _Icon = require('../../../Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _reactRedux = require('react-redux');

var _planningActions = require('../../store/actions/planningActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fields = (_dec = (0, _reactRedux.connect)(function (store) {
  return {
    fields: store.planning.fields
  };
}), _dec(_class = function (_Component) {
  _inherits(Fields, _Component);

  function Fields(props) {
    _classCallCheck(this, Fields);

    var _this = _possibleConstructorReturn(this, (Fields.__proto__ || Object.getPrototypeOf(Fields)).call(this, props));

    _this.state = {
      nbFields: props.nbFields,
      fields: [],
      fieldIndex: 0
    };
    _this.addField = _this.addField.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(Fields, [{
    key: 'addField',
    value: function addField() {
      this.props.dispatch(_planningActions.addInput.bind(this, this.props.index));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      for (var i = 0; i < this.props.nbFields; i++) {
        this.addField();
      }
    }
  }, {
    key: 'removeAction',
    value: function removeAction(input) {
      this.props.dispatch((0, _planningActions.removeInput)(this.props.index, input));
    }
  }, {
    key: 'onChange',
    value: function onChange(field, newValue) {
      this.props.onChange();
      this.props.dispatch((0, _planningActions.fieldChanged)(this.props.index, field, newValue));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          instruction = _props.instruction,
          stacking = _props.stacking,
          nbPerRow = _props.nbPerRow,
          overloadable = _props.overloadable,
          secondaryColor = _props.secondaryColor;


      var style = {};

      var className = (0, _classnames2.default)({});

      var stackingClass = (0, _classnames2.default)({
        stacking: stacking
      });

      return _react2.default.createElement(
        'div',
        { className: className, 'data-jsx-ext': _Fields2.default.__scopedHash
        },
        _react2.default.createElement(
          'h3',
          {
            style: {
              color: this.props.light ? 'black' : 'white'
            },
            'data-jsx-ext': _Fields2.default.__scopedHash
          },
          instruction
        ),
        _react2.default.createElement(
          'ul',
          { className: stackingClass, 'data-jsx-ext': _Fields2.default.__scopedHash
          },
          this.props.fields[this.props.index].fields.map(function (elem, index) {
            return _react2.default.createElement(_Field2.default, {
              element: _this2.props.elements,
              key: index,
              index: index,
              block: true,
              bgColor: _this2.props.secondaryColor,
              removeable: _this2.props.removeable,
              stacking: _this2.props.stacking,
              onChange: _this2.onChange,
              value: _this2.props.fields[_this2.props.index].fields[index].value,
              removeAction: _this2.removeAction.bind(_this2),
              width: _this2.props.stacking ? 'calc(' + 100 / _this2.props.nbPerRow + '% - 8px)' : '100%',
              light: _this2.props.light,
              striked: _this2.props.fields[_this2.props.index].fields[index].striked
            });
          }),
          overloadable ? _react2.default.createElement(
            'li',
            {
              className: stackingClass,
              style: {
                width: stacking ? 'calc(' + 100 / nbPerRow + '% - 8px)' : '100%'
              },
              'data-jsx-ext': _Fields2.default.__scopedHash
            },
            _react2.default.createElement(
              _Field2.default,
              {
                element: 'button',
                block: true,
                bgColor: secondaryColor,
                onClick: function onClick() {
                  return _this2.props.dispatch((0, _planningActions.addInput)(_this2.props.index));
                },
                light: this.props.light
              },
              _react2.default.createElement(_Icon2.default, { name: 'plus' })
            )
          ) : null
        ),
        _react2.default.createElement(_style2.default, {
          styleId: _Fields2.default.__scopedHash,
          css: _Fields2.default.__scoped
        })
      );
    }
  }]);

  return Fields;
}(_react.Component)) || _class);
Fields.propTypes = {
  instruction: _propTypes2.default.string,
  index: _propTypes2.default.number,
  color: _propTypes2.default.string,
  primaryColor: _propTypes2.default.object,
  secondaryColor: _propTypes2.default.object,
  stacking: _propTypes2.default.bool,
  elements: _propTypes2.default.string,
  nbFields: _propTypes2.default.number,
  nbPerRow: _propTypes2.default.number,
  overloadable: _propTypes2.default.bool,
  light: _propTypes2.default.bool,
  onChange: _propTypes2.default.func
};
Fields.defaultProps = {
  stacking: true,
  nbFields: 3,
  nbPerRow: 2,
  elements: 'input',
  overloadable: true,
  light: false
};
exports.default = Fields;
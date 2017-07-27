'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class; /**
                   * Created by benjaminafonso on 20/06/2017.
                   */

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

var _nodeVibrant = require('node-vibrant');

var Vibrant = _interopRequireWildcard(_nodeVibrant);

var _reactGsapEnhancer = require('react-gsap-enhancer');

var _reactGsapEnhancer2 = _interopRequireDefault(_reactGsapEnhancer);

var _gsap = require('gsap');

var _Icon = require('../Icon/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _ProgressBar = require('./components/ProgressBar/ProgressBar');

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WritingTool = (_dec = (0, _reactGsapEnhancer2.default)(), _dec(_class = function (_Component) {
  _inherits(WritingTool, _Component);

  function WritingTool() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, WritingTool);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WritingTool.__proto__ || Object.getPrototypeOf(WritingTool)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      step: 1,
      planningExpanded: true,
      primaryColor: undefined,
      secondaryColor: undefined,
      image: undefined,
      light: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(WritingTool, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (!(_store2.default.getState().planning.fields.length > 0)) {
        (0, _planningActions.usePreset)(_store2.default.dispatch, 'story');
        _store2.default.dispatch((0, _planningActions.setInformations)('https://az801952.vo.msecnd.net/uploads/f1003e55-127d-42de-a49e-82a10d80b5f1.jpg', 'Cupcake ipsum dolor sit amet fruitcake gummi bears. Liquorice chocolate dessert toffee.'));
      }

      window.addEventListener('resize', this.onResize.bind(this));
    }
  }, {
    key: 'getColorsFromBackground',
    value: function getColorsFromBackground() {
      var _this2 = this;

      var images = ['/assets/angry-alligator-creek-back.jpg', '/assets/arctic-wanderlust-back.jpg', '/assets/doomed-sea-back.jpg', '/assets/lava-tunnel-back.jpg', '/assets/lesson-hive.jpg', '/assets/temple.jpg', '/assets/welcome-bg.jpg', '/assets/what-why-where-woods-back.jpg', '/assets/ac7ywy8tv3qf3quimykx.jpg', '/assets/aa7ellrkrwfyljjnryne.jpg', '/assets/papbnwocavrkia6fai0n.jpg', '/assets/hhzgyh7bgdbhtbu8rpzs.jpg', '/assets/fqutf1jckgysqaivhgpq.jpg'];
      var pickedImage = images[Math.floor(Math.random() * (images.length - 1))];

      // CACHED BACKGROUND COLORS
      /* if (window.localStorage.getItem(`nzk-bg-${pickedImage}`)) {
        var cached = JSON.parse(window.localStorage.getItem(`nzk-bg-${pickedImage}`))
         var secondaryColor = new Color(cached.primaryColor.color)
        if (cached.light) {
          secondaryColor = secondaryColor.darken(0.2)
        } else {
          secondaryColor = secondaryColor.lighten(0.2)
        }
         this.setState({
          primaryColor: new Color(cached.primaryColor.color),
          secondaryColor: secondaryColor,
          image: cached.image,
          light: cached.light
        })
        return
      } */

      // NOT CACHED BACKGROUND COLORS
      Vibrant.from(pickedImage).getPalette(function (err, palette) {
        if (err) {
          return;
        }

        var primaryColor = new _color2.default(palette.Vibrant.getRgb());

        var light;
        var secondaryColor = new _color2.default(palette.Vibrant.getRgb());
        if (primaryColor.light()) {
          light = true;
          secondaryColor = secondaryColor.darken(0.2);
        } else {
          light = false;
          secondaryColor = secondaryColor.lighten(0.2);
        }

        _this2.setState({
          primaryColor: primaryColor,
          secondaryColor: secondaryColor,
          image: pickedImage,
          light: light
        });

        window.localStorage.setItem('nzk-bg-' + pickedImage, JSON.stringify({
          primaryColor: primaryColor,
          secondaryColor: secondaryColor,
          image: pickedImage,
          light: light
        }));
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getColorsFromBackground();

      if (window.localStorage.getItem('nzk-planning')) {
        (0, _planningActions.loadPlanningLocalstorage)(_store2.default.dispatch);
      }

      document.addEventListener('touchmove', function (e) {
        e.preventDefault();
      });
    }
  }, {
    key: 'onResize',
    value: function onResize(e) {
      if (e.target.window.innerWidth > 1280) {
        this.setState({ planningExpanded: true });
        this.addAnimation(this.expandDrawerAnimation.bind(this));
      }
    }
  }, {
    key: 'expandDrawerAnimation',
    value: function expandDrawerAnimation(_ref2) {
      var target = _ref2.target;

      var left = target.find({ name: 'leftCol' });
      var right = target.find({ name: 'rightCol' });

      if (!this.state.planningExpanded) {
        return new _gsap.TimelineMax().to(left, 1, { ease: _gsap.Bounce.easeOut, className: '-=planningExpanded' }, 0).to(right, 1, { ease: _gsap.Bounce.easeOut, className: '-=planningExpanded' }, 0);
      } else {
        return new _gsap.TimelineMax().to(left, 0, { position: 'absolute' }, 0).to(left, 1.5, { ease: _gsap.Bounce.easeOut, className: '+=planningExpanded' }, 0).to(right, 1.5, { ease: _gsap.Bounce.easeOut, className: '+=planningExpanded' }, 0).to(left, 0, { position: 'relative' }, 1.5);
      }
    }
  }, {
    key: 'toggleExpand',
    value: function toggleExpand() {
      this.addAnimation(this.expandDrawerAnimation.bind(this));
      this.setState({ planningExpanded: !this.state.planningExpanded });
    }
  }, {
    key: 'closeDrawer',
    value: function closeDrawer() {
      this.addAnimation(this.expandDrawerAnimation.bind(this));
      this.setState({ planningExpanded: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var buttonsClassNames = (0, _classnames2.default)({
        withTitle: _store2.default.getState().planning.needsTitle,
        withoutTitle: !_store2.default.getState().planning.needsTitle,
        buttons: true
      });

      var buttonBackgroundClassNames = (0, _classnames2.default)({
        withTitle: _store2.default.getState().planning.needsTitle,
        withoutTitle: !_store2.default.getState().planning.needsTitle,
        buttonBackground: true
      });

      var buttonsStyle = {
        backgroundColor: this.state.secondaryColor,
        borderColor: this.state.secondaryColor
      };

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
                backgroundImage: 'url("' + this.state.image + '")'
              }, 'data-jsx-ext': _WritingTool2.default.__scopedHash
            }),
            _react2.default.createElement(
              'div',
              { className: 'column left planningExpanded', name: 'leftCol', 'data-jsx-ext': _WritingTool2.default.__scopedHash
              },
              _react2.default.createElement(_Writer2.default, {
                primaryColor: this.state.primaryColor,
                secondaryColor: this.state.secondaryColor,
                light: this.state.light,
                minNbWords: 20,
                onMobileFocus: this.closeDrawer.bind(this)
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'column right planningExpanded', name: 'rightCol', 'data-jsx-ext': _WritingTool2.default.__scopedHash
              },
              _react2.default.createElement('div', { className: buttonBackgroundClassNames, style: {
                  backgroundColor: this.state.primaryColor
                }, 'data-jsx-ext': _WritingTool2.default.__scopedHash
              }),
              _react2.default.createElement(
                'div',
                { className: buttonsClassNames, 'data-jsx-ext': _WritingTool2.default.__scopedHash
                },
                _react2.default.createElement(
                  'div',
                  {
                    onClick: this.toggleExpand.bind(this),
                    style: buttonsStyle,
                    'data-jsx-ext': _WritingTool2.default.__scopedHash
                  },
                  _react2.default.createElement(_Icon2.default, {
                    name: this.state.planningExpanded ? 'right' : 'left',
                    fontSize: '25px',
                    color: this.state.light ? 'black' : 'white'
                  })
                )
              ),
              _react2.default.createElement(_PlanningDrawer2.default, {
                primaryColor: this.state.primaryColor,
                secondaryColor: this.state.secondaryColor,
                light: this.state.light
              })
            ),
            _react2.default.createElement(_style2.default, {
              styleId: _WritingTool2.default.__scopedHash,
              css: _WritingTool2.default.__scoped
            }),
            _react2.default.createElement(
              'div',
              { className: 'progressBar', 'data-jsx-ext': _WritingTool2.default.__scopedHash
              },
              _react2.default.createElement(_ProgressBar2.default, {
                nbWords: _store2.default.getState().writing.nbWords,
                minNbWords: _store2.default.getState().writing.constraints.minNbWords,
                maxNbWords: _store2.default.getState().writing.constraints.maxNbWords,
                progress: _store2.default.getState().writing.progress,
                primaryColor: this.state.primaryColor,
                secondaryColor: this.state.secondaryColor,
                light: this.state.light
              })
            )
          )
        )
      );
    }
  }]);

  return WritingTool;
}(_react.Component)) || _class);
WritingTool.propTypes = {
  primaryColor: _propTypes2.default.string,
  secondaryColor: _propTypes2.default.string,
  light: _propTypes2.default.bool
};
exports.default = WritingTool;
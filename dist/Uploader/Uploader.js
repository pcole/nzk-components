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

var _Uploader = require('./Uploader.styles');

var _Uploader2 = _interopRequireDefault(_Uploader);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Uploader = function (_React$Component) {
  _inherits(Uploader, _React$Component);

  function Uploader(props) {
    _classCallCheck(this, Uploader);

    var _this = _possibleConstructorReturn(this, (Uploader.__proto__ || Object.getPrototypeOf(Uploader)).call(this, props));

    _this.state = {
      progress: 0,
      images: []
    };
    _this.onDrop = _this.onDrop.bind(_this);
    return _this;
  }

  _createClass(Uploader, [{
    key: 'uploadOver',
    value: function uploadOver() {
      var _this2 = this;

      setTimeout(function () {
        _this2.setState({ progress: 0 });
      }, 2000);
    }
  }, {
    key: 'onDrop',
    value: function onDrop(file) {
      var _this3 = this;

      this.setState(function () {
        return {
          progress: 0
        };
      });
      var data = new window.FormData();
      data.append('image', file[0]);

      var config = {
        onUploadProgress: function onUploadProgress(progressEvent) {
          var percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
          _this3.setState({ progress: percentCompleted });
          if (percentCompleted === 100) {
            _this3.uploadOver();
          }
        }
      };
      var _ = this;
      _axios2.default.post(this.props.api, data, config).then(function (res) {
        _this3.props.uploadedImage(res.data.url);
        var images = _this3.state.images.slice();
        images.push(res.data.url);
        _.setState(function () {
          return {
            images: images
          };
        });
      }).catch(function (err) {
        window.alert('Erroooor');
        console.log(err);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          'data-jsx-ext': _Uploader2.default.__scopedHash
        },
        _react2.default.createElement(
          'div',
          {
            className: 'drop-zone',
            style: {
              position: 'relative',
              height: '200px',
              width: '200px',
              cursor: 'pointer'
            },
            'data-jsx-ext': _Uploader2.default.__scopedHash
          },
          _react2.default.createElement(
            'div',
            {
              className: 'progress',
              style: {
                width: this.state.progress + '%',
                background: 'rgba(107, 188, 102, 0.7)'
              },
              'data-jsx-ext': _Uploader2.default.__scopedHash
            },
            ' '
          ),
          this.props.api ? _react2.default.createElement(
            _reactDropzone2.default,
            { accept: 'image/jpeg, image/png', onDrop: this.onDrop },
            this.state.progress > 0 ? _react2.default.createElement(
              'div',
              { className: 'progress-label', 'data-jsx-ext': _Uploader2.default.__scopedHash
              },
              this.state.progress,
              '%'
            ) : _react2.default.createElement(
              'div',
              { className: 'label', 'data-jsx-ext': _Uploader2.default.__scopedHash
              },
              'Drag an image in the zone or click'
            )
          ) : _react2.default.createElement(
            'p',
            {
              'data-jsx-ext': _Uploader2.default.__scopedHash
            },
            ' Missing API to Component '
          )
        ),
        _react2.default.createElement(_style2.default, {
          styleId: _Uploader2.default.__scopedHash,
          css: _Uploader2.default.__scoped
        })
      );
    }
  }]);

  return Uploader;
}(_react2.default.Component);

Uploader.propTypes = {
  uploadedImage: _propTypes2.default.func
};
exports.default = Uploader;
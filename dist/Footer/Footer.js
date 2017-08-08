'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = undefined

var _createClass = (function () {
  function defineProperties (target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()

var _style = require('styled-jsx/style')

var _style2 = _interopRequireDefault(_style)

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _Footer = require('./Footer.styles')

var _Footer2 = _interopRequireDefault(_Footer)

function _interopRequireDefault (obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _classCallCheck (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _possibleConstructorReturn (self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self
}

function _inherits (subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    )
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}

var Footer = (function (_React$Component) {
  _inherits(Footer, _React$Component)

  function Footer () {
    _classCallCheck(this, Footer)

    return _possibleConstructorReturn(
      this,
      (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments)
    )
  }

  _createClass(Footer, [
    {
      key: 'render',
      value: function render () {
        return _react2.default.createElement(
          'div',
          {
            className: 'host',
            'data-jsx-ext': _Footer2.default.__scopedHash
          },
          _react2.default.createElement(
            'div',
            {
              className: 'links',
              'data-jsx-ext': _Footer2.default.__scopedHash
            },
            _react2.default.createElement(
              'div',
              {
                className: 'column',
                'data-jsx-ext': _Footer2.default.__scopedHash
              },
              _react2.default.createElement(
                'a',
                {
                  href: '/',
                  'data-jsx-ext': _Footer2.default.__scopedHash
                },
                'Home'
              ),
              _react2.default.createElement(
                'a',
                {
                  href: '/learn-more',
                  'data-jsx-ext': _Footer2.default.__scopedHash
                },
                'Learn More'
              ),
              _react2.default.createElement(
                'a',
                {
                  href: '/curriculum',
                  'data-jsx-ext': _Footer2.default.__scopedHash
                },
                'Curriculum'
              )
            ),
            _react2.default.createElement(
              'div',
              {
                className: 'column',
                'data-jsx-ext': _Footer2.default.__scopedHash
              },
              _react2.default.createElement(
                'a',
                {
                  href: '/edu/lesson-hive',
                  'data-jsx-ext': _Footer2.default.__scopedHash
                },
                'Lesson Hive'
              ),
              _react2.default.createElement(
                'a',
                {
                  href: '/edu/night-times',
                  'data-jsx-ext': _Footer2.default.__scopedHash
                },
                'Student Showcase'
              ),
              _react2.default.createElement(
                'a',
                {
                  href: 'http://nightzooteacher.com',
                  'data-jsx-ext': _Footer2.default.__scopedHash
                },
                'Blog'
              )
            ),
            _react2.default.createElement(
              'div',
              {
                className: 'column',
                'data-jsx-ext': _Footer2.default.__scopedHash
              },
              _react2.default.createElement(
                'a',
                {
                  href: '/contact',
                  'data-jsx-ext': _Footer2.default.__scopedHash
                },
                'Contact'
              ),
              _react2.default.createElement(
                'a',
                {
                  href: '/terms-and-conditions',
                  'data-jsx-ext': _Footer2.default.__scopedHash
                },
                'Terms & Conditions'
              ),
              _react2.default.createElement(
                'a',
                {
                  href: '/privacy',
                  'data-jsx-ext': _Footer2.default.__scopedHash
                },
                'Privacy Policy'
              )
            ),
            _react2.default.createElement(
              'div',
              {
                className: 'socials',
                'data-jsx-ext': _Footer2.default.__scopedHash
              },
              _react2.default.createElement(
                'a',
                {
                  href: 'https://twitter.com/nightzookeeper',
                  target: '_blank',
                  'data-jsx-ext': _Footer2.default.__scopedHash
                },
                _react2.default.createElement(
                  'i',
                  {
                    'data-jsx-ext': _Footer2.default.__scopedHash
                  },
                  _react2.default.createElement(
                    'svg',
                    {
                      viewBox: '0 0 512 512',
                      style: {
                        verticalAlign: 'middle',
                        width: '24px',
                        height: '24px',
                        fill: 'grey'
                      },
                      'data-jsx-ext': _Footer2.default.__scopedHash
                    },
                    _react2.default.createElement(
                      'g',
                      {
                        'data-jsx-ext': _Footer2.default.__scopedHash
                      },
                      _react2.default.createElement('path', {
                        d:
                          'm498 107c-18 8-37 13-57 15 21-12 36-31 44-55-19 12-41 20-63 24-18-19-44-31-73-31-54 0-99 45-99 99 0 8 1 16 3 23-83-4-156-44-204-104-9 15-14 32-14 50 0 35 18 65 44 83-16-1-31-5-45-13 0 1 0 1 0 1 0 48 34 89 80 98-8 2-17 3-26 3-7 0-13 0-19-2 13 40 49 68 93 69-34 27-77 43-123 43-8 0-16-1-24-2 44 28 96 45 152 45 182 0 282-151 282-282 0-5 0-9 0-13 19-14 36-31 49-51z',
                        'data-jsx-ext': _Footer2.default.__scopedHash
                      })
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'a',
                {
                  href: 'https://www.facebook.com/nightzookeeper',
                  target: '_blank',
                  'data-jsx-ext': _Footer2.default.__scopedHash
                },
                _react2.default.createElement(
                  'i',
                  {
                    class: 'L6JCB',
                    'data-jsx-ext': _Footer2.default.__scopedHash
                  },
                  _react2.default.createElement(
                    'svg',
                    {
                      viewBox: '0 0 512 512',
                      style: {
                        verticalAlign: 'middle',
                        width: '24px',
                        height: '24px',
                        fill: 'grey'
                      },
                      'data-jsx-ext': _Footer2.default.__scopedHash
                    },
                    _react2.default.createElement(
                      'g',
                      {
                        'data-jsx-ext': _Footer2.default.__scopedHash
                      },
                      _react2.default.createElement('path', {
                        d:
                          'm448 28l-385 0c-19 0-35 16-35 35l0 385c0 20 16 36 35 36l385 0c20 0 36-16 36-36l0-385c0-19-16-35-36-35z m-166 433l0-168-56 0 0-42 56 0 0-60c0-24 7-43 20-56 13-12 31-19 53-19 15 0 29 1 39 2l0 36-24 0c-43 0-44 33-44 44l0 53 64 0-6 42-58 0 0 168z',
                        'data-jsx-ext': _Footer2.default.__scopedHash
                      })
                    )
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            {
              className: 'wonky-star',
              'data-jsx-ext': _Footer2.default.__scopedHash
            },
            _react2.default.createElement(
              'div',
              {
                className: 'wonky-star-logo',
                'data-jsx-ext': _Footer2.default.__scopedHash
              },
              _react2.default.createElement('img', {
                alt: 'Wonkey Star Logo',
                src: 'https://dogottrtuoo78.cloudfront.net/assets/be3a8859.png',
                'data-jsx-ext': _Footer2.default.__scopedHash
              })
            ),
            _react2.default.createElement(
              'div',
              {
                className: 'wonky-star-label',
                'data-jsx-ext': _Footer2.default.__scopedHash
              },
              _react2.default.createElement(
                'div',
                {
                  'data-jsx-ext': _Footer2.default.__scopedHash
                },
                '2011-2017. Wonky Star Ltd'
              ),
              _react2.default.createElement(
                'div',
                {
                  'data-jsx-ext': _Footer2.default.__scopedHash
                },
                'Registered Company No. 07706300'
              )
            )
          ),
          _react2.default.createElement(_style2.default, {
            styleId: _Footer2.default.__scopedHash,
            css: _Footer2.default.__scoped
          })
        )
      }
    }
  ])

  return Footer
})(_react2.default.Component)

exports.default = Footer

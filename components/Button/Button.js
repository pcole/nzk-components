import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Color from 'color'
import cn from 'classnames'
import styles from './Button.styles'

export default class Button extends Component {
  static propTypes = {
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    block: PropTypes.bool,
    shadow: PropTypes.bool,
    gradient: PropTypes.bool,
    round: PropTypes.bool,
    onClick: PropTypes.func,
    bgColor: PropTypes.string,
    bgColorTo: PropTypes.string,
    backgroundImage: PropTypes.string,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    color: PropTypes.string,
    size: PropTypes.oneOf(['x-mall', 'small', 'regular', 'large', 'x-large']),
    width: PropTypes.string,
    height: PropTypes.string,
    borderRadius: PropTypes.string,
    element: PropTypes.string,
    children: PropTypes.any
  }

  handleClick: Function

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event) {
    const { disabled, onClick } = this.props

    if (disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    if (onClick) {
      onClick(event)
    }
  }

  render () {
    const {
      disabled,
      children,
      active,
      block,
      color,
      round,
      size,
      width,
      height,
      bgColor,
      bgColorTo,
      borderRadius,
      shadow,
      gradient,
      element,
      ...props
    } = this.props

    if (disabled) {
      props.tabIndex = -1
      props.style = { pointerEvents: 'none', ...props.style }
    }

    const className = cn({
      button: true,
      disabled: disabled,
      active: active,
      block: block,
      shadow: shadow,
      round: round,
      [size]: size
    })

    const bgColorObj = Color(bgColor || '#55acf1')
    const bgLuminosity = bgColorObj.luminosity()
    const colorObj = Color(color || (bgLuminosity >= 0.5 ? 'black' : 'white'))

    props.style = {
      color: colorObj.string(),
      backgroundColor: bgColorObj.string(),
      borderRadius: round
        ? '50%'
        : borderRadius || size === 'x-large' ? '30px' : '20px',
      boxShadow: shadow
        ? `0px 4px 0px ${bgColorObj.darken(0.25).string()}`
        : 'none',
      backgroundImage: gradient || bgColorTo
        ? `linear-gradient(to right, ${bgColor}, ${bgColorTo ||
            bgColorObj.lighten(0.2).string()})`
        : 'none',
      ...props.style
    }

    if (width) {
      props.style = {
        width: width,
        ...props.style
      }
    }

    if (height) {
      props.style = {
        height: height,
        ...props.style
      }
    }

    switch (element) {
      case 'span':
        return (
          <span {...props} className={className}>
            {children}<style jsx>{styles}</style>
          </span>
        )
      case 'button':
        return (
          <button {...props} className={className}>
            {children}<style jsx>{styles}</style>
          </button>
        )
      case 'a':
        return (
          <a {...props} className={className}>
            {children}<style jsx>{styles}</style>
          </a>
        )
      default:
        return (
          <div {...props} className={className}>
            {children}<style jsx>{styles}</style>
          </div>
        )
    }
  }
}

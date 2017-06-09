import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Icon extends Component {
  static propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
    fontSize: PropTypes.string
  }

  static defaultProps = {
    color: 'inherit',
    fontSize: 'inherit'
  }

  render () {
    const { name, color, fontSize, ...props } = this.props

    const style = {
      color: color,
      fontSize: fontSize,
      verticalAlign: 'middle'
    }

    const className = classNames({
      [`icon-${name}`]: true
    })

    return (
      <i className={className} style={style} {...props} />
    )
  }
}

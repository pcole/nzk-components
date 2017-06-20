import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Field.styles'
import cn from 'classnames'

export default class Field extends Component {
  static propTypes = {
    bgColor: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    content: PropTypes.string,
    block: PropTypes.bool,
    borders: PropTypes.bool,
    element: PropTypes.string,
    children: PropTypes.string,
    onClick: PropTypes.func,
    color: PropTypes.string,
    removeable: PropTypes.bool,
    light: PropTypes.bool,
    removeAction: PropTypes.func
  }

  static defaultProps = {
    bgColor: 'rgba(0,0,0,0.04)',
    height: '35px',
    width: '50%',
    content: '',
    block: false,
    borders: false,
    element: 'input',
    color: 'white',
    removeable: true,
    light: false
  }

  constructor (props) {
    super(props)
    this.state = {
      value: props.content
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  render () {
    const {
      bgColor,
      height,
      width,
      content,
      color,
      block,
      borders,
      element,
      children,
      onClick,
      removeable,
      light,
      removeAction
    } = this.props

    const style = {
      backgroundColor: bgColor,
      height: height,
      content: content,
      width: width,
      color: color
    }

    const className = cn({
      input: true,
      block: block,
      borders: borders,
      button: element === 'button'
    })

    const removeButtonClass = cn({
      removeButton: true,
      light: light,
      dark: !light
    })

    switch (element) {
      case 'button':
        return (
          <button className={className} style={style} onClick={onClick}>
            {children}
            <style jsx>{styles}</style>
          </button>
        )
      case 'input':
        return (
          <div className='input'>
            <input
              className={className}
              type='text'
              style={style}
              value={this.props.value}
              onChange={this.props.onChange}
            />
            {removeable
              ? <div className={removeButtonClass} onClick={removeAction} />
              : null}
            <style jsx>{styles}</style>
          </div>
        )
      case 'textarea':
        return <div>Not implemented yet</div>
      case 'div':
        return (
          <div className={className} type='text' style={style}>
            {children}
            {removeable
              ? <div className={removeButtonClass} onClick={removeAction} />
              : null}
            <style jsx>{styles}</style>
          </div>
        )
    }
  }
}

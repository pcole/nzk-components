import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Field.styles'
import cn from 'classnames'
import Icon from '../../../Icon/Icon'

const RemoveButton = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <div className='icon'>
        <Icon name='cross' fontSize='12px' />
      </div>
      <style jsx>{styles}</style>
    </div>
  )
}

export default class Field extends Component {
  static propTypes = {
    bgColor: PropTypes.string,
    key: PropTypes.any,
    index: PropTypes.number,
    height: PropTypes.string,
    width: PropTypes.string,
    content: PropTypes.string,
    value: PropTypes.string,
    block: PropTypes.bool,
    borders: PropTypes.bool,
    element: PropTypes.string,
    children: PropTypes.any,
    onClick: PropTypes.func,
    color: PropTypes.string,
    removeable: PropTypes.bool,
    light: PropTypes.bool,
    removeAction: PropTypes.func,
    stacking: PropTypes.bool,
    margin: PropTypes.string,
    onChange: PropTypes.func
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
    light: true,
    stacking: true,
    margin: '4px'
  }

  constructor (props) {
    super(props)
    this.state = {
      value: props.content,
      visible: true
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    if (this.props.element === 'textarea') {
      this.textAreaAdjust(event)
    }
    this.props.onChange(this.props.index, event.target.value)
    this.setState({ value: event.target.value })
  }

  removeAction () {
    this.props.removeAction(this.props.index)
    //this.setState({ visible: false })
  }

  textAreaAdjust (o) {
    o.target.style.height = '1px'
    o.target.style.height = `${10 + o.target.scrollHeight}px`
  }

  render () {
    const {
      bgColor,
      height,
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
      color: color,
      height: height
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
      case 'input': {
        return this.state.visible
          ? <li
            key={this.props.key}
            style={{ width: this.props.width, margin: this.props.margin }}
            >
            <div className='input'>
              <input
                className={className}
                type='text'
                style={style}
                value={this.props.value}
                onChange={this.handleChange}
                />
              {removeable
                  ? <RemoveButton
                    className={removeButtonClass}
                    onClick={this.removeAction.bind(this)}
                    />
                  : null}
              <style jsx>{styles}</style>
            </div>
          </li>
          : null
      }
      case 'textarea':
        return this.state.visible
          ? <li
            key={this.props.key}
            style={{ width: this.props.width, margin: this.props.margin }}
            >
            <div className='input'>
              <textarea
                className={className}
                style={style}
                value={this.props.value}
                onChange={this.handleChange}
                />
              {removeable
                  ? <RemoveButton onClick={this.removeAction.bind(this)} />
                  : null}
              <style jsx>{styles}</style>
            </div>
          </li>
          : null

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

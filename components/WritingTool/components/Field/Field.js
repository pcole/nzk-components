import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Field.styles'
import cn from 'classnames'
import Icon from '../../../Icon/Icon'
import GSAP from 'react-gsap-enhancer'
import { TimelineMax } from 'gsap'
import Color from 'color'
import throttle from 'lodash/throttle'

const RemoveButton = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <div className='icon'>
        <Icon name='cross' fontSize='12px' />
      </div>
      <style jsx>
        {styles}
      </style>
    </div>
  )
}

@GSAP()
export default class Field extends Component {
  static propTypes = {
    bgColor: PropTypes.object,
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
    onChange: PropTypes.func,
    striked: PropTypes.bool
  }

  static defaultProps = {
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
    margin: '4px',
    striked: false
  }

  constructor (props) {
    super(props)
    this.state = {
      value: props.content,
      visible: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.throttledTypingAnimation = throttle(() => {
      this.addAnimation(this.animateTyping)
    }, 200)
  }

  componentDidMount () {
    if (this.props.element === 'textarea') {
      this.addAnimation(this.resizeTextarea)
    }
    this.addAnimation(this.animateAppear.bind(this))
  }

  animateAppear (utils) {
    return new TimelineMax().from(utils.target, 0.3, { scale: 3, opacity: 0 })
  }

  animateRemove (utils) {
    return new TimelineMax({
      onComplete: () => {
        this.props.removeAction(this.props.index)
      }
    })
      .to(utils.target, 1, { rotation: 360, opacity: 0 })
      .to(utils.target, 0, { opacity: 1 })
  }

  animateTyping (utils) {
    var random = Math.random() * 2
    return new TimelineMax()
      .to(utils.target, 0.1, { rotation: random })
      .to(utils.target, 0.1, { rotation: -random }, 0.1)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.value !== nextProps.value ||
      this.props.bgColor !== nextProps.bgColor
    )
  }

  resizeTextarea ({ target }) {
    const textarea = target.find({ name: 'textarea' })
    return new TimelineMax()
      .to(textarea, 0, { height: '1px' })
      .to(textarea, 0, { height: `${10 + textarea[0].scrollHeight}px` })
  }

  handleChange (event) {
    // this.throttledTypingAnimation()

    if (this.props.element === 'textarea') {
      this.textAreaAdjust(event)
    }
    this.props.onChange(this.props.index, event.target.value)
    this.setState({ value: event.target.value })
  }

  removeAction () {
    this.addAnimation(this.animateRemove.bind(this))
    // this.props.removeAction(this.props.index)
    // this.setState({ visible: false })
  }

  textAreaAdjust (o) {
    // o.target.style.height = '1px'
    // o.target.style.height = `${10 + o.target.scrollHeight}px`
    this.addAnimation(this.resizeTextarea)
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
      removeAction,
      striked
    } = this.props

    const style = {
      backgroundColor: bgColor,
      color: this.props.light ? 'black' : 'white',
      height: height,
      fontSize: '16px',
      overflow: 'hidden'
    }

    const className = cn({
      input: true,
      block: block,
      borders: borders,
      button: element === 'button',
      striked: striked
    })

    const removeButtonClass = cn({
      removeButton: true,
      light: light,
      dark: !light
    })

    switch (element) {
      case 'button':
        var buttonColor = new Color(bgColor).fade(0.5)

        const buttonStyle = {
          backgroundColor: buttonColor,
          color: color,
          height: height,
          fontSize: '16px',
          cursor: 'pointer',
          lineHeight: '38px'
        }
        return (
          <div className={className} style={buttonStyle} onClick={onClick}>
            {children}
            <style jsx>
              {styles}
            </style>
          </div>
        )
      case 'input': {
        return this.state.visible
          ? <li style={{ width: this.props.width, margin: this.props.margin }}>
            <div className='input' name='field'>
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
              <style jsx>
                {styles}
              </style>
            </div>
          </li>
          : null
      }
      case 'textarea':
        return this.state.visible
          ? <li style={{ width: '100%', margin: this.props.margin }}>
            <div className='input'>
              <textarea
                className={className}
                style={style}
                value={this.props.value}
                onChange={this.handleChange}
                name='textarea'
                />
              {removeable
                  ? <RemoveButton onClick={this.removeAction.bind(this)} />
                  : null}
              <style jsx>
                {styles}
              </style>
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
            <style jsx>
              {styles}
            </style>
          </div>
        )
      default:
        return null
    }
  }
}

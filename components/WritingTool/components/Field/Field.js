import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AutosizeInput from '../../../AutosizeInput'
import GSAP from 'react-gsap-enhancer'
import { TimelineMax } from 'gsap'
import Button from '../../../Button'
import Icon from '../../../Icon'
import styles from './Field.styles'

const fontStyle = {
  fontFamily:
    "'Libre Baskerville', Baskerville, 'Baskerville Old Face', 'Hoefler Text', Garamond, 'Times New Roman', serif",
  fontFeatureSettings:
    '"kern" 1, "liga" 1, "calt" 1, "pnum" 1, "tnum" 0, "onum" 1, "lnum" 0, "dlig" 0',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale'
}

@GSAP()
export default class Field extends Component {
  static propTypes = {
    index: PropTypes.number,
    type: PropTypes.string,
    value: PropTypes.string,
    bgColor: PropTypes.any,
    textColor: PropTypes.any,
    removable: PropTypes.bool,
    onRemove: PropTypes.func,
    onChange: PropTypes.func,
    maxWidth: PropTypes.number
  }

  static defaultProps = {
    type: 'input',
    bgColor: '#6CD4FF',
    textColor: 'white',
    value: '',
    parentClientWidth: 385,
    onChange: () => {},
    onRemove: () => {}
  }

  constructor (props) {
    super(props)

    this.textareaRef = this.textareaRef.bind(this)
    this.resizeTextarea = this.resizeTextarea.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.animateRemove = this.animateRemove.bind(this)

    this.state = {
      value: this.props.value
    }
  }

  componentDidMount () {
    if (this.props.type === 'textarea') {
      this.addAnimation(this.resizeTextarea)
    }
  }

  animateRemove (utils) {
    return new TimelineMax({
      onComplete: () => {
        this.props.onRemove(this.props.index)
      }
    })
      .to(utils.target, 1, { rotation: 360, opacity: 0 })
      .to(utils.target, 0, { opacity: 1 })
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.state !== nextState.value ||
      this.props.value !== nextProps.value ||
      this.props.bgColor !== nextProps.bgColor
    )
  }

  resizeTextarea () {
    return new TimelineMax()
      .to(this.textarea, 0, { height: '1px' })
      .to(this.textarea, 0, { height: `${10 + this.textarea.scrollHeight}px` })
  }

  onChange (event) {
    this.setState({
      value: event.target.value
    })

    if (this.props.type === 'textarea') {
      this.addAnimation(this.resizeTextarea)
    }

    this.props.onChange(this.props.index, event.target.value)
  }

  onRemove () {
    this.addAnimation(this.animateRemove)
  }

  textareaAdjust (o) {
    this.addAnimation(this.resizeTextarea)
  }

  textareaRef (el) {
    this.textarea = el
  }

  render () {
    const hostStyle = {
      width: this.props.type === 'textarea' ? '100%' : 'auto'
    }
    const colorStyle = {
      color: this.props.textColor,
      backgroundColor: this.props.bgColor
    }

    const inputStyle = {
      ...colorStyle,
      ...fontStyle,
      padding: '5px 10px 5px 10px',
      textAlign: 'center',
      border: 'none',
      borderRadius: '5px',
      fontSize: '18px',
      outline: 'none',
      lineHeight: '1.5',
      minWidth: '162px',
      maxWidth: `${this.props.parentClientWidth - 30}px`,
      flex: '1'
    }

    const textareaStyle = {
      ...colorStyle,
      ...fontStyle
    }

    return (
      <li className='host' style={hostStyle}>
        {this.props.type === 'input' &&
          <AutosizeInput
            inputStyle={inputStyle}
            value={this.state.value}
            onChange={this.onChange}
          />}
        {this.props.type === 'textarea' &&
          <textarea
            style={textareaStyle}
            value={this.state.value}
            onChange={this.onChange}
            ref={this.textareaRef}
          />}
        {this.props.removable &&
          <div className='remove-button'>
            <Button
              round
              height='20px'
              width='20px'
              color={this.props.bgColor}
              bgColor={this.props.textColor}
              onClick={this.onRemove}
            >
              <Icon name='cross' fontSize='13px' />
            </Button>
          </div>}
        <style jsx>
          {styles}
        </style>
      </li>
    )
  }
}

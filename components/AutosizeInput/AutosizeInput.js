import React, { Component } from 'react'
import PropTypes from 'prop-types'

const sizerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  visibility: 'hidden',
  height: 0,
  overflow: 'scroll',
  whiteSpace: 'pre'
}

export default class AutosizeInput extends Component {
  static propTypes = {
    className: PropTypes.string, // className for the outer element
    defaultValue: PropTypes.any, // default field value
    inputClassName: PropTypes.string, // className for the input element
    inputStyle: PropTypes.object, // css styles for the input element
    minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func, // onChange handler: function(newValue) {}
    placeholder: PropTypes.string, // placeholder text
    placeholderIsMinWidth: PropTypes.bool, // don't collapse size to less than the placeholder
    style: PropTypes.object, // css styles for the outer element
    value: PropTypes.any
  }

  static defaultProps = {
    minWidth: 1
  }

  constructor (props) {
    super(props)

    this.state = {
      inputWidth: this.props.minWidth
    }

    this.inputRef = this.inputRef.bind(this)
    this.sizerRef = this.sizerRef.bind(this)
    this.placeHolderSizerRef = this.placeHolderSizerRef.bind(this)
  }

  componentDidMount () {
    this.mounted = true
    this.copyInputStyles()
    this.updateInputWidth()
  }

  componentDidUpdate (prevProps, prevState) {
    this.updateInputWidth()
  }

  componentWillUnmount () {
    this.mounted = false
  }

  inputRef (el) {
    this.input = el
  }

  placeHolderSizerRef (el) {
    this.placeHolderSizer = el
  }

  sizerRef (el) {
    this.sizer = el
  }

  copyInputStyles () {
    if (!window.getComputedStyle) {
      return
    }

    let inputStyle = this.input && window.getComputedStyle(this.input)

    if (!inputStyle) {
      return
    }

    let sizerNode = this.sizer

    sizerNode.style.fontSize = inputStyle.fontSize
    sizerNode.style.fontFamily = inputStyle.fontFamily
    sizerNode.style.fontWeight = inputStyle.fontWeight
    sizerNode.style.fontStyle = inputStyle.fontStyle
    sizerNode.style.letterSpacing = inputStyle.letterSpacing
    sizerNode.style.textTransform = inputStyle.textTransform

    if (this.props.placeholder) {
      let placeholderNode = this.placeHolderSizer
      placeholderNode.style.fontSize = inputStyle.fontSize
      placeholderNode.style.fontFamily = inputStyle.fontFamily
      placeholderNode.style.fontWeight = inputStyle.fontWeight
      placeholderNode.style.fontStyle = inputStyle.fontStyle
      placeholderNode.style.letterSpacing = inputStyle.letterSpacing
      placeholderNode.style.textTransform = inputStyle.textTransform
    }
  }

  updateInputWidth () {
    if (
      !this.mounted ||
      !this.sizer ||
      typeof this.sizer.scrollWidth === 'undefined'
    ) {
      return
    }

    let newInputWidth

    if (
      this.props.placeholder &&
      (!this.props.value ||
        (this.props.value && this.props.placeholderIsMinWidth))
    ) {
      newInputWidth =
        Math.max(this.sizer.scrollWidth, this.placeHolderSizer.scrollWidth) + 2
    } else {
      newInputWidth = this.sizer.scrollWidth + 2
    }
    if (newInputWidth < this.props.minWidth) {
      newInputWidth = this.props.minWidth
    }
    if (newInputWidth !== this.state.inputWidth) {
      this.setState({
        inputWidth: newInputWidth
      })
    }
  }

  getInput () {
    return this.input
  }

  focus () {
    this.input.focus()
  }

  blur () {
    this.input.blur()
  }

  select () {
    this.input.select()
  }

  render () {
    let sizerValue = [
      this.props.defaultValue,
      this.props.value,
      ''
    ].reduce((previousValue, currentValue) => {
      if (previousValue !== null && previousValue !== undefined) {
        return previousValue
      }
      return currentValue
    })

    let wrapperStyle = this.props.style || {}

    if (!wrapperStyle.display) wrapperStyle.display = 'inline-block'

    let inputStyle = { ...this.props.inputStyle }

    inputStyle.width = this.state.inputWidth + 'px'
    inputStyle.boxSizing = 'content-box'

    let inputProps = { ...this.props }

    inputProps.className = this.props.inputClassName
    inputProps.style = inputStyle

    // ensure props meant for `AutosizeInput` don't end up on the `input`
    delete inputProps.inputClassName
    delete inputProps.inputStyle
    delete inputProps.minWidth
    delete inputProps.onAutosize
    delete inputProps.placeholderIsMinWidth

    return (
      <div className={this.props.className} style={wrapperStyle}>
        <input {...inputProps} ref={this.inputRef} />
        <div ref={this.sizerRef} style={sizerStyle}>
          {sizerValue}
        </div>

        {this.props.placeholder &&
          <div ref={this.placeHolderSizerRef} style={sizerStyle}>
            {this.props.placeholder}
          </div>}
      </div>
    )
  }
}

import React, { Component } from 'react'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'

export default class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onAfterOpen: PropTypes.func,
    onBeforeClose: PropTypes.func,
    onAfterClose: PropTypes.func,
    delayCloseTimeoutMS: PropTypes.number,
    aria: PropTypes.object,
    role: PropTypes.string,
    contentLabel: PropTypes.string.isRequired,
    overlayColor: PropTypes.string
  }

  static defaultProps = {
    overlayColor: 'rgba(0,0,0,0.8)'
  }

  constructor (props) {
    super(props)

    this.state = {
      hasOpened: false,
      isClosing: false
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.isOpen === this.props.isOpen) return

    if (newProps.isOpen) {
      this.setState({
        hasOpened: true
      })
    } else if (this.state.hasOpened) {
      this.props.onBeforeClose && this.props.onBeforeClose()
      this.setState({
        isClosing: true
      })

      this.delayCloseTimeout = window.setTimeout(() => {
        this.setState({
          hasOpened: false,
          isClosing: false
        })
        this.props.onAfterClose && this.props.onAfterClose()
      }, this.props.delayCloseTimeoutMS)
    }
  }

  render () {
    const { style = {}, isOpen, ...props } = this.props

    style.overlay = style.overlay || {
      zIndex: 9999,
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100vh',
      width: '100vw',
      backgroundColor: this.props.overlayColor
    }

    style.content = style.content || {
      border: 'none',
      padding: '0',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'transparent'
    }

    return (
      <ReactModal
        isOpen={isOpen || (!isOpen && this.state.isClosing)}
        style={style}
        {...props}
      />
    )
  }

  componentWillUnmount () {
    window.clearTimeout(this.delayCloseTimeout)
  }
}

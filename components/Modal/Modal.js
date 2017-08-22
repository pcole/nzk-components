import React, { Component } from 'react'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'

export default class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    portalClassName: PropTypes.string,
    bodyOpenClassName: PropTypes.string,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    overlayClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    appElement: PropTypes.node,
    onAfterOpen: PropTypes.func,
    onRequestClose: PropTypes.func,
    closeTimeoutMS: PropTypes.number,
    ariaHideApp: PropTypes.bool,
    shouldCloseOnOverlayClick: PropTypes.bool,
    parentSelector: PropTypes.func,
    aria: PropTypes.object,
    role: PropTypes.string,
    contentLabel: PropTypes.string
  }

  static defaultProps = {
    contentLabel: 'Modal'
  }

  render () {
    const { style = {}, ...props } = this.props

    style.overlay = style.overlay || {
      zIndex: 9999,
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100vh',
      width: '100vw',
      backgroundColor: 'rgba(0,0,0,0.8)'
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

    return <ReactModal style={style} {...props} />
  }
}

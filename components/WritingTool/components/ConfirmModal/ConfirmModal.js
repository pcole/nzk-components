import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styles from './ConfirmModal.styles'
import cn from 'classnames'
import Icon from '../../../Icon/Icon'
import GSAP from 'react-gsap-enhancer'
import {TimelineMax} from 'gsap'
import Button from '../../../Button/Button'

@GSAP()
export default class ConfirmModal extends Component {
  static propTypes = {
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onDismiss: PropTypes.func,
    message: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string
  }

  static defaultProps = {
    confirmText: 'OK',
    cancelText: 'Cancel',
  }



  render () {
    return (<div className='host' onClick={this.props.onCancel}>

      <div className='modal'>
        <div className='message'>{this.props.message}</div>
        <div className='buttons'>
          <Button bgColor='green' shadow onClick={this.props.onConfirm}>{this.props.confirmText}</Button>
          <Button bgColor='red' shadow onClick={this.props.onCancel}>{this.props.cancelText}</Button>
        </div>

      </div>
      <style jsx>{styles}</style>
    </div>)
  }
}

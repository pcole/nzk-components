import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import Modal from './Modal'
import styles from './ConfirmModal.styles'

export default class ConfirmModal extends Component {
  static propTypes = {
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    message: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string
  }

  static defaultProps = {
    confirmText: 'OK',
    cancelText: 'Cancel'
  }

  render () {
    return (
      <Modal {...this.props}>
        <div className='host'>
          <div className='modal'>
            <div className='message'>
              {this.props.message}
            </div>
            <div className='buttons'>
              <Button bgColor='green' shadow onClick={this.props.onConfirm}>
                {this.props.confirmText}
              </Button>
              <Button bgColor='red' shadow onClick={this.props.onCancel}>
                {this.props.cancelText}
              </Button>
            </div>
          </div>
        </div>
        <style jsx>
          {styles}
        </style>
      </Modal>
    )
  }
}

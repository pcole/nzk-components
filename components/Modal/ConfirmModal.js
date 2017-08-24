import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import Modal from './Modal'
import styles from './ConfirmModal.styles'

export default class ConfirmModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    message: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    contentLabel: PropTypes.string,
    delayCloseTimeoutMS: PropTypes.number
  }

  static defaultProps = {
    confirmText: 'OK',
    cancelText: 'Cancel',
    contentLabel: 'confirm',
    delayCloseTimeoutMS: 500
  }

  constructor (props) {
    super(props)

    this.state = {
      open: this.props.isOpen,
      confirm: false
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.isOpen !== this.props.isOpen) {
      this.setState({
        open: newProps.isOpen
      })
    }
  }

  onConfirm () {
    this.setState({
      confirm: true,
      open: false
    })
  }

  onCancel () {
    this.setState({
      confirm: false,
      open: false
    })
  }

  onAfterClose () {
    this.props.onAfterClose && this.props.onAfterClose(this.state.confirm)
    this.state.confirm && this.props.onConfirm && this.props.onConfirm()
    !this.state.confirm && this.props.onCancel && this.props.onCancel()
  }

  render () {
    return (
      <Modal
        isOpen={this.state.open}
        delayCloseTimeoutMS={this.props.delayCloseTimeoutMS}
        overlayColor='transparent'
        onAfterClose={this.onAfterClose.bind(this)}
        contentLabel={this.props.contentLabel}
      >
        <div className={`host${this.state.open ? ' fadeIn' : ''}`}>
          <div className='modal'>
            <div className='message'>
              {this.props.message}
            </div>
            <div className='buttons'>
              <Button
                bgColor='green'
                shadow
                onClick={this.onConfirm.bind(this)}
              >
                {this.props.confirmText}
              </Button>
              <Button bgColor='red' shadow onClick={this.onCancel.bind(this)}>
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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import Icon from '../Icon'
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
                round={!this.props.confirmText}
                size='large'
                onClick={this.onConfirm.bind(this)}
              >
                { this.props.confirmText || <Icon name='check' color='white' /> }
              </Button>
              <Button
                bgColor='red'
                shadow
                round={!this.props.cancelText}
                size='large'
                onClick={this.onCancel.bind(this)}
              >
                { this.props.cancelText || <Icon name='cross' color='white' /> }
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

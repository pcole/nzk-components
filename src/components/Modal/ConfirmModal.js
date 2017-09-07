import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MessageModal from './MessageModal'

export default class ConfirmModal extends Component {
  static propTypes = {
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    confirmLabel: PropTypes.string,
    cancelLabel: PropTypes.string
  }

  static defaultProps = {
    contentLabel: 'confirm'
  }

  constructor (props) {
    super(props)

    this.state = {
      open: this.props.isOpen
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
      open: false,
      confirm: true
    })
    this.props.onConfirm && this.props.onConfirm()
  }

  onCancel () {
    this.setState({
      open: false,
      confirm: false
    })
    this.props.onCancel && this.props.onCancel()
  }

  render () {
    const {onConfirm, onCancel, isOpen, confirmLabel, cancelLabel, ...props} = this.props

    const buttons = [{
      bgColor: 'green',
      label: confirmLabel,
      icon: confirmLabel
        ? false
        : {name: 'check', color: 'white'},
      shadow: true,
      round: !confirmLabel,
      size: 'large',
      onClick: this.onConfirm.bind(this)
    },
    {
      bgColor: 'red',
      label: cancelLabel,
      icon: cancelLabel
        ? false
        : {name: 'cross', color: 'white'},
      shadow: true,
      round: !cancelLabel,
      size: 'large',
      onClick: this.onCancel.bind(this)
    }]

    return <MessageModal isOpen={this.state.open} buttons={buttons} {...props} />
  }
}

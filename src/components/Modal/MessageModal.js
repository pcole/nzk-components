import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import Icon from '../Icon'
import Modal from './Modal'
import styles from './MessageModal.styles'

export default class MessageModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    buttons: PropTypes.array,
    contentLabel: PropTypes.string,
    delayCloseTimeoutMS: PropTypes.number
  }

  static defaultProps = {
    contentLabel: 'message',
    delayCloseTimeoutMS: 500,
    buttons: [{ label: 'OK', shadow: true, size: 'large' }]
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

  onAfterClose () {
    this.props.onAfterClose &&
      this.props.onAfterClose(this.state.buttonClickedIndex)
    this.props.buttons[this.state.buttonClickedIndex].onAfterClose &&
      this.props.buttons[this.state.buttonClickedIndex].onAfterClose()
  }

  onButtonClick (index) {
    this.setState({
      buttonClickedIndex: index
    })

    if (this.props.buttons[index].onClick) {
      this.props.buttons[index].onClick()
    } else {
      this.state = {
        open: false
      }
    }
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
            <div className='message'>{this.props.message}</div>
            <div className='buttons'>
              {this.props.buttons.map((button, index) => {
                const { onClick, onAfterClose, label, icon, ...props } = button
                return (
                  <Button
                    key={index}
                    onClick={() => {
                      this.onButtonClick(index)
                    }}
                    {...props}
                  >
                    {icon && <Icon {...icon} />}
                    {label && label}
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
        <style jsx>{styles}</style>
      </Modal>
    )
  }
}

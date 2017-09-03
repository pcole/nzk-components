import React, { Component } from 'react'
import Icon from '../Icon'
import Modal from './Modal'
import styles from './SpinnerModal.styles'
import PropTypes from 'prop-types'

export default class SpinnerModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    delayFadeInTimeoutMS: PropTypes.number
  }

  static defaultProps = {
    delayFadeInTimeoutMS: 500
  }

  constructor (props) {
    super(props)

    this.state = {
      fadeIn: false
    }
  }

  onAfterOpen () {
    this.delayFadeInTimeout = window.setTimeout(() => {
      this.setState({
        fadeIn: true
      })
    }, this.props.delayFadeInTimeoutMS0)
  }

  onBeforeClose () {
    this.setState({
      fadeIn: false
    })
  }

  render () {
    const {
      onAfterOpen,
      onRequestClose,
      delayCloseTimeoutMS = 1000,
      ...props
    } = this.props

    return (
      <Modal
        delayCloseTimeoutMS={delayCloseTimeoutMS}
        overlayColor='transparent'
        onAfterOpen={this.onAfterOpen.bind(this)}
        onBeforeClose={this.onBeforeClose.bind(this)}
        contentLabel='spinner'
        {...props}
      >
        <div className={`host${this.state.fadeIn ? ' fadeIn' : ''}`}>
          <div className='spinner'>
            <Icon color='white' fontSize='70px' name='time-travel' />
          </div>
          <style jsx>{styles}</style>
        </div>
      </Modal>
    )
  }

  componentWillUnmount () {
    window.clearTimeout(this.openTimeout)
  }
}

import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import ConfirmModal from './ConfirmModal'

export default class StoryContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modalAIsOpen: false,
      modalBIsOpen: false,
      modalCIsOpen: false
    }
  }

  componentDidMount () {
    this.openA()
  }

  openA () {
    this.setState({
      modalAIsOpen: true,
      modalBIsOpen: false,
      modalCIsOpen: false
    })
  }

  openB () {
    this.setState({
      modalAIsOpen: false,
      modalBIsOpen: true,
      modalCIsOpen: false
    })
  }

  openC () {
    this.setState({
      modalAIsOpen: false,
      modalBIsOpen: false,
      modalCIsOpen: true
    })
  }

  closeAll () {
    this.setState({
      modalAIsOpen: false,
      modalBIsOpen: false,
      modalCIsOpen: false
    })
  }

  render () {
    return (
      <div>
        <ConfirmModal
          isOpen={this.state.modalAIsOpen}
          message='Go to modal B?'
          confirmText='Yes'
          cancelText='No'
          onConfirm={this.openB.bind(this)}
          onCancel={this.openC.bind(this)}
          delayCloseTimeoutMS={0}
          contentLabel='modalA'
        />

        <ConfirmModal
          isOpen={this.state.modalBIsOpen}
          message='Back to Modal A?'
          confirmText='Yes'
          cancelText='No'
          onConfirm={this.openA.bind(this)}
          onCancel={this.openC.bind(this)}
          delayCloseTimeoutMS={0}
          contentLabel='modalB'
        />

        <ConfirmModal
          isOpen={this.state.modalCIsOpen}
          message='Close All'
          confirmText='YES!'
          cancelText='Back to B'
          onConfirm={this.closeAll.bind(this)}
          onCancel={this.openB.bind(this)}
          contentLabel='modalC'
        />
      </div>
    )
  }
}

storiesOf('Modals', module).add('confirmModal', () => <StoryContainer />)

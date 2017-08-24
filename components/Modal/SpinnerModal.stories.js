import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import SpinnerModal from './SpinnerModal'

export default class StoryContainer extends Component {
  constructor (props) {
    super(props)

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)

    this.state = {
      isOpen: false,
      message: 'Click to Open!'
    }
  }

  open () {
    this.setState({
      isOpen: true
    })
    this.timeout = window.setTimeout(() => {
      this.close()
    }, 5000)
  }

  close () {
    this.setState({
      isOpen: false
    })
  }

  onAfterClose () {
    this.setState({
      message: 'You can click again!'
    })
  }

  render () {
    return (
      <div
        onClick={this.open}
        style={{
          backgroundColor: 'white',
          color: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <div>
          {this.state.message}
        </div>
        <SpinnerModal
          isOpen={this.state.isOpen}
          onAfterClose={this.onAfterClose.bind(this)}
        />
      </div>
    )
  }

  componentWillUnmount () {
    window.clearTimeout(this.timeout)
  }
}

storiesOf('Modals', module).add('SpinnerModal', () => <StoryContainer />)

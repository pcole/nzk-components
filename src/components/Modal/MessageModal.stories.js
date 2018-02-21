import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import MessageModal from './MessageModal'

export default class StoryContainer extends Component {
  render () {
    return (
      <div>
        <MessageModal isOpen message='Hello World!' />
      </div>
    )
  }
}

storiesOf('Modals', module).add('messageModal', () => <StoryContainer />)

import React from 'react'
import { storiesOf } from '@storybook/react'
import StatusBar from './StatusBar'
import Store from '../../store/store'
import Provider from '../../store/storyProvider'

storiesOf('WritingTool', module)
  .addDecorator(story => <Provider store={Store()} story={story()} />)
  .add('StatusBar', () => <StatusBar textColor='white' bgColor='#509DBF' />)

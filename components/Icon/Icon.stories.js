import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, color } from '@storybook/addon-knobs'
import Icon from './Icon'

storiesOf('Icon', module)
  .addDecorator(withKnobs)
  .add('Icon', () => (
    <Icon
      name={text('Name', 'night-zookeeper-logo')}
      color={color('Color', '#000')}
      fontSize={text('Font Size', '28px')}
    />
))

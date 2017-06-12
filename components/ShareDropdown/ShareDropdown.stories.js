import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, color, select } from '@storybook/addon-knobs'
import ShareDropdown from './ShareDropdown'

const positions = {
  'left': 'left',
  'middle': 'middle',
  'right': 'right'
}

storiesOf('ShareDropDown', module)
  .addDecorator(withKnobs)
  .add('Dropdown', () =>
    <ShareDropdown
      shareLink='https://www.nightzookeeper.com'
      position={select('position', positions, 'right')}
      bgColor={color('bgColor', '#eee')}
      color={color('color', '#555')}
    />
  )

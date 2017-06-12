import React from 'react'
import { storiesOf } from '@storybook/react'
import ShareDropdown from './ShareDropdown'

storiesOf('ShareDropDown', module)
  .add('Dropdown right', () =>
    <ShareDropdown
      shareLink='https://www.nightzookeeper.com'
      position='right'
    />
  )
  .add('Dropdown left', () =>
    <ShareDropdown shareLink='https://www.nightzookeeper.com' position='left' />
  )
  .add('Dropdown middle', () =>
    <ShareDropdown
      shareLink='https://www.nightzookeeper.com'
      position='middle'
    />
  )
  .add('Background color', () =>
    <ShareDropdown
      shareLink='https://www.nightzookeeper.com'
      bgColor='orange'
    />
  )
  .add('Text color', () =>
    <ShareDropdown shareLink='https://www.nightzookeeper.com' color='red' />
  )

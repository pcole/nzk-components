import React from 'react'
import { storiesOf } from '@storybook/react'
import Fields from './Fields'

storiesOf('WritingTool', module).add('Fields', () =>
  <Fields instruction='Opening line' />
)

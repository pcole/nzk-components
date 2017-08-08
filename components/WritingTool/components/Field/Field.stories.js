import React from 'react'
import { storiesOf } from '@storybook/react'
import Field from './Field'

storiesOf('WritingTool', module).add('Field', () =>
  <div>
    <Field width='33%' />
    <Field element='div' width='75%' />
    <Field element='button' block>
      +
    </Field>
  </div>
)

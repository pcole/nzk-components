import React from 'react'
import { storiesOf } from '@storybook/react'
import WritingTool from './WritingTool'
import { withKnobs, text, color, select, boolean } from '@storybook/addon-knobs'

storiesOf('WritingTool', module)
  .addDecorator(withKnobs)
  .add('WritingTool', () =>
  <WritingTool primaryColor={color('primary', '#55acf1')}
               secondaryColor={color('secondary', '#84DBF8')}
               light={boolean('light', false)}
  />
)

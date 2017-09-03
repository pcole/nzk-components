import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, color, select, boolean } from '@storybook/addon-knobs'
import Button from './Button'
import Icon from '../Icon/Icon'

const buttonSizes = {
  'x-small': 'x-small',
  small: 'small',
  regular: 'regular',
  large: 'large',
  'x-large': 'x-large'
}

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('Plain button', () => (
    <Button
      bgColor={color('bgColor', '#55acf1')}
      color={color('color', '#fff')}
      size={select('size', buttonSizes, 'regular')}
    >
      {text('Label', 'A simple button')}
    </Button>
  ))
  .add('With shadow and gradient', () => (
    <Button
      bgColor={color('bgColor', '#55acf1')}
      color={color('color', '#fff')}
      size={select('size', buttonSizes, 'regular')}
      shadow={boolean('shadow', true)}
      gradient={boolean('gradient', true)}
    >
      {text('Label', 'With shadow & gradient')}
    </Button>
  ))
  .add('Custom gradient', () => (
    <Button
      bgColor={color('bgColor', '#81247A')}
      bgColorTo={color('bgColorTo', '#303993')}
      color={color('color', '#fff')}
      size={select('size', buttonSizes, 'regular')}
      shadow={boolean('shadow', true)}
    >
      {text('Label', 'Custom gradient')}
    </Button>
  ))
  .add('Round with icon', () => (
    <Button
      round
      bgColor={color('bgColor', '#81247A')}
      color={color('color', '#fff')}
      size={select('size', buttonSizes, 'regular')}
      shadow={boolean('shadow', true)}
    >
      <Icon name={text('Icon name', 'pencil')} />
    </Button>
  ))
  .add('Dispay block', () => (
    <Button block={boolean('block', true)}>I display block</Button>
  ))
  .add('Custom dimensions', () => (
    <Button width={text('Width', '300px')} height={text('height', '300px')}>
      I can be any size and the text is centered and multiline
    </Button>
  ))

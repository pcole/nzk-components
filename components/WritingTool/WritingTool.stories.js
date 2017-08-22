import React from 'react'
import { storiesOf } from '@storybook/react'
import WritingTool from './WritingTool'
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs'

const types = {
  'adventure-story': 'adventure-story',
  poem: 'poem',
  explanation: 'explanation',
  instructions: 'instructions',
  'persuasive-writing': 'persuasive-writing',
  'newspaper-article': 'newspaper-article',
  'letter-writing': 'letter-writing',
  'diary-entry': 'diary-entry',
  playscript: 'playscript',
  recounts: 'recounts',
  biography: 'biography',
  report: 'report',
  'free-write': 'fere-write'
}

storiesOf('WritingTool', module)
  .addDecorator(withKnobs)
  .add('WritingTool', () =>
    <WritingTool
      image={text('BackgroundImage', '/assets/temple.jpg')}
      // prompt={{
      //   image: text('Image', '/assets/temple.jpg'),
      //   description: text(
      //     'Description',
      //     'Make your planning notes below and use them to help inspire your creative writing.'
      //   )
      // }}
      writingType={select('type', types, 'poem')}
      lang='en'
      hideImageButton={boolean('hideImageButton', false)}
      hideTextStyleButtons={boolean('hideTextStyleButtons', false)}
      hideAlignButtons={boolean('hideAlignButtons', false)}
      hideClearButton={boolean('hideClearButton', false)}
      onBack={() => {
        window.alert('on back callback')
      }}
      onSave={() => {
        window.alert('on save callback')
      }}
    />
  )

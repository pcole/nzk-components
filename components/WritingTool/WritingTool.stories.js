import React from 'react'
import { storiesOf } from '@storybook/react'
import WritingTool from './WritingTool'
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs'

const types = {
  story: 'story',
  poetry: 'poetry',
  explanation: 'explanation',
  instructions: 'instructions',
  opinion: 'opinion',
  news: 'news',
  letter: 'letter',
  diary: 'diary',
  playscript: 'playscript',
  recount: 'recount',
  biography: 'biography',
  report: 'report',
  freewrite: 'feewrite'
}

storiesOf('WritingTool', module)
  .addDecorator(withKnobs)
  .add('WritingTool', () =>
    <WritingTool
      image={text('BackgroundImage', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvJnQ4RQr3UV2VvHC59P01kszpnQdTogkiZNdLweBlSqNtJfrCMA')}
      type={select('type', types, 'story')}
      writingImage={text('Image', 'azeaze')}
      writingDescription={text('Description', 'Make your planning notes below and use them to help inspire your creative writing.')}
      hideImageButton={boolean('hideImageButton', true)}
      hideTextStyleButtons={boolean('hideTextStyleButtons', true)}
      hideAlignButtons={boolean('hideAlignButtons', true)}
      backCallback={() => {console.log('BACK ACTION')}}
    />
  )

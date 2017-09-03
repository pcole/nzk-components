import React from 'react'
import { storiesOf } from '@storybook/react'
import Store from '../../store/store'
import Provider from '../../store/storyProvider'
import { init } from '../../store/actions'
import Sidebar from './Sidebar'

const initStore = () => {
  const store = Store()

  store.dispatch(
    init(store.dispatch, {
      lang: 'en',
      writingType: 'report',
      prompt: {
        image: '/assets/temple.jpg',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'
      },
      sections: [
        {
          title: 'This is a custom part',
          prepend: true,
          numberOfFields: 2,
          fieldType: 'input',
          userCanAddFields: false,
          fieldsAreRemovable: false,
          fields: [{ value: 'BOB' }, { value: 'PHIL' }]
        }
      ]
    })
  )

  return store
}

storiesOf('WritingTool', module)
  .addDecorator(story => <Provider store={initStore()} story={story()} />)
  .add('Sidebar', () => (
    <div className='host'>
      <Sidebar
        textColor='white'
        primaryColor='#509DBF'
        secondaryColor='#6CD4FF'
      />
      <style jsx>{`
        .host {
          width: 415px;
          overflow: hidden;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  ))

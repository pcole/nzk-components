import React from 'react'
import { storiesOf } from '@storybook/react'
import Store from '../../store/store'
import Provider from '../../store/storyProvider'
import { mergeSection } from '../../store/actions'
import Section from './Section'

const initStore = () => {
  const store = Store()

  store.dispatch(
    mergeSection({
      title: 'This is a section',
      fieldType: 'input',
      numberOfFields: 4,
      userCanAddFields: true,
      fieldsAreRemovable: true
    })
  )

  store.dispatch(
    mergeSection({
      title: 'Here is another one',
      fieldType: 'textarea',
      numberOfFields: 1,
      userCanAddFields: false,
      fieldsAreRemovable: false
    })
  )

  return store
}

storiesOf('WritingTool', module)
  .addDecorator(story => <Provider store={initStore()} story={story()} />)
  .add('Section', () => (
    <ul className='host'>
      <Section index={0} bgColor='#6CD4FF' textColor='white' />
      <Section index={1} bgColor='#6CD4FF' textColor='white' />
      <style jsx>
        {`
          .host {
            width: 415px;
            padding: 20px 15px 20px 15px;
            background-color: #509dbf;
            box-sizing: border-box;
            text-align: center;
          }
        `}
      </style>
    </ul>
  ))

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
      writingType: 'poem'
    })
  )

  return store
}

storiesOf('WritingTool', module)
  .addDecorator(story => <Provider store={initStore()} story={story()} />)
  .add('Sidebar', () =>
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
  )

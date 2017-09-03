import React from 'react'
import { Provider } from 'react-redux'

export default function StoryProvider ({ story, store }) {
  return <Provider store={store}>{story}</Provider>
}

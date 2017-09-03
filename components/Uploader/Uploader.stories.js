import React from 'react'
import { storiesOf } from '@storybook/react'
import Uploader from './Uploader'

storiesOf('Uploader', module).add('Uploader', () => (
  <Uploader
    api='http://localhost:3000/images/upload'
    uploadedImage={url => {
      console.log(url)
    }}
  />
))

import React from 'react'
import { storiesOf } from '@storybook/react'
import Field from './Field'

storiesOf('WritingTool', module).add('Field', () => (
  <ul className='host'>
    <Field type='input' />
    <Field type='input' value='Hello World' removable />
    <Field type='textarea' />
    <style jsx>
      {`
        .host {
          width: 415px;
          padding: 20px 15px 20px 15px;
          background-color: #509dbf;
          box-sizing: border-box;
          text-align: center;
          list-style-type: none;
        }
      `}
    </style>
  </ul>
))

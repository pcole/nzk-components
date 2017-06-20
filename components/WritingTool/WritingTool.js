/**
 * Created by benjaminafonso on 20/06/2017.
 */

import React, { Component } from 'react'
import styles from './WritingTool.styles'
import Writer from './components/Writer/Writer'
import Fields from './components/Fields/Fields'

export default class WritingTool extends Component {
  render () {
    return (
      <div className='host'>
        <div className='column left'>
          <Writer />
        </div>
        <div className='column right'>
          <Fields
            instruction='Opening line'
            nbFields={1}
            nbPerRow={1}
            removeable={false}
          />
          <Fields
            instruction='Rhyming words'
            nbFields={3}
            nbPerRow={2}
            removeable={false}
          />
          <Fields
            instruction='Alliteration to use'
            nbFields={3}
            nbPerRow={2}
            removeable={false}
          />
          <Fields
            instruction='Similes to use'
            nbFields={3}
            nbPerRow={2}
            removeable={false}
          />
          <Fields
            instruction='Metaphors to use'
            nbFields={3}
            nbPerRow={2}
            removeable={false}
          />

        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './StatusBar.styles'

@connect(store => {
  return {
    nbWords: store.writing.nbWords,
    lastSaveTime: store.writing.lastSaveTime
  }
})
export default class StatusBar extends Component {
  static propTypes = {
    nbWords: PropTypes.number,
    minNbWords: PropTypes.number,
    maxNbWords: PropTypes.number,
    primaryColor: PropTypes.object,
    secondaryColor: PropTypes.object,
    light: PropTypes.bool
  }

  static defaultProps = {
    nbWords: 0,
    minNbWords: 0,
    light: false
  }

  render () {
    return (
      <div
        className='host'
        style={{
          color: this.props.light ? 'black' : 'white',
          backgroundColor: this.props.primaryColor
        }}
      >
        <div className='counter'>
          {this.props.nbWords}
        </div>
        <style jsx>
          {styles}
        </style>
      </div>
    )
  }
}

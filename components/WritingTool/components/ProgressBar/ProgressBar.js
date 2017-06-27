import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './ProgressBar.styles'

export default class WordCount extends Component {
  static propTypes = {
    nbWords: PropTypes.number,
    minNbWords: PropTypes.number,
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    light: PropTypes.bool
  }

  static defaultProps = {
    nbWords: 0,
    minNbWords: 0,
    primaryColor: '#34D9E0',
    secondaryColor: '#3CB6BA',
    light: false
  }

  render () {
    return (
      <div className='host' style={{
        color: this.props.light ? 'black' : 'white'
      }}>
        <div
          className='full-bar'
          style={{
            backgroundColor: this.props.primaryColor
          }}
        >
          <div
            className='progress'
            style={{
              backgroundColor: this.props.secondaryColor,
              width: `${this.props.progress}%`
            }}
          />

          <div className='counter'>
            {this.props.nbWords}
          </div>

          <div className='limit' style={{
          }}>
            {this.props.minNbWords}
          </div>
        </div>

        <style jsx>{styles}</style>
      </div>
    )
  }
}

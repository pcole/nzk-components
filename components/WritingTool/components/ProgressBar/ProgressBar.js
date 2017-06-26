import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './ProgressBar.styles'

export default class WordCount extends Component {
  static propTypes = {
    nbWords: PropTypes.number,
    minNbWords: PropTypes.number,
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string
  }

  static defaultProps = {
    nbWords: 0,
    minNbWords: 0,
    primaryColor: '#34D9E0',
    secondaryColor: '#3CB6BA'
  }

  render () {
    return (
      <div className='host' style={{}}>
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

          <div className='limit'>
            {this.props.minNbWords}
          </div>
        </div>

        <style jsx>{styles}</style>
      </div>
    )
  }
}

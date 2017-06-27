import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './ProgressBar.styles'
import cn from 'classnames'

export default class WordCount extends Component {
  static propTypes = {
    nbWords: PropTypes.number,
    minNbWords: PropTypes.number,
    maxNbWords: PropTypes.number,
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    light: PropTypes.bool,
    barType: PropTypes.oneOf(['bar', 'flag'])
  }

  static defaultProps = {
    nbWords: 0,
    minNbWords: 0,
    primaryColor: '#34D9E0',
    secondaryColor: '#3CB6BA',
    light: false,
    barType: 'bar'
  }

  render () {
    var minBarClassNames = cn({
      flag: this.props.barType === 'flag',
      bar: this.props.barType === 'bar',
      min: true
    })

    var maxBarClassNames = cn({
      flag: this.props.barType === 'flag',
      bar: this.props.barType === 'bar',
      max: true
    })

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

          <div className={minBarClassNames} />

          { this.props.maxNbWords ? <div className={maxBarClassNames} /> : null }

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

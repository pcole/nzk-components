import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './ProgressBar.styles'
import cn from 'classnames'
import {connect} from 'react-redux'

@connect(store => {
  return {
    nbWords: store.writing.nbWords,
    lastSaveTime: store.writing.lastSaveTime
  }
})
export default class ProgressBar extends Component {
  static propTypes = {
    nbWords: PropTypes.number,
    minNbWords: PropTypes.number,
    maxNbWords: PropTypes.number,
    primaryColor: PropTypes.object,
    secondaryColor: PropTypes.object,
    light: PropTypes.bool,
    barType: PropTypes.oneOf(['bar', 'flag'])
  }

  static defaultProps = {
    nbWords: 0,
    minNbWords: 0,
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

          { this.props.maxNbWords ? <div className={maxBarClassNames} /> : null }



          { this.props.maxNbWords ? <div className={maxBarClassNames} /> : null }

          { this.props.minNbWords ?  <div><div className={minBarClassNames} /><div className='limit' style={{
          }}>
            {this.props.minNbWords}
          </div></div> : null }

          { this.props.lastSaveTime
            ? <div style={{
            float: 'right',
            marginRight: '20px',
            lineHeight: '40px'
          }}>Last save: {new Date(this.props.lastSaveTime).getHours()}:
            {new Date(this.props.lastSaveTime).getMinutes()}:
            {new Date(this.props.lastSaveTime).getSeconds()}</div>
            : null }

        </div>

        <style jsx>{styles}</style>
      </div>
    )
  }
}

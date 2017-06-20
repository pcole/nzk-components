import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './WordCount.styles'

export default class WordCount extends Component {
  static propTypes = {
    nbWords: PropTypes.number,
    minNbWords: PropTypes.number
  }

  static defaultProps = {
    nbWords: 0,
    minNbWords: 0
  }

  render () {
    return (
      <div
        className='host'
        style={{
          width: '65px',
          textAlign: 'center',
          borderBottomWidth: '2px',
          borderBottomStyle: 'solid',
          borderBottomColor: this.props.nbWords < this.props.minNbWords
            ? 'red'
            : 'green'
        }}
      >
        {this.props.nbWords} / {this.props.minNbWords}
        <style jsx>{styles}</style>
      </div>
    )
  }
}

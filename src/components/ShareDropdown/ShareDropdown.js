import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon/Icon'
import styles from './ShareDropdown.styles'

export default class ShareDropdown extends Component {
  static propTypes = {
    shareLink: PropTypes.string,
    position: PropTypes.string,
    bgColor: PropTypes.string,
    color: PropTypes.string
  }

  static defaultProps = {
    position: 'right',
    bgColor: '#eee',
    color: '#555'
  }

  render () {
    const { shareLink, position, bgColor, color } = this.props

    const hostStyle = {
      backgroundColor: bgColor,
      color: color
    }

    var style
    switch (position) {
      case 'right': {
        style = { right: '-20px', borderBottom: '25px solid ' + bgColor }
        break
      }
      case 'left': {
        style = { left: '-20px', borderBottom: '25px solid ' + bgColor }
        break
      }
      case 'middle': {
        style = { right: '90px', borderBottom: '25px solid ' + bgColor }
        break
      }
    }

    return (
      <div className='host' style={hostStyle}>
        <div className='drop attached-top'>
          <div className='arrow attached-top' style={style} />
          <div className='drop-content'>
            <h4>Share this with</h4>
            <ul>
              <li>
                <a
                  href={
                    'http://www.facebook.com/sharer/sharer.php?u=' + shareLink
                  }
                  target='_blank'
                >
                  <Icon name='facebook' color='#323091' /> Facebook
                </a>
              </li>
              <li>
                <a
                  href={
                    'http://twitter.com/share?url=' +
                    shareLink +
                    ';via=nightzookeeper'
                  }
                  target='_blank'
                >
                  <Icon name='twitter' color='#3BABE6' /> Twitter
                </a>
              </li>
            </ul>
            <p>
              Copy this link
              <input
                type='text'
                value={shareLink}
                onFocus={e => e.target.select()}
              />
            </p>
            <h4>Follow us on</h4>
            <a href='http://facebook.com/nightzookeeper' target='_blank'>
              <Icon name='facebook' color='#323091' />
            </a>
            <a href='https://twitter.com/nightzookeeper' target='_blank'>
              <Icon name='twitter' color='#3BABE6' />
            </a>
            <a href='https://www.pinterest.com/nightzookeeper/' target='_blank'>
              <Icon name='pinterest' color='#B60225' />
            </a>
          </div>
        </div>

        <style jsx>{styles}</style>
      </div>
    )
  }
}

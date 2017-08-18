import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Section from '../Section/Section'
import styles from './Sidebar.styles'

@connect(store => {
  return {
    prompt: store.prompt,
    sections: store.sections
  }
})
export default class Sidebar extends Component {
  static propTypes = {
    children: PropTypes.any,
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    textColor: PropTypes.string,
    prompt: PropTypes.object,
    sections: PropTypes.array
  }

  componentDidMount () {
    var scrolling = false
    this.host.addEventListener('touchstart', e => {
      // Only execute the below code once at a time
      if (!scrolling) {
        scrolling = true
        if (e.currentTarget.scrollTop === 0) {
          e.currentTarget.scrollTop = 1
        } else if (
          e.currentTarget.scrollHeight ===
          e.currentTarget.scrollTop + e.currentTarget.offsetHeight
        ) {
          e.currentTarget.scrollTop -= 1
        }
        scrolling = false
      }
      e.stopPropagation()
    })

    this.host.addEventListener('touchmove', function (e) {
      e.stopPropagation()
    })
  }

  hostRef (el) {
    this.host = el
  }

  render () {
    const hostStyle = {
      backgroundColor: this.props.primaryColor
    }

    return (
      <div className='host' ref={this.hostRef.bind(this)} style={hostStyle}>
        <div className='host-inner'>
          {this.renderPrompt()}
          {this.props.sections.map((section, index) => {
            return (
              <Section
                key={index}
                index={index}
                bgColor={this.props.secondaryColor}
                textColor={this.props.textColor}
              />
            )
          })}

          <div className='bottom-gradient' />
        </div>
        <style jsx>
          {styles}
        </style>
      </div>
    )
  }

  renderPrompt () {
    const { icon, title, image, description } = this.props.prompt
    const colorStyle = {
      color: this.props.textColor
    }

    return (
      <div className='prompt' style={colorStyle}>
        <div className='prompt-header'>
          <div
            className='prompt-icon'
            style={{ backgroundImage: `url("${icon}")` }}
          />
          <div className='prompt-title'>
            {title}
          </div>
        </div>

        {(image || description) &&
          <div className='prompt-content'>
            {this.props.prompt.image &&
              <div
                className='prompt-image'
                style={{ backgroundImage: `url("${image}")` }}
              />}

            {this.props.prompt.description &&
              <div className='prompt-description'>
                {this.props.prompt.description}
              </div>}
          </div>}
        <style jsx>
          {styles}
        </style>
      </div>
    )
  }
}

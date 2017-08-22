import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Section from '../Section/Section'
import styles from './Sidebar.styles'

export class PromptContainer extends React.Component {
  static propTypes = {
    description: PropTypes.string,
    image: PropTypes.string,
    content: PropTypes.string,
    onImageClick: PropTypes.func
  }

  static defaultProps = {
    onImageClick: () => {}
  }

  constructor (props) {
    super(props)
    this.maxLength = props.image ? 130 : 280
    let content = props.description

    if (content.length > this.maxLength) {
      content = content
        .substring(0, this.maxLength)
        .split(' ')
        .filter(word => {
          return word !== ''
        })
        .join(' ')
      content += '... '
    }

    this.state = {
      content: content
    }
  }

  readMore () {
    this.setState({
      content:
        this.state.content.length > this.props.description.length - 3
          ? this.props.description
              .substring(0, this.maxLength)
              .split(' ')
              .filter(word => {
                return word !== ''
              })
              .join(' ') + '... '
          : this.props.description + ' '
    })
  }

  render () {
    return (
      <div className='prompt-content'>
        <p className='prompt-description'>
          {this.props.image &&
            <span
              className={`prompt-image ${this.props.description ? '' : 'full'}`}
              style={{ backgroundImage: `url("${this.props.image}")` }}
              onClick={this.props.onImageClick}
            />}

          <span>
            {this.state.content}

            {this.props.description.length > this.maxLength &&
              <a className='read-more' onClick={this.readMore.bind(this)}>
                {this.state.content.length < this.props.description.length
                  ? <span className='read-more'>Read&nbsp;more</span>
                  : <span className='read-less'>Read&nbsp;less</span>}
              </a>}
          </span>
        </p>

        <style jsx>
          {styles}
        </style>
      </div>
    )
  }
}

@connect(store => {
  return {
    prompt: store.prompt,
    sections: store.sections
  }
})
export default class Sidebar extends Component {
  static propTypes = {
    children: PropTypes.any,
    primaryColor: PropTypes.any,
    secondaryColor: PropTypes.any,
    textColor: PropTypes.any,
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

  /**
   * FOR PHIL, PromptContainer callback!
   */
  onPromptImageClicked () {
    console.log('Image clicked!')
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
          <PromptContainer
            {...this.props.prompt}
            onImageClick={this.onPromptImageClicked}
          />}

        <style jsx>
          {styles}
        </style>
      </div>
    )
  }
}

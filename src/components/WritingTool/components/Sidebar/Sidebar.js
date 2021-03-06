import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'
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

    this.maxLength = props.image ? 80 : 280

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

    if (this.props.image) {
      const image = new window.Image()
      image.onload = () => {
        this.setState({ image })
      }
      image.src = this.props.image
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
    const imageClassName = this.state.image
      ? cn({
        'prompt-image': true,
        full: !this.props.description,
        portrait: this.state.image.width < this.state.image.height
      })
      : ''

    return (
      <div className='prompt-content'>
        <p className='prompt-description'>
          {this.props.image && (
            <img
              src={this.props.image}
              className={imageClassName}
              onClick={this.props.onImageClick}
            />
          )}

          <span>
            {this.state.content}

            {this.props.description.length > this.maxLength && (
              <a className='read-more' onClick={this.readMore.bind(this)}>
                {this.state.content.length < this.props.description.length && (
                  <span className='read-more'>Read&nbsp;more</span>
                )}
              </a>
            )}
          </span>
        </p>

        <style jsx>{styles}</style>
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
    }, {passive: true})

    this.host.addEventListener('touchmove', function (e) {
      e.stopPropagation()
    }, {passive: true})
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
          <div className='sections'>
            {this.props.sections.map((section, index) => {
              return (
                <div key={index} className='section-container'>
                  <Section
                    key={index}
                    index={index}
                    bgColor={this.props.secondaryColor}
                    textColor={this.props.textColor}
                  />
                </div>
              )
            })}
          </div>

          <div className='bottom-gradient' />
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }

  onPromptImageClicked () {
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
          <div className='prompt-title' dangerouslySetInnerHTML={{__html:title}} />
        </div>

        {(image || description) && (
          <PromptContainer
            {...this.props.prompt}
            onImageClick={this.onPromptImageClicked}
          />
        )}

        <style jsx>{styles}</style>
      </div>
    )
  }
}

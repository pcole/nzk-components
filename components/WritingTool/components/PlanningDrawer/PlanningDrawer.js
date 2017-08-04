import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styles from './PlanningDrawer.styles'
import cn from 'classnames'
import Fields from '../Fields/Fields'
import {connect} from 'react-redux'
import {savePlanningLocalStorage} from '../../store/actions/planningActions'
import throttle from 'lodash/throttle'
import {FormattedMessage as T} from 'react-intl'

@connect(store => {
  return {
    description: store.planning.informations.description,
    image: store.planning.informations.image,
    fields: store.planning.fields,
    lastSave: store.planning.lastSave,
    title: store.planning.title,
    icon: store.planning.icon,
    titled: store.planning.needsTitle
  }
})
export default class PlanningDrawer extends Component {
  static propTypes = {
    children: PropTypes.any,
    step: PropTypes.number,
    primaryColor: PropTypes.object,
    secondaryColor: PropTypes.object,
    light: PropTypes.bool,
    preset: PropTypes.string,
    customPreset: PropTypes.any,
    image: PropTypes.string,
    description: PropTypes.string
  }

  static defaultProps = {
    light: false
  }

  constructor (props) {
    super(props)
    this.state = {
      step: 1
    }
    this.throttledSave = throttle(this.save, 3000)
  }

  componentDidMount () {

    var scrolling = false
    document.getElementsByClassName('drawer')[0].addEventListener('touchstart', function (e) {
      // Only execute the below code once at a time
      if (!scrolling) {
        scrolling = true
        if (e.currentTarget.scrollTop === 0) {
          e.currentTarget.scrollTop = 1
        } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
          e.currentTarget.scrollTop -= 1
        }
        scrolling = false
      }
      e.stopPropagation()

    })

    document.getElementsByClassName('drawer')[0].addEventListener('touchmove', function(e) {
      e.stopPropagation()
    })

  }

  nextStep () {
    if (this.state.step < 2) {
      var nextStep = (this.state.step + 1) % 3
      if (nextStep === 0) {
        nextStep += 1
      }

      if (this.props.onStep) {
        this.props.onStep(nextStep)
      }

      this.setState({step: nextStep})
    }
  }

  previousStep () {
    if (this.state.step > 1) {
      var nextStep = (this.state.step - 1) % 3
      if (nextStep === 0) {
        nextStep = 2
      }
      if (this.props.onStep) {
        this.props.onStep(nextStep)
      }

      this.setState({step: nextStep})
    }
  }

  save () {
    if (this.props.lastSave > 3) {
      this.props.dispatch(savePlanningLocalStorage())
    }
  }

  onChange () {
    this.throttledSave()
  }

  renderStoryDesc () {
    return (
      <div className='story-desc'>
        <div className='title'>
          <div
            className='icon'
            style={{
              height: '40px',
              width: '40px',
              position: 'absolute',
              backgroundImage: 'url("' + this.props.icon + '")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          />
          <div className='plan-title' style={{
            color: this.props.light ? 'black' : 'white'
          }}>
            Plan your {this.props.title}
          </div>
        </div>

        { this.props.image || this.props.description

          ? <div className='informations'>

            { this.props.image
              ? <div
                className='image'
                style={{
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                  backgroundImage: 'url("' + this.props.image + '")',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              : null }

            { this.props.description
              ? <div className='description' style={{
                color: this.props.light ? 'black' : 'white'
              }}>
                {this.props.description}
              </div>
              : null }

          </div>
          : null
        }
        <style jsx>{styles}</style>
      </div>
    )
  }

  renderFields () {
    this.props.fields.map((field, index) => {
      return field
    })
  }

  render () {
    const {primaryColor} = this.props

    const style = {
      backgroundColor: primaryColor
    }

    var classNames = cn({
      drawer: true
    })

    var hostClassNames = cn({
      host: true
    })

    return (
      <div name='host' className={hostClassNames}>

        <div name='drawer' className={classNames} style={style}>

          {this.renderStoryDesc()}
          {this.props.fields.map((field, index) => {
            return (
              <Fields
                key={index}
                index={index}
                elements={field.type}
                instruction={field.title}
                nbFields={field.nbFields}
                nbPerRow={field.nbFieldsPerRow}
                removeable={field.removeable}
                overloadable={field.overloadable}
                primaryColor={this.props.primaryColor}
                secondaryColor={this.props.secondaryColor}
                light={this.props.light}
                onChange={this.onChange.bind(this)}
              />
            )
          })}

          <div className='bottom-gradient' style={{
            position: 'fixed',
            bottom: '40px',
            left: '0',
            height: '20px',
            width: '100%',
            background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)`
          }}/>
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }
}

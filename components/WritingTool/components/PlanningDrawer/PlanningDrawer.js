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
              background: 'url("' + this.props.icon + '")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          />
          <div className='plan-title' style={{
            color: this.props.light ? 'black' : 'white'
          }}>
            <T id='plan-your' defaultMessage='Plan your' /> {this.props.title}
          </div>
        </div>
        <div className='informations'>
          <div
            className='image'
            style={{
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundImage: 'url("' + this.props.image + '")',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div className='description' style={{
            color: this.props.light ? 'black' : 'white'
          }}>
            {this.props.description}
          </div>
        </div>
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

        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }
}

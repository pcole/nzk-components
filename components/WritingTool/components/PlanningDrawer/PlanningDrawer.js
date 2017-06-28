import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styles from './PlanningDrawer.styles'
import cn from 'classnames'
import Icon from '../../../Icon/Icon'
import Fields from '../Fields/Fields'
import {connect} from 'react-redux'
import GSAP from 'react-gsap-enhancer'
/* import { TimelineMax } from 'gsap' */
import {savePlanningLocalStorage} from '../../store/actions/planningActions'

@connect(store => {
  return {
    description: store.planning.informations.description,
    image: store.planning.informations.image,
    fields: store.planning.fields,
    lastSave: store.planning.lastSave,
    title: store.planning.title,
    icon: store.planning.icon
  }
})
@GSAP()
export default class PlanningDrawer extends Component {
  static propTypes = {
    children: PropTypes.any,
    step: PropTypes.number,
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    light: PropTypes.bool,
    preset: PropTypes.string,
    customPreset: PropTypes.any,
    image: PropTypes.string,
    description: PropTypes.string
  }

  static defaultProps = {
    primaryColor: '#34D9E0',
    secondaryColor: '#158186',
    light: false
  }

  constructor (props) {
    super(props)
    this.state = {
      step: 1
    }
  }

  componentDidMount () {
    /*
     this.props.dispatch({
     type: 'REMOVE_INPUT_FIELD',
     payload: {
     field: this.props.fields[4],
     index: 0
     }
     }) */
  }

  createAnim ({target}) {
    /* var drawer = target.find({name: 'drawer'})
     return new TimelineMax()
     .to(drawer, 1, {backgroundColor: 'black'}) */
  }

  nextStep () {
    // this.addAnimation(this.createAnim)
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

  onChange () {
    if (this.props.lastSave > 3) {
      this.props.dispatch(savePlanningLocalStorage())
    }
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
            Plan your {this.props.title}
          </div>
        </div>
        <div className='informations'>
          <div
            className='image'
            style={{
              background: 'url("' + this.props.image + '")',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
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
    const {primaryColor, secondaryColor, light} = this.props

    const style = {
      backgroundColor: primaryColor
    }

    const buttonsStyle = {
      backgroundColor: secondaryColor,
      borderColor: secondaryColor
    }

    var classNames = cn({
      drawer: true,
      step1: this.state.step === 1,
      step2: this.state.step === 2,
      step3: this.state.step === 3
    })

    var hostClassNames = cn({
      host: true,
      step1: this.state.step === 1,
      step2: this.state.step === 2,
      step3: this.state.step === 3
    })

    var rightButtonClassNames = cn({
      disabled: this.state.step === 1
    })

    var leftButtonClassNames = cn({
      disabled: this.state.step === 2
    })

    return (
      <div className={hostClassNames}>

        <div className='buttons' style={style}>
          {this.state.step === 1
            ? <div
              className={leftButtonClassNames}
              onClick={this.nextStep.bind(this)}
              style={buttonsStyle}
            >
              <Icon
                name='left'
                fontSize='25px'
                color={light ? 'black' : 'white'}
              />
            </div>
            : <div
              className={rightButtonClassNames}
              onClick={this.previousStep.bind(this)}
              style={buttonsStyle}
            >
              <Icon
                name='right'
                fontSize='25px'
                color={light ? 'black' : 'white'}
              />
            </div>}
        </div>

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

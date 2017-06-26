import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styles from './PlanningDrawer.styles'
import cn from 'classnames'
import Icon from '../../../Icon/Icon'
import settings from './settings.json'
import Fields from '../Fields/Fields'
import {connect} from 'react-redux'

/* @connect(store => {
  console.log(store)
  return {
    fields: store.fields
  }
}) */
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
    light: false,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS6-8X2D-cgAdpGQLQNBKJvAan9v3rsk-ksKEMb0fNlOE55KztEv-k8bEo'
  }

  constructor (props) {
    super(props)
    this.state = {
      step: 1,
      fields: []
    }
  }

  componentDidMount () {

    var fields = settings[this.props.preset].fields.map((field, index) => {
      return <Fields
        key={index}
        index={index}
        elements={field.type}
        instruction={field.title}
        nbFields={field.numberOfFields}
        nbPerRow={field.numberPerRow}
        removeable={field.removeable}
        overloadable={field.overloadable}
        primaryColor={this.props.primaryColor}
        secondaryColor={this.props.secondaryColor}
        light={this.props.light}
        onChange={this.onChange.bind(this)}
      />
    })

    this.setState({ fields: fields })
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

  onChange (field) {
    this.state.fields.indexOf(field)
    // console.log(field)
  }

  renderStoryDesc () {
    if (this.props.preset) {
      var title = settings[this.props.preset].title
      var icon = settings[this.props.preset].icon
      return (
        <div className="story-desc">
          <div className="title">
            <span className="icon" style={{
              background: 'url("' + icon + '")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'fit'
            }}></span>
            Plan your {title}
          </div>
          <div className="informations">
            <div className="image" style={{
              background: 'url("' + this.props.image + '")',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}>
            </div>
            <div className="description">
              {this.props.description}
            </div>
          </div>
          <style jsx>{styles}</style>
        </div>
      )
    }
  }

  renderFields () {
    this.state.fields.map((field, index) => {
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

        <div className={classNames} style={style}>

          {this.renderStoryDesc()}
          {this.state.fields.map((field) => {
            return field
          })}

        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Fields.styles'
import cn from 'classnames'
import Field from '../Field/Field'

export default class Fields extends Component {
  static propTypes = {
    instruction: PropTypes.string,
    color: PropTypes.string,
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    stacking: PropTypes.bool,
    nbFields: PropTypes.number,
    nbPerRow: PropTypes.number,
    overloadable: PropTypes.bool
  }

  static defaultProps = {
    stacking: true,
    nbFields: 3,
    nbPerRow: 2,
    overloadable: true,
    primaryColor: '#3CB6BA',
    secondaryColor: '#A5FCFF'
  }

  constructor (props) {
    super(props)
    this.state = {
      nbFields: props.nbFields,
      fields: [],
      fieldIndex: 0
    }
    this.addField = this.addField.bind(this)
    this.removeField = this.removeField.bind(this)
  }

  componentDidMount () {
    /*
     [...Array(this.state.nbFields)].map((elem, i) => {
     this.addField()
     }) */
  }

  onFieldChange (event, field) {
    var fields = this.state.fields.slice()
    fields[this.state.fields.indexOf(field)].data = event.target.value
    this.setState({ fields: fields })
    console.log(fields)
  }

  /*
   addField () {
   var fields = this.state.fields.slice()

   var field = <Field key={this.state.fieldIndex} block bgColor={this.props.primaryColor} removeAction={() => {
   this.removeField(field) }} value={this.state.fields[this.state.fields.length - 1] ?
   this.state.fields[gthis.state.fields.length - 1].data : 'a'} onChange={(event) => { this.onFieldChange(event, field) }}/>

   fields.push({field: field, data: ''})

   this.setState(() => {
   return {
   nbFields: this.state.nbFields + 1,
   fields: fields,
   fieldIndex: this.state.fieldIndex + 1
   }
   })
   } */

  addField () {
    this.setState(() => {
      return {
        nbFields: this.state.nbFields + 1
      }
    })
  }

  removeField (field) {
    if (field) {
      var fields = Array.from(this.state.fields)
      fields.splice(fields.indexOf(field), 1)

      this.setState({ fields: fields })
    }
  }

  render () {
    const {
      instruction,
      stacking,
      nbPerRow,
      overloadable,
      secondaryColor
    } = this.props

    const style = {}

    const className = cn({})

    const stackingClass = cn({
      stacking: stacking
    })

    return (
      <div className={className}>
        <h3
          style={{
            color: this.props.light ? 'black' : 'white'
          }}
        >
          {instruction}
        </h3>
        <ul className={stackingClass}>

          {[...Array(this.state.nbFields)].map((elem, index) => {
            return (
              <li
                key={index}
                className={stackingClass}
                style={{
                  width: this.props.stacking
                    ? `calc(${100 / this.props.nbPerRow}% - 8px)`
                    : '100%'
                }}
              >
                <Field
                  key={this.state.fieldIndex}
                  block
                  bgColor={this.props.primaryColor}
                  removeable={this.props.removeable}
                />
              </li>
            )
          })}

          {overloadable
            ? <li
              className={stackingClass}
              style={{
                width: stacking ? `calc(${100 / nbPerRow}% - 8px)` : '100%'
              }}
              >
              <Field
                element='button'
                block
                bgColor={secondaryColor}
                onClick={this.addField}
                >
                  +
                </Field>
            </li>
            : null}

        </ul>

        <style jsx>{styles}</style>
      </div>
    )
  }
}

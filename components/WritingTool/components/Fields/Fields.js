import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styles from './Fields.styles'
import cn from 'classnames'
import Field from '../Field/Field'
import Icon from '../../../Icon/Icon'

export default class Fields extends Component {
  static propTypes = {
    instruction: PropTypes.string,
    key: PropTypes.any,
    color: PropTypes.string,
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    stacking: PropTypes.bool,
    elements: PropTypes.string,
    nbFields: PropTypes.number,
    nbPerRow: PropTypes.number,
    overloadable: PropTypes.bool,
    light: PropTypes.bool,
    onChange: PropTypes.func
  }

  static defaultProps = {
    stacking: true,
    nbFields: 3,
    nbPerRow: 2,
    elements: 'input',
    overloadable: true,
    primaryColor: '#3CB6BA',
    secondaryColor: '#A5FCFF',
    light: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      nbFields: props.nbFields,
      fields: [],
      fieldIndex: 0,
    }
    this.addField = this.addField.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  addField() {

    var newField = <Field
      key={Math.random() * 1000000000}
      block
      element={this.props.elements}
      bgColor={this.props.secondaryColor}
      removeable={this.props.removeable}
      stacking={this.props.stacking}
      onChange={this.onChange}
      width={
        this.props.stacking
          ? `calc(${100 / this.props.nbPerRow}% - 8px)`
          : '100%'
      }
      light={this.props.light}
    />

    var newFields = this.state.fields
    newFields.push(newField)

    this.setState(() => {
      return {
        nbFields: this.state.nbFields + 1,
        fields: newFields,
      }
    })
  }

  componentDidMount() {
    for (var i = 0; i < this.props.nbFields; i++) {
      this.addField()
    }
  }

  onChange(field, newValue) {
    //console.log(this.state.fields)
    //console.log(field)
    //console.log("Index: " + this.state.fields.indexOf(field))
    //console.log(this)
    this.props.onChange(this)
  }

  render() {
    const {
      instruction,
      stacking,
      nbPerRow,
      overloadable,
      secondaryColor,
    } = this.props

    const style = {}

    const className = cn({})

    const stackingClass = cn({
      stacking: stacking,
    })

    return (
      <div className={className}>
        <h3
          style={{
            color: this.props.light ? 'black' : 'white',
          }}
        >
          {instruction}
        </h3>
        <ul className={stackingClass}>

          {this.state.fields.map((elem, index) => {
            return elem
          })}

          {overloadable
            ? <li
              className={stackingClass}
              style={{
                width: stacking ? `calc(${100 / nbPerRow}% - 8px)` : '100%',
              }}
            >
              <Field
                element='button'
                block
                bgColor={secondaryColor}
                onClick={this.addField}
                light={this.props.light}
              >
                <Icon name='plus'/>
              </Field>
            </li>
            : null}

        </ul>

        <style jsx>{styles}</style>
      </div>
    )
  }
}

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styles from './Fields.styles'
import cn from 'classnames'
import Field from '../Field/Field'
import Icon from '../../../Icon/Icon'
import {connect} from 'react-redux'
import { addInput, fieldChanged, removeInput } from '../../store/actions/planningActions'

@connect((store) => {
  return {
    fields: store.planning.fields,
  }
})
export default class Fields extends Component {
  static propTypes = {
    instruction: PropTypes.string,
    key: PropTypes.any,
    index: PropTypes.number,
    color: PropTypes.string,
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    stacking: PropTypes.bool,
    elements: PropTypes.string,
    nbFields: PropTypes.number,
    nbPerRow: PropTypes.number,
    overloadable: PropTypes.bool,
    light: PropTypes.bool,
    onChange: PropTypes.func,
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
    this.props.dispatch(addInput.bind(this, this.props.index))
  }

  componentDidMount() {
    for (var i = 0; i < this.props.nbFields; i++) {
      this.addField()
    }
  }

  removeAction(input) {
    this.props.dispatch(removeInput(this.props.index, input))
  }

  onChange(field, newValue) {
    this.props.dispatch(fieldChanged(this.props.index, field, newValue))
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

          {this.props.fields[this.props.index].fields.map((elem, index) => {
            return <Field element={this.props.elements}
                          index={index}
                          block
                          bgColor={this.props.secondaryColor}
                          removeable={this.props.removeable}
                          stacking={this.props.stacking}
                          onChange={this.onChange}
                          value={this.props.fields[this.props.index].fields[index].value}
                          removeAction={this.removeAction.bind(this)}
                          width={
                            this.props.stacking
                              ? `calc(${100 / this.props.nbPerRow}% - 8px)`
                              : '100%'
                          }
                          light={this.props.light}/>
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
                onClick={() => this.props.dispatch(addInput(this.props.index))}
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

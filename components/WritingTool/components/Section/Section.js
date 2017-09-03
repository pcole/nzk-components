import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Field from '../Field/Field'
import Icon from '../../../Icon/Icon'
import Button from '../../../Button/Button'
import styles from './Section.styles'

import { addField, setFieldValue, removeField } from '../../store/actions'

@connect((store, ownProps) => {
  const section = store.sections[ownProps.index]
  return { ...section }
})
export default class Section extends Component {
  static propTypes = {
    index: PropTypes.number,
    title: PropTypes.string,
    fields: PropTypes.array,
    userCanAddFields: PropTypes.bool,
    fieldsAreRemovable: PropTypes.bool,
    bgColor: PropTypes.object,
    textColor: PropTypes.string
  }

  state = {
    clientWidth: 385
  }

  onAdd () {
    this.props.dispatch(addField(this.props.index))
  }

  onRemove (index) {
    this.props.dispatch(removeField(this.props.index, index))
  }

  onChange (index, value) {
    this.props.dispatch(setFieldValue(this.props.index, index, value))
  }

  hostRef (el) {
    this.host = el
  }

  componentDidMount () {
    this.setState({
      clientWidth: this.host.clientWidth
    })
  }

  render () {
    const hostStyle = {
      color: this.props.textColor
    }

    return (
      <div className='host' ref={this.hostRef.bind(this)} style={hostStyle}>
        <h3>{this.props.title}</h3>
        <ul className='fields'>
          {this.props.fields.map((elem, index) => {
            return (
              <Field
                key={index}
                index={index}
                type={this.props.fieldType}
                value={elem.value}
                removable={this.props.fieldsAreRemovable}
                bgColor={this.props.bgColor}
                textColor={this.props.textColor}
                onChange={this.onChange.bind(this)}
                onRemove={this.onRemove.bind(this)}
                parentClientWidth={this.state.clientWidth}
              />
            )
          })}

          {this.props.userCanAddFields && (
            <li className='add-container'>
              <Button
                onClick={this.onAdd.bind(this)}
                bgColor={this.props.bgColor}
                color={this.props.textColor}
                shadow
                height='37px'
                width='183px'
              >
                <Icon name='plus' />
              </Button>
            </li>
          )}
        </ul>

        <style jsx>{styles}</style>
      </div>
    )
  }
}

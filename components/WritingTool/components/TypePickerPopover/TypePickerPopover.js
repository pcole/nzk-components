import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './TypePickerPopover.styles'

export default class TypePickerPopover extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dismissed: false
    }
  }

  static propTypes = {
  }

  static defaultProps = {

  }

  dismiss() {
    this.setState({
      dismissed: true
    })
  }

  pick(type) {
    this.props.pick(type)
    this.dismiss()
  }

  render () {


    const types = ['story', 'poetry', 'news', 'letter', 'opinion', 'instructions']

    if (!this.state.dismissed || this.state.dismissed) {  // Disabled TypePickerPopover
      return null
    } else {
      return <div className='host' onClick={this.dismiss.bind(this)}>

        <div className='container'>
          <div className='title'>
            Pick your writing type
          </div>
          <div className='picker' onClick={(e) => {e.stopPropagation()}}>

            { types.map((type, i) => {
              return (
                <div key={i} className={`button ${type}`} onClick={() => {this.pick(type)}}/>
              )}
            )}
          </div>
        </div>


        <style jsx>{styles}</style>
      </div>
    }
  }
}

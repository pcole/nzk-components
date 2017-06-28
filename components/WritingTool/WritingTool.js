/**
 * Created by benjaminafonso on 20/06/2017.
 */

import React, {Component} from 'react'
import styles from './WritingTool.styles'
import Writer from './components/Writer/Writer'
import PlanningDrawer from './components/PlanningDrawer/PlanningDrawer'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import store from './store/store'
import {usePreset, setInformations} from './store/actions/planningActions'
export default class WritingTool extends Component {
  static propTypes = {
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    light: PropTypes.bool
  }

  componentWillMount () {
    if (!(store.getState().planning.fields.length > 0)) {
      usePreset(store.dispatch, 'story')
      store.dispatch(setInformations('https://oldassets.smarta.com/3253268/night%20zoo%20keeper.jpg',
        'Cupcake ipsum dolor sit amet fruitcake gummi bears. Liquorice chocolate dessert toffee.'))
    }
  }

  onStep (n) {
    var leftWidth = document.getElementsByClassName('left')[0].style.width
    var rightWidth = document.getElementsByClassName('right')[0].style.width
    switch (n) {
      case 1:
        if (window.innerWidth > 1024) {
          leftWidth = 'calc(100% - 430px)'
          rightWidth = '430px'
        } else {
          leftWidth = 'calc(100vw - 150px)'
          rightWidth = '150px'
        }
        break
      case 2:
        leftWidth = '50%'
        rightWidth = '50%'
        break
    }
    document.getElementsByClassName('right')[0].style.width = rightWidth
    document.getElementsByClassName('left')[0].style.width = leftWidth
  }

  render () {
    return (
      <Provider store={store}>

        <div className='host'>
          <div className='background' style={{
            background: 'url("' + 'http://i.imgur.com/N82wzhY.png' + '")'
          }} />
          <div className='column left'>
            { store.getState().planning.needsTitle
              ? <input className='title-bar' type='text' placeholder='Enter your title here...' />
              : null }
            <Writer
              primaryColor={this.props.primaryColor}
              secondaryColor={this.props.secondaryColor}
              light={this.props.light}
              minNbWords={20}
            />
          </div>
          <div className='column right'>
            <PlanningDrawer
              onStep={this.onStep}
              primaryColor={this.props.primaryColor}
              secondaryColor={this.props.secondaryColor}
              light={this.props.light}
            />

          </div>

          <style jsx>{styles}</style>
        </div>
      </Provider>
    )
  }
}

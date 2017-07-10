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
import {usePreset, setInformations, loadPlanningLocalstorage} from './store/actions/planningActions'
import {IntlProvider} from 'react-intl'
import * as Vibrant from 'node-vibrant'
import GSAP from 'react-gsap-enhancer'
import {TimelineMax, Elastic} from 'gsap'
import Icon from '../Icon/Icon'
import cn from 'classnames'
import Color from 'color'

@GSAP()
export default class WritingTool extends Component {
  static propTypes = {
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    light: PropTypes.bool,
    backgroundImageUrl: PropTypes.string
  }

  static defaultProps = {
    backgroundImageUrl: '/assets/welcome-bg.jpg'
  }

  state = {
    step: 1,
    planningExpanded: true,
    primaryColor: undefined,
    secondaryColor: undefined,
    image: undefined,
    light: false
  }

  componentWillMount () {
    if (!(store.getState().planning.fields.length > 0)) {
      usePreset(store.dispatch, 'story')
      store.dispatch(setInformations('https://az801952.vo.msecnd.net/uploads/f1003e55-127d-42de-a49e-82a10d80b5f1.jpg',
        'Cupcake ipsum dolor sit amet fruitcake gummi bears. Liquorice chocolate dessert toffee.'))
    }

    window.addEventListener('resize', this.onResize.bind(this))
  }

  getColorsFromBackground () {
    const images = [
      '/assets/angry-alligator-creek-back.jpg',
      '/assets/arctic-wanderlust-back.jpg',
      '/assets/doomed-sea-back.jpg',
      '/assets/lava-tunnel-back.jpg',
      '/assets/lesson-hive.jpg',
      '/assets/temple.jpg',
      '/assets/welcome-bg.jpg',
      '/assets/what-why-where-woods-back.jpg',
      '/assets/ac7ywy8tv3qf3quimykx.jpg',
      '/assets/aa7ellrkrwfyljjnryne.jpg',
      '/assets/papbnwocavrkia6fai0n.jpg',
      '/assets/hhzgyh7bgdbhtbu8rpzs.jpg',
      '/assets/fqutf1jckgysqaivhgpq.jpg'
    ]
    var pickedImage = images[Math.floor(Math.random() * (images.length - 1))]
    Vibrant.from(pickedImage).getPalette((err, palette) => {
      if (err) {
        return
      }

      var primaryColor = new Color(palette.Vibrant.getRgb())
      primaryColor.fade(0.5)

      var light
      var secondaryColor = new Color(palette.Vibrant.getRgb())
      if (primaryColor.light()) {
        light = true
        secondaryColor = secondaryColor.darken(0.2)
      } else {
        light = false
        secondaryColor = secondaryColor.lighten(0.2)
      }

      this.setState({
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
        image: pickedImage,
        light: light
      })
    })
  }

  componentDidMount () {
    this.getColorsFromBackground()

    if (window.localStorage.getItem('nzk-planning')) {
      loadPlanningLocalstorage(store.dispatch)
    }
  }

  onResize (e) {
    if (e.target.window.innerWidth > 1280) {
      this.setState({planningExpanded: true})
      this.addAnimation(this.expandDrawerAnimation.bind(this))
    }
  }

  expandDrawerAnimation ({target}) {
    var left = target.find({name: 'leftCol'})
    var right = target.find({name: 'rightCol'})

    if (!this.state.planningExpanded) {
      return new TimelineMax()
        .to(left, 0.5, {className: '-=planningExpanded'}, 0)
        .to(right, 0.5, {className: '-=planningExpanded'}, 0)
    } else {
      return new TimelineMax()
        .to(left, 0, {position: 'absolute'}, 0)
        .to(left, 1, {ease: Elastic.easeOut.config(1, 0.4), className: '+=planningExpanded'}, 0)
        .to(right, 1, {ease: Elastic.easeOut.config(1, 0.4), className: '+=planningExpanded'}, 0)
        .to(left, 0, {position: 'relative'})
    }
  }

  toggleExpand () {
    this.addAnimation(this.expandDrawerAnimation.bind(this))
    this.setState({planningExpanded: !this.state.planningExpanded})
  }

  render () {
    var buttonsClassNames = cn({
      withTitle: store.getState().planning.needsTitle,
      withoutTitle: !store.getState().planning.needsTitle,
      buttons: true
    })

    var buttonBackgroundClassNames = cn({
      withTitle: store.getState().planning.needsTitle,
      withoutTitle: !store.getState().planning.needsTitle,
      buttonBackground: true
    })

    const buttonsStyle = {
      backgroundColor: this.state.secondaryColor,
      borderColor: this.state.secondaryColor
    }

    console.log(store)
    return (
      <IntlProvider locale='en'>
        <Provider store={store}>

          <div className='host'>

            <div className='background' style={{
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundImage: 'url("' + this.state.image + '")'
            }} />

            <div className='column left planningExpanded' name='leftCol'>
              <Writer
                primaryColor={this.state.primaryColor}
                secondaryColor={this.state.secondaryColor}
                light={this.state.light}
                minNbWords={20}
              />
            </div>

            <div className='column right planningExpanded' name='rightCol'>

              <div className={buttonBackgroundClassNames} style={{
                backgroundColor: this.state.primaryColor
              }} />

              <div className={buttonsClassNames}>
                <div
                  onClick={this.toggleExpand.bind(this)}
                  style={buttonsStyle}
                >
                  <Icon
                    name={this.state.planningExpanded ? 'right' : 'left'}
                    fontSize='25px'
                    color={this.state.light ? 'black' : 'white'}
                  />

                </div>
              </div>

              <PlanningDrawer
                primaryColor={this.state.primaryColor}
                secondaryColor={this.state.secondaryColor}
                light={this.state.light}
              />

            </div>

            <style jsx>{styles}</style>
          </div>
        </Provider>
      </IntlProvider>
    )
  }
}

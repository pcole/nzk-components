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
import {IntlProvider, FormattedMessage as T} from 'react-intl'
import * as Vibrant from 'node-vibrant'
import GSAP from 'react-gsap-enhancer'
import {TimelineMax, Elastic} from 'gsap'
import Icon from '../Icon/Icon'
import cn from 'classnames'

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
    primaryColor: 'rgba(0,0,0,0)',
    secondaryColor: 'rgba(0,0,0,0)',
    image: undefined
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

      var hsl = palette.Vibrant.getHsl()
      hsl = hsl.map((col, index) => {
        return index > 0 ? `${('' + (col * 100)).split('.')[0]}%` : `${('' + (col * 360)).split('.')[0]}`
      })

      hsl.push(0.85)

      var color = `hsla(${hsl.join(',')})`
      var primaryColor = color
      var secondaryColor = hsl.slice()

      var darker = true

      if (darker) {
        secondaryColor[2] = (parseInt(secondaryColor[2]) - 20) + '%'
      } else {
        secondaryColor[2] = (parseInt(secondaryColor[2]) + 20) + '%'
      }
      secondaryColor = `hsla(${secondaryColor.join(',')})`

      this.setState({
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
        image: pickedImage
      })
    })
  }

  componentDidMount () {
    this.getColorsFromBackground()
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
              { store.getState().planning.needsTitle
                ? <div onClick={this.toggleExpand.bind(this)}>

                  <T id='enter_title' defaultMessage='Enter your title here'>
                    {
                      (msg) => <input className='title-bar' type='text' placeholder={msg} style={{
                        color: this.props.light ? 'black' : 'white'
                      }} />
                    }
                  </T>

                </div>
                : null }
              <Writer
                primaryColor={this.state.primaryColor}
                secondaryColor={this.state.secondaryColor}
                light={this.props.light}
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
                    color={this.props.light ? 'black' : 'white'}
                  />

                </div>
              </div>

              <PlanningDrawer
                primaryColor={this.state.primaryColor}
                secondaryColor={this.state.secondaryColor}
                light={this.props.light}
              />

            </div>

            <style jsx>{styles}</style>
          </div>
        </Provider>
      </IntlProvider>
    )
  }
}

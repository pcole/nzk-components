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
import {usePreset, setInformations, loadPlanningLocalstorage, useCustomPreset, clearPlanning} from './store/actions/planningActions'
import {clearWriting} from './store/actions/writingActions'

import {IntlProvider} from 'react-intl'
import * as Vibrant from 'node-vibrant'
import GSAP from 'react-gsap-enhancer'
import {TimelineMax, Bounce} from 'gsap'
import Icon from '../Icon/Icon'
import cn from 'classnames'
import Color from 'color'
import ProgressBar from './components/ProgressBar/ProgressBar'
import TypePickerPopover from './components/TypePickerPopover/TypePickerPopover'

@GSAP()
export default class WritingTool extends Component {
  static propTypes = {
    image: PropTypes.string,
    planning: PropTypes.any,
    type: PropTypes.oneOf(['story', 'poetry', 'explanation',
      'instructions', 'opinion', 'news', 'letter', 'diary',
      'playscript', 'recount', 'biography', 'report, freewrite', 'custom']),
    customType: PropTypes.shape({
      title: PropTypes.string,
      icon: PropTypes.string,
      needsTitle: PropTypes.bool,
      fields: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        type: PropTypes.oneOf(['input', 'textarea']),
        numberOfFields: PropTypes.number,
        numberPerRow: PropTypes.number,
        overloadable: PropTypes.bool,
        removeable: PropTypes.bool,
        fields: PropTypes.arrayOf(PropTypes.string)
      }))
    }),
    writingImage: PropTypes.string,
    writingDescription: PropTypes.string,
    backCallback: PropTypes.func,
    hideImageButton: PropTypes.bool,
    hideTextStyleButtons: PropTypes.bool,
    hideAlignButtons: PropTypes.bool
  }

  static defaultProps = {
    writingImage: 'https://az801952.vo.msecnd.net/uploads/f1003e55-127d-42de-a49e-82a10d80b5f1.jpg',
    writingDescription: 'Cupcake ipsum dolor sit amet fruitcake gummi bears. Liquorice chocolate dessert toffee.'
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

      window.usePreset = (preset) => { usePreset(store.dispatch, preset) }
      if (this.props.type === 'custom' || this.props.customType) {
        useCustomPreset(store.dispatch, this.props.customType)
      } else {
        usePreset(store.dispatch, this.props.type)
      }

      store.dispatch(setInformations(this.props.writingImage,
        this.props.writingDescription))
    }

    window.addEventListener('resize', this.onResize.bind(this))
  }

  getColorsFromBackground () {



    if (this.props.image) {
      var pickedImage = this.props.image
    } else {
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
    }

    // CACHED BACKGROUND COLORS
    if (window.localStorage.getItem(`nzk-bg-${pickedImage}`)) {
      var cached = JSON.parse(window.localStorage.getItem(`nzk-bg-${pickedImage}`))

      var secondaryColor = new Color(cached.primaryColor.color)
      if (cached.light) {
        secondaryColor = secondaryColor.darken(0.2)
      } else {
        secondaryColor = secondaryColor.lighten(0.2)
      }

      this.setState({
        primaryColor: new Color(cached.primaryColor.color),
        secondaryColor: secondaryColor,
        image: cached.image,
        light: cached.light
      })
      return
    }

    // NOT CACHED BACKGROUND COLORS
    Vibrant.from(pickedImage).getPalette((err, palette) => {
      if (err) {
        return
      }

      var primaryColor = new Color(palette.Vibrant.getRgb())

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

      window.localStorage.setItem(`nzk-bg-${pickedImage}`, JSON.stringify({
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
        image: pickedImage,
        light: light
      }))
    })
  }

  componentDidMount () {
    this.getColorsFromBackground()

    if (window.localStorage.getItem('nzk-planning')) {
      loadPlanningLocalstorage(store.dispatch)
    }

    document.addEventListener('touchmove', function (e) {
      e.preventDefault()
    })

    document.getElementsByClassName('background')[0].addEventListener('touchmove', function (e) {
      e.preventDefault()
    })
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
      .to(left, 1, {ease: Bounce.easeOut, className: '-=planningExpanded'}, 0)
      .to(right, 1, {ease: Bounce.easeOut, className: '-=planningExpanded'}, 0)
    } else {
      return new TimelineMax()
      .to(left, 0, {position: 'absolute'}, 0)
      .to(left, 1.5, {ease: Bounce.easeOut, className: '+=planningExpanded'}, 0)
      .to(right, 1.5, {ease: Bounce.easeOut, className: '+=planningExpanded'}, 0)
      .to(left, 0, {position: 'relative'}, 1.5)
    }
  }

  toggleExpand () {
    this.addAnimation(this.expandDrawerAnimation.bind(this))
    this.setState({planningExpanded: !this.state.planningExpanded})
  }

  closeDrawer () {
    this.addAnimation(this.expandDrawerAnimation.bind(this))
    this.setState({planningExpanded: false})
  }

  pick (type) {
    const POSSIBLE_TYPES = ['story', 'poetry', 'letter', 'instructions', 'opinion', 'news',]
    if (POSSIBLE_TYPES.indexOf(type) < 0) {
      return
    }

    usePreset(store.dispatch, type)
  }

  clearPlanning() {
    window.localStorage.removeItem('nzk-planning')
    store.dispatch(clearPlanning())
  }

  clearWriting() {
    window.localStorage.removeItem('nzk-writing')
    store.dispatch(clearWriting())
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
        <Provider store={store}>

          <div className='host'>

            <TypePickerPopover pick={this.pick} />

            <div className='background' style={{
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundImage: 'url("' + this.state.image + '")'
            }}/>

            <div className='column left planningExpanded' name='leftCol'>
              <Writer
                primaryColor={this.state.primaryColor}
                secondaryColor={this.state.secondaryColor}
                light={this.state.light}
                minNbWords={this.props.minNbWords}
                onMobileFocus={this.closeDrawer.bind(this)}
                backCallback={this.props.backCallback}
                hideTextStyleButtons={this.props.hideTextStyleButtons}
                hideAlignButtons={this.props.hideAlignButtons}
                hideImageButton={this.props.hideImageButton}
                clearWriting={this.clearWriting}
                clearPlanning={this.clearPlanning}
              />
            </div>

            <div className='column right planningExpanded' name='rightCol'>

              <div className={buttonBackgroundClassNames} style={{
                backgroundColor: this.state.primaryColor
              }}/>

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


            <style jsx global>{`* { box-sizing: border-box; }`}</style>
            <style jsx>{styles}</style>

            <div className='progressBar'>
              <ProgressBar
                minNbWords={store.getState().writing.constraints.minNbWords}
                maxNbWords={store.getState().writing.constraints.maxNbWords}
                progress={store.getState().writing.progress}
                primaryColor={this.state.primaryColor}
                secondaryColor={this.state.secondaryColor}
                light={this.state.light}
              />
            </div>

          </div>
        </Provider>
    )
  }
}

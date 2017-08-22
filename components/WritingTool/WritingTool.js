import React, { Component } from 'react'
import { Provider } from 'react-redux'
import GSAP from 'react-gsap-enhancer'
import { TimelineMax, Bounce } from 'gsap'
import PropTypes from 'prop-types'
import Color from 'color'
import getColorFromImage from '../../util/getColorFromImage'
import Writer from './components/Writer/Writer'
import Sidebar from './components/Sidebar/Sidebar'
import Icon from '../Icon'
import Button from '../Button'
import StatusBar from './components/StatusBar/StatusBar'
import ConfirmModal from './components/ConfirmModal/ConfirmModal'
import styles from './WritingTool.styles'
import Store from './store/store'
import { init, clear } from './store/actions'
import Uploader from '../Uploader/Uploader'
const store = Store()

@GSAP()
export default class WritingTool extends Component {
  static propTypes = {
    lang: PropTypes.string,
    backgroundImage: PropTypes.string,
    writingType: PropTypes.string,
    placeholders: PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string
    }),
    writing: PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string
    }),
    constraints: PropTypes.shape({
      minWords: PropTypes.number,
      maxWords: PropTypes.number
    }),
    prompt: PropTypes.shape({
      icon: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string
    }),
    loadPresetSections: PropTypes.bool,
    sections: PropTypes.shape({
      prepend: PropTypes.bool,
      title: PropTypes.string,
      component: PropTypes.node,
      fieldType: PropTypes.oneOf(['input', 'textarea']),
      numberOfFields: PropTypes.number,
      userCanAddFields: PropTypes.bool,
      fieldsAreRemovable: PropTypes.bool
    }),
    onBack: PropTypes.func,
    onSave: PropTypes.func,
    hideImageButton: PropTypes.bool,
    hideTextStyleButtons: PropTypes.bool,
    hideAlignButtons: PropTypes.bool,
    hideClearButton: PropTypes.bool
  }

  static defaultProps = {
    lang: 'en',
    hideClearButton: true,
    backgroundImage: '/assets/temple.jpg'
  }

  state = {
    sidebarOpen: true,
    primaryColor: undefined,
    secondaryColor: undefined,
    textColor: undefined,
    modal: undefined,
    imagePopoverDisplayed: false
  }

  componentWillMount () {
    store.dispatch(
      init(store.dispatch, {
        lang: this.props.lang,
        writingType: this.props.writingType,
        placeholders: this.props.placeholders,
        writing: this.props.writing,
        constraints: this.props.constraints,
        prompt: this.props.prompt,
        sections: this.props.sections,
        loadPresetSections: this.props.loadPresetSections
      })
    )

    window.addEventListener('resize', this.onResize.bind(this))
  }

  setColorsFromBackgroundImage () {
    getColorFromImage(this.props.backgroundImage, (err, color) => {
      if (err) {
        return
      }

      let primaryColor = new Color(color)
      let light = primaryColor.light()
      let secondaryColor = light
        ? primaryColor.darken(0.3)
        : primaryColor.lighten(0.3)

      this.setState({
        primaryColor,
        primaryFadedColor: primaryColor.fade(0.3),
        secondaryColor,
        textColor: light ? 'black' : 'white',
        light
      })
    })
  }

  componentDidMount () {
    this.setColorsFromBackgroundImage()

    document.addEventListener('touchmove', function (e) {
      e.preventDefault()
    })

    document
      .getElementsByClassName('host')[0]
      .addEventListener('touchmove', function (e) {
        e.preventDefault()
      })

    document
      .getElementsByClassName('background')[0]
      .addEventListener('touchmove', function (e) {
        e.preventDefault()
      })
  }

  displayModal (message, onConfirm, onCancel, confirmMessage, cancelMessage) {
    this.setState({
      modal: (
        <ConfirmModal
          message={message}
          onConfirm={onConfirm}
          onCancel={onCancel}
          confirmText={confirmMessage}
          cancelText={cancelMessage}
        />
      )
    })
  }

  dismissModal () {
    this.setState({
      modal: null
    })
  }

  onResize (e) {
    if (e.target.window.innerWidth > 1280) {
      this.setState({ sidebarOpen: true })
      this.addAnimation(this.toggleSidebarAnimation.bind(this))
    }
  }

  onClear () {
    store.dispatch(clear)
  }

  toggleSidebarAnimation ({ target }) {
    var left = target.find({ name: 'leftCol' })
    var right = target.find({ name: 'rightCol' })

    if (!this.state.sidebarOpen) {
      return new TimelineMax()
        .to(left, 1, { ease: Bounce.easeOut,
          width: 'calc(100vw - 20px)'
        }, 0)
        .to(right, 1, { ease: Bounce.easeOut,
          width: '20px'

        }, 0)
    } else {
      return new TimelineMax()
        .to(left, 1, { ease: Bounce.easeOut, width: 'calc(100vw - 415px)' }, 0)
        .to(right, 1, { ease: Bounce.easeOut, width: '415px' }, 0)
    }
  }

  toggleSidebar () {
    this.addAnimation(this.toggleSidebarAnimation.bind(this))
    this.setState({ sidebarOpen: !this.state.sidebarOpen })
  }

  closeSidebar () {
    this.addAnimation(this.toggleSidebarAnimation.bind(this))
    this.setState({ sidebarOpen: false })
  }

  displayImagePopover () {
    this.setState({ imagePopoverDisplayed: true })
  }

  dismissImagePopover () {
    this.setState({ imagePopoverDisplayed: false })
  }

  renderImagePopover () {
    return (
      <div
        className='popover-background'
        onClick={e => {
          e.preventDefault()
          this.dismissImagePopover()
        }}
      >
        <div className='image-popover'>
          <Uploader
            api='http://file.nightzookeeper.com/images/upload'
            uploadedImage={(url) => {
              if (this.writer) {
                if (this.writer.getWrappedInstance().imageUploadSucceeded) {
                  this.writer.getWrappedInstance().imageUploadSucceeded(url)
                }
                this.dismissImagePopover()
              }
            }}
          />
        </div>
        <style jsx>
          {styles}
        </style>
      </div>
    )
  }

  render () {
    return (
      <Provider store={store}>
        <div
          className='host'
          ref={w => {
            this.writingtool = w
          }}
        >
          {this.state.modal}

          <div
            className='background'
            style={{
              backgroundImage: 'url("' + this.props.backgroundImage + '")'
            }}
          />

          {this.state.imagePopoverDisplayed ? this.renderImagePopover() : null}

          <div className='column left sidebarOpen' name='leftCol'>
            <Writer
              ref={w => {
                this.writer = w
              }}
              primaryColor={this.state.primaryColor}
              secondaryColor={this.state.primaryFadedColor}
              textColor={this.state.textColor}
              backgroundImage={this.props.backgroundImage}
              light={this.state.light}
              onMobileFocus={this.closeSidebar.bind(this)}
              onBack={this.props.onBack}
              displayImageUploader={this.displayImagePopover.bind(this)}
              dismissImageUploader={this.dismissImagePopover.bind(this)}
              onSave={this.props.onSave}
              hideTextStyleButtons={this.props.hideTextStyleButtons}
              hideAlignButtons={this.props.hideAlignButtons}
              hideImageButton={this.props.hideImageButton}
              hideClearButton={this.props.hideClearButton}
              onClear={this.onClear.bind(this)}
              displayModal={this.displayModal.bind(this)}
              dismissModal={this.dismissModal.bind(this)}
            />
          </div>

          <div className='column right sidebarOpen' name='rightCol'>
            <div
              className='sidebar-toggle-btn-container'
              style={{
                backgroundColor: this.state.primaryColor
              }}
            >
              <Button
                onClick={this.toggleSidebar.bind(this)}
                bgColor={this.state.secondaryColor}
                color={this.state.textColor}
                round
                shadow
              >
                <Icon name={'menu'} color={this.state.textColor} />
              </Button>
            </div>
            <Sidebar
              primaryColor={this.state.primaryColor}
              secondaryColor={this.state.secondaryColor}
              textColor={this.state.textColor}
            />
          </div>

          <div className='status-bar'>
            <StatusBar
              bgColor={this.state.primaryColor}
              light={this.state.light}
            />
          </div>

          <style jsx>
            {styles}
          </style>
        </div>
      </Provider>
    )
  }
}

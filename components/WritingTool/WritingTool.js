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
import ConfirmModal from '../Modal/ConfirmModal'
import styles from './WritingTool.styles'
import Store from './store/store'
import { init, clear, reset } from './store/actions'
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
    onBackPreventDefault: PropTypes.bool,
    onSavePreventDefault: PropTypes.bool,
    hideImageButton: PropTypes.bool,
    hideTextStyleButtons: PropTypes.bool,
    hideAlignButtons: PropTypes.bool,
    hideClearButton: PropTypes.bool
  }

  static defaultProps = {
    lang: 'en',
    hideClearButton: true,
    backgroundImage: '/assets/temple.jpg',
    onSave: () => {},
    onBack: () => {},
    onSavePreventDefault: false,
    onBackPreventDefault: false,
    backConfirmMessage: 'Are you sure? Have you saved your work?',
    backConfirmButtonText: 'Yes',
    backCancelButtonText: 'No',
    clearConfirmMessage: 'Are you sure? You will loose your work.',
    clearConfirmButtonText: 'Yes',
    clearCancelButtonText: 'No'
  }

  state = {
    sidebarOpen: true,
    primaryColor: undefined,
    secondaryColor: undefined,
    textColor: undefined,
    backConfirmModalIsOpen: false,
    clearConfirmModalIsOpen: false
  }

  constructor (props) {
    super(props)

    this.onSave = this.onSave.bind(this)
    this.onBack = this.onBack.bind(this)
    this.onBackConfirm = this.onBackConfirm.bind(this)
    this.onBackCancel = this.onBackCancel.bind(this)
    this.onClear = this.onClear.bind(this)
    this.onClearConfirm = this.onClearConfirm.bind(this)
    this.onClearCancel = this.onClearCancel.bind(this)
    this.toggleSidebarAnimation = this.toggleSidebarAnimation.bind(this)
    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.closeSidebar = this.closeSidebar.bind(this)
    this.onResize = this.onResize.bind(this)
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

    window.addEventListener('resize', this.onResize)
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

  onResize (e) {
    if (e.target.window.innerWidth > 1280) {
      this.setState({ sidebarOpen: true })
      this.addAnimation(this.toggleSidebarAnimation)
    }
  }

  toggleSidebarAnimation ({ target }) {
    var left = target.find({ name: 'leftCol' })
    var right = target.find({ name: 'rightCol' })

    if (!this.state.sidebarOpen) {
      return new TimelineMax()
        .to(
          left,
          1,
        {
          ease: Bounce.easeOut,
          width: 'calc(100vw - 20px)'
        },
          0
        )
        .to(
          right,
          1,
        {
          ease: Bounce.easeOut,
          width: '20px'
        },
          0
        )
    } else {
      return new TimelineMax()
        .to(left, 1, { ease: Bounce.easeOut, width: 'calc(100vw - 415px)' }, 0)
        .to(right, 1, { ease: Bounce.easeOut, width: '415px' }, 0)
    }
  }

  toggleSidebar () {
    this.addAnimation(this.toggleSidebarAnimation)
    this.setState({ sidebarOpen: !this.state.sidebarOpen })
  }

  closeSidebar () {
    this.addAnimation(this.toggleSidebarAnimation)
    this.setState({ sidebarOpen: false })
  }

  // SAVE

  onSave () {
    if (!this.onSavePreventDefault) {
      // TODO, modal warning about min words and saving as draft
    }
    this.props.onSave()
  }

  // BACK

  onBack () {
    if (!this.onBackPreventDefault) {
      this.openBackConfirmModal()
    } else {
      this.props.onBack()
    }
  }

  openBackConfirmModal () {
    this.setState({
      backConfirmModalIsOpen: true
    })
  }

  closeBackConfirmModal () {
    this.setState({
      backConfirmModalIsOpen: false
    })
  }

  renderBackConfirmModal () {
    return (
      <ConfirmModal
        isOpen={this.state.backConfirmModalIsOpen}
        message={this.props.backConfirmMessage}
        onConfirm={this.onBackConfirm}
        onCancel={this.onBackCancel}
        confirmText={this.props.backConfirmButtonText}
        cancelText={this.props.backCancelButtonText}
      />
    )
  }

  onBackConfirm () {
    this.closeBackConfirmModal()
    store.dispatch(reset())
    this.props.onBack()
  }

  onBackCancel () {
    this.closeBackConfirmModal()
  }

  // CLEAR

  onClear () {
    this.openClearConfirmModal()
  }

  openClearConfirmModal () {
    this.setState({
      clearConfirmModalIsOpen: true
    })
  }

  closeClearConfirmModal () {
    this.setState({
      clearConfirmModalIsOpen: false
    })
  }

  renderClearConfirmModal () {
    return (
      <ConfirmModal
        isOpen={this.state.clearConfirmModalIsOpen}
        message={this.props.clearConfirmMessage}
        onConfirm={this.onClearConfirm}
        onCancel={this.onClearCancel}
        confirmText={this.props.clearConfirmButtonText}
        cancelText={this.props.clearCancelButtonText}
      />
    )
  }

  onClearConfirm () {
    store.dispatch(clear())
    this.closeClearConfirmModal()
  }

  onClearCancel () {
    this.closeClearConfirmModal()
  }

  // Render

  render () {
    return (
      <Provider store={store}>
        <div className='host'>
          {this.renderBackConfirmModal()}
          {this.renderClearConfirmModal()}
          <div
            className='background'
            style={{
              backgroundImage: 'url("' + this.props.backgroundImage + '")'
            }}
          />

          <div className='column left sidebarOpen' name='leftCol'>
            <Writer
              primaryColor={this.state.primaryColor}
              secondaryColor={this.state.primaryFadedColor}
              textColor={this.state.textColor}
              backgroundImage={this.props.backgroundImage}
              light={this.state.light}
              onMobileFocus={this.closeSidebar}
              hideTextStyleButtons={this.props.hideTextStyleButtons}
              hideAlignButtons={this.props.hideAlignButtons}
              hideImageButton={this.props.hideImageButton}
              hideClearButton={this.props.hideClearButton}
              onBack={this.onBack}
              onSave={this.onSave}
              onClear={this.onClear}
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
                onClick={this.toggleSidebar}
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

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import GSAP from 'react-gsap-enhancer'
import { TimelineMax, Bounce } from 'gsap'
import PropTypes from 'prop-types'
import Color from 'color'
import { throttle, isEqual, cloneDeep } from 'lodash'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import getColorFromImage from '../../util/getColorFromImage'
import Writer from './components/Writer/Writer'
import Sidebar from './components/Sidebar/Sidebar'
import Icon from '../Icon'
import Button from '../Button'
import StatusBar from './components/StatusBar/StatusBar'
import ConfirmModal from '../Modal/ConfirmModal'
import MessageModal from '../Modal/MessageModal'
import styles from './WritingTool.styles'
import Store from './store/store'
import { init, clear, clearCachedState, cacheState } from './store/actions'
import jpMessages from '../../translations/locales/jp.json'
import simpEnMessages from '../../translations/locales/simp-en.json'
import jv from 'react-intl/locale-data/jv'

const messages = {
  'jv': jpMessages,
  'simp-en': simpEnMessages
}

addLocaleData([...jv])

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
    sections: PropTypes.arrayOf(PropTypes.shape({
      prepend: PropTypes.bool,
      title: PropTypes.string,
      component: PropTypes.node,
      fieldType: PropTypes.oneOf(['input', 'textarea']),
      numberOfFields: PropTypes.number,
      userCanAddFields: PropTypes.bool,
      fieldsAreRemovable: PropTypes.bool
    })),
    onBack: PropTypes.func,
    onSave: PropTypes.func,
    askToSaveOnBack: PropTypes.bool,
    warnDraftStatus: PropTypes.bool,
    clearCacheOnBack: PropTypes.bool,
    hideImageButton: PropTypes.bool,
    hideTextStyleButtons: PropTypes.bool,
    hideAlignButtons: PropTypes.bool,
    hideClearButton: PropTypes.bool,
    hideSaveButton: PropTypes.bool
  }

  static defaultProps = {
    lang: 'en',
    backgroundImage: '/assets/temple.jpg',
    onSave: () => {},
    onBack: () => {},
    hideClearButton: true,
    hideSaveButton: false,
    clearCacheOnBack: false,
    askToSaveOnBack: false,
    warnDraftStatus: true
  }

  state = {
    sidebarOpen: true,
    primaryColor: undefined,
    secondaryColor: undefined,
    textColor: undefined,
    confirmModalIsOpen: false,
    confirmModal: {},
    messageModalIsOpen: false,
    messageModal: {},
    wordLimit: false
  }

  constructor (props) {
    super(props)

    this.onBackConfirm = this.onBackConfirm.bind(this)
    this.closeConfirmModal = this.closeConfirmModal.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onBack = this.onBack.bind(this)
    this.onClear = this.onClear.bind(this)
    this.toggleSidebarAnimation = this.toggleSidebarAnimation.bind(this)
    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.closeSidebar = this.closeSidebar.bind(this)
    this.onResize = this.onResize.bind(this)
    this.throttledCacheState = throttle(this.cacheState, 1000, {leading: false})
  }

  componentWillMount () {
    init(store.dispatch, {
      lang: this.props.lang,
      writingType: this.props.writingType,
      placeholders: this.props.placeholders,
      writing: this.props.writing,
      constraints: this.props.constraints,
      prompt: this.props.prompt,
      sections: this.props.sections,
      loadPresetSections: this.props.loadPresetSections,
      reset: this.props.reset
    })

    window.addEventListener('resize', this.onResize)
  }

  setColorsFromBackgroundImage () {
    getColorFromImage(this.props.backgroundImage, (err, color) => {
      if (err) {
        console.log(err)
        return
      }

      let primaryColor = new Color(color)
      let light = primaryColor.light()

      let secondaryColor = light
        ? primaryColor.darken(0.3)
        : primaryColor.lighten(0.3)

      this.setState({
        primaryColor,
        toolbarColor: light ? primaryColor.whiten(0.2).rgb() : primaryColor.blacken(0.2).rgb(),
        writerBgColor: light ? primaryColor.whiten(0.5).fade(0.1).rgb() : primaryColor.blacken(0.5).fade(0.1).rgb(),
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
    }, { passive: true })

    document
      .getElementsByClassName('host')[0]
      .addEventListener('touchmove', function (e) {
        e.preventDefault()
      }, { passive: true })

    document
      .getElementsByClassName('background')[0]
      .addEventListener('touchmove', function (e) {
        e.preventDefault()
      }, { passive: true })

    this.startAutoCache()
  }

  cacheState () {
    const stateToCache = this.getStateToCache()
    if (!isEqual(this._cachedState, stateToCache)) {
      this._cachedState = stateToCache
      cacheState(store.dispatch, this._cachedState)
    }
  }

  getStateToCache () {
    return cloneDeep({
      writing: store.getState().writing,
      sections: store.getState().sections
    })
  }

  startAutoCache () {
    this._cachedState = this.getStateToCache()
    this.unsubscribe = store.subscribe(this.throttledCacheState.bind(this))
  }

  stopAutoCache () {
    this.throttledCacheState.cancel()
    if (this.unsubscribe) {
      this.unsubscribe()
    }
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

  renderConfirmModal () {
    return (
      <ConfirmModal
        isOpen={this.state.confirmModalIsOpen}
        {...this.state.confirmModal}
        contentLabel='confirmModal'
      />
    )
  }

  closeConfirmModal () {
    this.setState({
      confirmModalIsOpen: false
    })
  }

  renderMessageModal () {
    return (
      <MessageModal
        isOpen={this.state.messageModalIsOpen}
        {...this.state.messageModal}
        contentLabel='messageModal'
      />
    )
  }

  onSave () {
    if (!store.getState().writing.title) {
      this.setState({
        messageModalIsOpen: true,
        messageModal: {
          message: (
            <FormattedMessage
              id='writingToolAskForTitle'
              defaultMessage='Please add a title'
          />
          ),
          onAfterClose: () => {
            this.setState({
              messageModalIsOpen: false
            })
          }
        }
      })
      return
    }

    const wordsUnder = store.getState().constraints.minWords - store.getState().wordCount
    const wordsOver = store.getState().wordCount - store.getState().constraints.maxWords
    let warnDraftMessage
    let buttonLabel

    if (wordsUnder > 0) {
      warnDraftMessage = <FormattedMessage
        id='writingToolWriteMore'
        defaultMessage='Write at least {wordsUnder, plural, one {# more word} other {# more words}}!'
        values={{wordsUnder}}
      />
      buttonLabel = <FormattedMessage
        id='writingToolKeepWriting'
        defaultMessage='Keep Writing'
      />
    } else if (wordsOver > 0) {
      warnDraftMessage = <FormattedMessage
        id='writingToolWriteLess'
        defaultMessage="Oops! That's too many words, take away at least {wordsOver, plural, one {# word} other {# words}}."
        values={{wordsOver}}
      />
      buttonLabel = <FormattedMessage
        id='writingToolKeepEditing'
        defaultMessage='Keep Editing'
      />
    }

    if (warnDraftMessage) {
      this.setState({
        messageModalIsOpen: true,
        messageModal: {
          message: warnDraftMessage,
          buttons: [{
            label: <FormattedMessage
              id='writingToolSaveDraft'
              defaultMessage='Save Draft'
            />,
            bgColor: 'white',
            color: 'black',
            onClick: () => {
              this.setState({
                messageModalIsOpen: false
              })
              this.save()
            }
          }, {
            label: buttonLabel
          }]
        }
      })
      return
    }

    this.save()
  }

  save () {
    this.props.onSave(
      store.getState().writing,
      store.getState().sections,
      err => {
        if (!err) {
          this.stopAutoCache()
          clearCachedState(store.dispatch)
        }
      }
    )
  }

  onBack () {
    if (this.props.askToSaveOnBack) {
      this.openSaveOnBackModal()
    } else {
      this.openBackConfirmModal()
    }
  }

  openSaveOnBackModal () {
    this.setState({
      confirmModalIsOpen: true,
      confirmModal: {
        message: (
          <FormattedMessage
            id='writingToolSaveOnBack'
            defaultMessage='Would you like to save your work?'
          />
        ),
        onConfirm: () => {
          this.closeConfirmModal()
          this.onSave()
        },
        onCancel: this.onBackConfirm
      }
    })
  }

  openBackConfirmModal () {
    this.setState({
      confirmModalIsOpen: true,
      confirmModal: {
        message: (
          <FormattedMessage
            id='writingBackConfirm'
            defaultMessage="Are you sure? You will lose your work if you don't save it."
          />
        ),
        onConfirm: this.onBackConfirm,
        onCancel: this.closeConfirmModal
      }
    })
  }

  onBackConfirm () {
    this.closeConfirmModal()
    if (this.props.clearCacheOnBack) {
      this.stopAutoCache()
      clearCachedState(store.dispatch)
    }
    this.props.onBack()
  }

  onClear () {
    this.openClearConfirmModal()
  }

  openClearConfirmModal () {
    this.setState({
      confirmModalIsOpen: true,
      confirmModal: {
        message: (
          <FormattedMessage
            id='writingToolClearConfirm'
            defaultMessage='Are you sure? Your work will be lost.'
          />
        ),
        onConfirm: () => {
          this.closeConfirmModal()
          store.dispatch(clear())
          clearCachedState(store.dispatch)
        },
        onCancel: this.closeConfirmModal
      }
    })
  }

  render () {
    let lang = this.props.lang === 'jp' ? 'jv' : this.props.lang
    lang = this.props.lang === 'simp-en' ? 'en' : lang
    let localMessages = this.props.lang === 'simp-en'
      ? messages['simp-en']
      : messages[lang]

    return (
      <Provider store={store}>
        <IntlProvider key={lang} locale={lang} messages={localMessages} >
          <div className='host'>
            {this.renderConfirmModal()}
            {this.renderMessageModal()}
            <div
              className='background'
              style={{
                backgroundImage: 'url("' + this.props.backgroundImage + '")'
              }}
            />
            { this.state.primaryColor && <div className='colorOverlay' style={{
              backgroundColor: this.state.writerBgColor,
              height: '100vh',
              width: '100vw'
            }}>
              <div className='column left sidebarOpen' name='leftCol'>
                <Writer
                  lang={this.props.lang}
                  primaryColor={this.state.primaryColor}
                  toolbarColor={this.state.toolbarColor}
                  textColor={this.state.textColor}
                  backgroundImage={this.props.backgroundImage}
                  light={this.state.light}
                  onMobileFocus={this.closeSidebar}
                  hideTextStyleButtons={this.props.hideTextStyleButtons}
                  hideAlignButtons={this.props.hideAlignButtons}
                  hideImageButton={this.props.hideImageButton}
                  hideClearButton={this.props.hideClearButton}
                  hideSaveButton={this.props.hideSaveButton}
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
                  lang={this.props.lang}
                  bgColor={this.state.primaryColor}
                  light={this.state.light}
                />
              </div>
            </div>
            }
            <style jsx>{styles}</style>
          </div>
        </IntlProvider>
      </Provider>
    )
  }

  componentWillUnmount () {
    this.stopAutoCache()
  }
}

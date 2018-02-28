import React, { Component } from 'react'
import { State, Block } from 'slate'
import { Editor } from 'slate-react'
import Html from 'slate-html-serializer'
import Plain from 'slate-plain-serializer'
import PropTypes from 'prop-types'
import GSAP from 'react-gsap-enhancer'
import { connect } from 'react-redux'
import { TimelineMax } from 'gsap'
import { FormattedMessage } from 'react-intl'
import { words, debounce } from 'lodash'
import { setWordCount, setWriting } from '../../store/actions'
import Modal from '../../../Modal'
import Uploader from '../../../Uploader'
import Icon from '../../../Icon'
import Button from '../../../Button'
import styles from './Writer.styles'

/**
 * Define the default node type.
 */
const DEFAULT_NODE = 'paragraph'

const defaultBlock = {
  kind: 'block',
  type: 'paragraph',
  isVoid: false,
  data: {}
}

/**
 * Define a schema.
 *
 * @type {Object}
 */
const schema = {
  nodes: {
    image: props => {
      const { node } = props
      const src = node.data.get('src')
      return (
        <img
          src={src}
          className='importedImage'
          alt=''
          style={{
            maxWidth: '75%',
            maxHeight: '400px',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '20px',
            marginBottom: '20px'
          }}
          {...props.attributes}
        />
      )
    },
    'align-left': props => (
      <p
        style={{
          textAlign: 'left'
        }}
      >
        {props.children}
      </p>
    ),
    'align-center': props => (
      <p
        style={{
          textAlign: 'center'
        }}
      >
        {props.children}
      </p>
    ),
    'align-right': props => (
      <p
        style={{
          textAlign: 'right'
        }}
      >
        {props.children}
      </p>
    )
  },
  rules: [
    // Rule to insert a paragraph below a void node (the image) if that node is
    // the last one in the document.
    {
      match: node => {
        return node.kind === 'document'
      },
      validate: document => {
        const lastNode = document.nodes.last()
        return lastNode && lastNode.isVoid ? true : null
      },
      normalize: (transform, document) => {
        const block = Block.create(defaultBlock)
        transform.insertNodeByKey(document.key, document.nodes.size, block)
      }
    }
  ],
  marks: {
    bold: {
      fontWeight: 'bold'
    },
    italic: {
      fontStyle: 'italic'
    },
    underline: {
      textDecoration: 'underline'
    }
  }
}

const BLOCK_TAGS = {
  p: 'paragraph',
  img: 'image'
}

const MARK_TAGS = {
  em: 'italic',
  strong: 'bold',
  u: 'underline'
}

const rules = [
  {
    deserialize (el, next) {
      let type = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (!type) return

      if (type === 'paragraph' && el.style && el.style['text-align']) {
        switch (el.style['text-align']) {
          case 'left':
            type = 'align-left'
            break
          case 'center':
            type = 'align-center'
            break
          case 'right':
            type = 'align-right'
            break
        }
      }

      const data = {}

      if (type === 'image') {
        data.src = el.src
      }

      return {
        kind: 'block',
        type: type,
        nodes: next(el.childNodes),
        data: data
      }
    },
    serialize (object, children) {
      if (object.kind !== 'block') return

      switch (object.type) {
        case 'paragraph': return <p>{children}</p>
        case 'align-left':
          return <p style={{ textAlign: 'left' }}>{children}</p>
        case 'align-center':
          return <p style={{ textAlign: 'center' }}>{children}</p>
        case 'align-right':
          return <p style={{ textAlign: 'right' }}>{children}</p>
        case 'image':
          return (
            <img
              src={object.data.get('src')}
              className='importedImage'
              alt=''
              style={{
                maxWidth: '75%',
                maxHeight: '400px',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '20px',
                marginBottom: '20px'
              }}
            />
          )
      }
    }
  },
  {
    deserialize (el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()]
      if (!type) return
      return {
        kind: 'mark',
        type: type,
        nodes: next(el.childNodes)
      }
    }
  },
  {
    serialize (object, children) {
      if (object.kind !== 'mark') return
      switch (object.type) {
        case 'bold': return <strong>{children}</strong>
        case 'italic': return <em>{children}</em>
        case 'underline': return <u>{children}</u>
      }
    }
  }
]
const html = new Html({ rules })

@connect(store => {
  return {
    placeholders: store.placeholders,
    writing: store.writing,
    constraints: store.constraints
  }
})
@GSAP()
export default class Writer extends Component {
  static propTypes = {
    lang: PropTypes.string,
    placeholders: PropTypes.object,
    writing: PropTypes.object,
    constraints: PropTypes.object,
    primaryColor: PropTypes.any,
    toolbarColor: PropTypes.any,
    textColor: PropTypes.any,
    light: PropTypes.bool,
    onMobileFocus: PropTypes.func,
    onBack: PropTypes.func,
    onClear: PropTypes.func,
    onSave: PropTypes.func,
    saveAsHtml: PropTypes.bool,
    hideImageButton: PropTypes.bool,
    hideTextStyleButtons: PropTypes.bool,
    hideAlignButtons: PropTypes.bool,
    hideClearButton: PropTypes.bool
  }

  static defaultProps = {
    hideImageButton: false,
    hideTextStyleButtons: false,
    hideAlignButtons: false,
    hideClearButton: true,
    saveAsHtml: true,
    lang: 'en',
    onBack: () => {},
    onClear: () => {},
    onSave: () => {}
  }

  constructor (props) {
    super(props)

    const initialState = this.props.writing.text || '<p></p>'

    this.state = {
      writingTitle: this.props.writing.title,
      writingState: html.deserialize(initialState),
      placeholderColor: this.props.light ? 'rgba(0,0,0,.6)' : 'rgba(255,255,255,.6)',
      mobile: false,
      focusSlateEditor: false,
      toolbarDisabled: true,
      imageUploaderModalIsOpen: false
    }

    this.onStateChange = this.onStateChange.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
    this.resizeTitle = this.resizeTitle.bind(this)
    this.titleRef = this.titleRef.bind(this)
    this.editorRef = this.editorRef.bind(this)
    this.writerRef = this.writerRef.bind(this)
    this.slateEditorRef = this.slateEditorRef.bind(this)
    this.onTitleKeyDown = this.onTitleKeyDown.bind(this)
    this.closeImageUploaderModal = this.closeImageUploaderModal.bind(this)
    this.insertImage = this.insertImage.bind(this)
    this.onSave = this.onSave.bind(this)

    this.onDebouncedDocumentChange = debounce(
      this.onDebouncedDocumentChange,
      1000
    )
  }

  componentDidMount () {
    if (/Android|iPad/i.test(navigator.userAgent)) {
      this.setState({ mobile: true })
      this.writer.style.height = 'calc(100vh - 155px)'
    }

    this.editor.addEventListener('touchmove', function (e) {
      e.stopPropagation()
    }, {passive: true})

    this.writer.addEventListener('click', function (e) {})

    this.updateWordCount(this.state.writingState)
  }

  componentWillReceiveProps (nextProps) {
    // Just support case where we are clearing the writing
    if (nextProps.writing.title === '' && nextProps.writing.text === '') {
      this.setState({
        writingTitle: '',
        writingState: html.deserialize('<p></p>')
      })
    }

    if (nextProps.light !== this.props.light) {
      this.setState({
        placeholderColor: nextProps.light ? 'rgba(0,0,0,.6)' : 'rgba(255,255,255,.6)'
      })
    }
  }

  /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasMark = type => {
    const { writingState } = this.state
    return writingState.marks.some(mark => mark.type === type)
  }

  /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasBlock = type => {
    const { writingState } = this.state
    return writingState.blocks.some(node => node.type === type)
  }

  onTitleChange (event) {
    this.setState({
      writingTitle: event.target.value
    })
    this.props.dispatch(
      setWriting({
        title: event.target.value
      })
    )
    this.addAnimation(this.resizeTitle)
  }

  onStateChange = ({state}) => {
    if (state.document != this.state.writingState.document) {
      this.updateWordCount(state)
      this.onDebouncedDocumentChange(state)
    }

    this.setState({ writingState: state })
  }

  onDebouncedDocumentChange = (state) => {
    this.props.dispatch(
      setWriting({
        text: html.serialize(state)
      })
    )
  }

  updateWordCount (state) {
    this.props.dispatch(setWordCount(this.getWordCountForState(state)))
  }

  getWordCountForState = state => {
    const text = Plain.serialize(state)

    if (this.props.lang === 'jp') {
      return text.replace(/\s+/g, '').length
    }
    return words(text).length
  }

  focusEditor () {
    const writingState = this.state.writingState
      .transform()
      .focus()
      .apply()
    this.setState({ writingState })
  }

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} e
   * @param {String} type
   */
  onClickMark = (e, type) => {
    e.preventDefault()
    let { writingState } = this.state
    writingState = writingState
      .transform()
      .toggleMark(type)
      .apply()
    this.setState({ writingState })
  }

  insertImage = (state, src) => {
    return state
      .transform()
      .insertBlock({
        type: 'image',
        isVoid: true,
        data: { src }
      })
      .apply()
  }

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} e
   * @param {String} type
   */

  onClickBlock = (e, type) => {
    e.preventDefault()
    let { writingState } = this.state
    const transform = writingState.transform()

    if (type === 'image') {
      this.openImageUploaderModal()
    } else {
      const isActive = this.hasBlock(type)
      transform.setBlock(isActive ? DEFAULT_NODE : type)
    }

    writingState = transform.apply()
    this.setState({ writingState })
  }

  render = () => {
    const colorStyle = {
      color: this.props.textColor
    }

    const dividerColor = this.props.light ? 'rgba(0, 0, 0, .25)' : 'rgba(255, 255, 255, .25)'

    return (
      <div className='host'>
        {this.renderToolbar()}
        {this.renderImageUploaderModal()}

        <div className='writer' ref={this.writerRef}>
          <div
            className={`title-container ${this.props.light ? 'light' : 'dark'}`}
          >
            <textarea
              className='title'
              tabIndex={1}
              placeholder={this.props.placeholders.title}
              ref={this.titleRef}
              onKeyDown={this.onTitleKeyDown}
              style={{
                ...colorStyle,
                borderBottom: `2px solid ${dividerColor}`
              }}
              onChange={this.onTitleChange}
              value={this.state.writingTitle}
            />
          </div>
          {this.renderEditor()}
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }

  onSave () {
    const text = this.props.saveAsHtml
      ? html.serialize(this.state.writingState)
      : Plain.serialize(this.state.writingState)

    this.props.dispatch(setWriting({ text }))
    this.props.onSave()
  }

  titleRef (el) {
    this.title = el
  }

  writerRef (el) {
    this.writer = el
  }

  editorRef (el) {
    this.editor = el
  }

  slateEditorRef (el) {
    this.slateEditor = el
  }

  resizeTitle () {
    return new TimelineMax()
      .to(this.title, 0, { height: '1px' })
      .to(this.title, 0, { height: `${10 + this.title.scrollHeight}px` })
  }

  onTitleKeyDown (event) {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
    if (event.key === 'Tab') {
      event.preventDefault()
      this.focusEditor()
    }
  }

  /**
   * Render the toolbar.
   *
   * @return {Element}
   */

  renderToolbar = () => {
    const bgStyle = {
      color: this.props.textColor,
      backgroundColor: this.props.toolbarColor
    }
    return (
      <div
        style={{
          color: this.props.textColor
        }}
      >
        <div className='menu toolbar-menu' style={bgStyle}>
          <div className='toolbar-button'>
            <Button bgColor='white' shadow round onClick={this.props.onBack}>
              <Icon name='left' color='black' />
            </Button>
          </div>

          {!this.props.hideSaveButton && (
            <div className='toolbar-button save'>
              <Button bgColor='white' shadow onClick={this.onSave}>
                <FormattedMessage id='save' defaultMessage='Save' />
              </Button>
            </div>
          )}

          {!this.props.hideClearButton && (
            <div className='toolbar-button clear'>
              <Button bgColor='white' shadow onClick={this.props.onClear}>
                <FormattedMessage id='clear' defaultMessage='Clear' />
              </Button>
            </div>
          )}

          {!this.props.hideTextStyleButtons &&
            this.renderMarkButton('bold', 'bold')}
          {!this.props.hideTextStyleButtons &&
            this.renderMarkButton('italic', 'italic')}
          {!this.props.hideTextStyleButtons &&
            this.renderMarkButton('underline', 'underline')}
          {!this.props.hideAlignButtons &&
            this.renderBlockButton('align-left', 'align-left')}
          {!this.props.hideAlignButtons &&
            this.renderBlockButton('align-center', 'align-center')}
          {!this.props.hideAlignButtons &&
            this.renderBlockButton('align-right', 'align-right')}
          {!this.props.hideImageButton &&
            this.renderBlockButton('image', 'picture')}
        </div>

        <style jsx>{styles}</style>
      </div>
    )
  }

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */
  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type)
    const isDisabled = this.state.toolbarDisabled
    const onMouseDown = e => this.onClickMark(e, type)

    const style = {
      cursor: 'pointer'
    }

    const activeStyle = {
      ...style,
      color: this.props.light ? 'rgba(255,255,255,.8)' : 'rgba(0,0,0,.8)'
    }

    const disabledStyle = {
      opacity: 0.3
    }

    return (
      <span
        className='button'
        onMouseDown={isDisabled ? () => {} : onMouseDown}
        data-active={isActive}
      >
        <span
          style={isDisabled ? disabledStyle : isActive ? activeStyle : style}
        >
          <Icon name={icon} />
        </span>
        <style jsx>{styles}</style>
      </span>
    )
  }

  resizeEditorAnimation ({ target }) {
    const editor = target.find({ name: 'editor' })
    return new TimelineMax().to(editor, 1, {
      height: '40px',
      maxHeight: '100px'
    })
  }

  onSlateEditorFocus () {
    this.setState({ toolbarDisabled: false })

    if (this.state.mobile) {
      this.props.onMobileFocus()

      // Disables iPad view pushing
      window.scrollTo(0, 0)
      document.body.scrollTop = 0

      if (window.innerHeight < window.innerWidth) {
        this.writer.style.minHeight = '218px'
        this.writer.style.height = '218px'
      } else {
        this.writer.style.minHeight = '565px'
        this.writer.style.height = '565px'
      }
    }
  }

  onBlur () {
    this.setState({ toolbarDisabled: true })

    if (this.state.mobile) {
      this.writer.style.minHeight = '300px'
      this.writer.style.height = 'calc(100vh - 155px)'
    }
  }

  renderBlockButton = (type, icon) => {
    const isActive = this.hasBlock(type)
    const onMouseDown = e => this.onClickBlock(e, type)
    const isDisabled = this.state.toolbarDisabled

    const style = {
      cursor: 'pointer'
    }

    const activeStyle = {
      ...style,
      color: this.props.light ? 'white' : 'black'
    }

    const disabledStyle = {
      opacity: 0.3
    }

    return (
      <span
        className='button'
        onMouseDown={isDisabled ? () => {} : onMouseDown}
        data-active={isActive}
      >
        <span
          style={isDisabled ? disabledStyle : isActive ? activeStyle : style}
        >
          <Icon name={icon} />
        </span>
        <style jsx>{styles}</style>
      </span>
    )
  }

  openImageUploaderModal () {
    this.setState({
      imageUploaderModalIsOpen: true
    })
  }

  closeImageUploaderModal () {
    this.setState({
      imageUploaderModalIsOpen: false
    })
  }

  renderImageUploaderModal = () => {
    return (
      <Modal contentLabel='image-uploader' isOpen={this.state.imageUploaderModalIsOpen}>
        <div
          onClick={this.closeImageUploaderModal}
          className='image-uploader-container'
        >
          <div className='image-uploader'>
            <Uploader
              api='https://file.nightzookeeper.com/images/upload'
              uploadedImage={url => {
                if (!url) return
                let { writingState } = this.state
                writingState = this.insertImage(writingState, url)
                this.onStateChange(writingState)
                this.closeImageUploaderModal()
              }}
            />
          </div>
          <div className='image-uploader-close-button'>
            <Button round shadow bgColor='grey'>
              <Icon name='cross' />
            </Button>
          </div>
        </div>
        <style jsx>{styles}</style>
      </Modal>
    )
  }

  /**
   * Render the Slate editor.
   *
   * @return {Element}
   */

  renderEditor = () => {
    const placeholder = <span style={{
      color: this.state.placeholderColor
    }} dangerouslySetInnerHTML={{__html: this.props.placeholders.text}} />

    return (
      <div className='editor-wrapper'>
        <div
          className='editor'
          style={{
            color: this.props.textColor
          }}
          ref={this.editorRef}
          onClick={this.focusEditor.bind(this)}
          name='editor'
        >
          <Editor
            key='editor'
            spellCheck
            placeholder={placeholder}
            schema={schema}
            tabIndex={2}
            ref={this.slateEditorRef}
            state={this.state.writingState}
            onFocus={this.onSlateEditorFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            onChange={this.onStateChange}
            style={{
              height: 'calc(100% - 40px)',
              paddingBottom: '100px'
            }}
          />
        </div>

        <style jsx>{styles}</style>
      </div>
    )
  }
}

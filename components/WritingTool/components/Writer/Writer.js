import React, { Component } from 'react'
import { Editor, Block, Html, Plain } from 'slate'
import PropTypes from 'prop-types'
import GSAP from 'react-gsap-enhancer'
import { connect } from 'react-redux'
import { TimelineMax } from 'gsap'
import debounce from 'lodash/debounce'
import JsPDF from 'jspdf'
import Icon from '../../../Icon/Icon'
import Button from '../../../Button/Button'
import styles from './Writer.styles'
import { setWordCount, setWriting } from '../../store/actions'

/**
 * Define the default node type.
 */
const DEFAULT_NODE = 'paragraph'

const defaultBlock = {
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
            textAlign: 'center',
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
    'align-left': props =>
      <p
        style={{
          textAlign: 'left'
        }}
      >
        {props.children}
      </p>,
    'align-center': props =>
      <p
        style={{
          textAlign: 'center'
        }}
      >
        {props.children}
      </p>,
    'align-right': props =>
      <p
        style={{
          textAlign: 'right'
        }}
      >
        {props.children}
      </p>
  },
  rules: [
    // Rule to insert a paragraph block if the document is empty.
    {
      match: node => {
        return node.kind === 'document'
      },
      validate: document => {
        return document.nodes.size ? null : true
      },
      normalize: (transform, document) => {
        const block = Block.create(defaultBlock)
        transform.insertNodeByKey(document.key, 0, block)
      }
    },
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
    underlined: {
      textDecoration: 'underline'
    },
    sizeOne: {
      fontSize: '12px'
    },
    sizeTwo: {
      fontSize: '17px'
    },
    sizeThree: {
      fontSize: '22px'
    }
  }
}

const BLOCK_TAGS = {
  p: 'paragraph',
  em: 'italic',
  u: 'underline',
  s: 'strikethrough'
}

const MARK_TAGS = {
  strong: 'bold',
  em: 'italic',
  u: 'underline'
}

const rules = [
  {
    deserialize (el, next) {
      if (!el.tagName) return
      const block = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (!block) return

      let type = block

      if (block === 'paragraph' && el.style && el.style['text-align']) {
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

      return {
        kind: 'block',
        type: type,
        nodes: next(el.childNodes)
      }
    }
  },
  {
    serialize (object, children) {
      if (object.kind !== 'block') return
      switch (object.type) {
        case 'paragraph':
          return (
            <p>
              {children}
            </p>
          )
        case 'align-left':
          return (
            <p style={{ textAlign: 'left' }}>
              {children}
            </p>
          )
        case 'align-center':
          return (
            <p style={{ textAlign: 'center' }}>
              {children}
            </p>
          )
        case 'align-right':
          return (
            <p style={{ textAlign: 'right' }}>
              {children}
            </p>
          )
        case 'image':
          return (
            <img
              src={object.data.get('src')}
              className='importedImage'
              alt=''
              align='middle'
              style={{
                maxWidth: '75%',
                maxHeight: '400px',
                textAlign: 'center',
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
      const mark = MARK_TAGS[el.tagName]
      if (!mark) return
      return {
        kind: 'mark',
        type: mark,
        nodes: next(el.childNodes)
      }
    }
  },
  {
    serialize (object, children) {
      if (object.kind !== 'mark') return
      switch (object.type) {
        case 'bold':
          return (
            <strong>
              {children}
            </strong>
          )
        case 'italic':
          return (
            <em>
              {children}
            </em>
          )
        case 'underlined':
          return (
            <u>
              {children}
            </u>
          )
      }
    }
  }
]
const html = new Html({ rules })

@connect(
  store => {
    return {
      placeholders: store.placeholders,
      writing: store.writing,
      constraints: store.constraints
    }
  },
  null,
  null,
  { withRef: true }
)
@GSAP()
export default class Writer extends Component {
  static propTypes = {
    placeholders: PropTypes.object,
    writing: PropTypes.object,
    constraints: PropTypes.object,
    primaryColor: PropTypes.any,
    secondaryColor: PropTypes.any,
    textColor: PropTypes.any,
    light: PropTypes.bool,
    onMobileFocus: PropTypes.func,
    displayImageUploader: PropTypes.func,
    dismissImageUploader: PropTypes.func,
    onBack: PropTypes.func,
    onClear: PropTypes.func,
    onSave: PropTypes.func,
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
    onBack: () => {},
    onClear: () => {},
    onSave: () => {}
  }

  constructor (props) {
    super(props)

    this.state = {
      writingTitle: this.props.writing.title,
      writingState: html.deserialize(this.props.writing.text || '<p></p>', {
        terse: true
      }),
      mobile: false,
      focusSlateEditor: false,
      toolbarDisabled: true,
      modal: null
    }

    this.onStateChange = this.onStateChange.bind(this)
    this.onDocumentChange = this.onDocumentChange.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
    this.resizeTitle = this.resizeTitle.bind(this)
    this.titleRef = this.titleRef.bind(this)
    this.editorRef = this.editorRef.bind(this)
    this.writerRef = this.writerRef.bind(this)
    this.slateEditorRef = this.slateEditorRef.bind(this)
    this.onTitleKeyDown = this.onTitleKeyDown.bind(this)
    this.imageUploadSucceeded = this.imageUploadSucceeded.bind(this)
    this.insertImage = this.insertImage.bind(this)

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
    })

    this.writer.addEventListener('click', function (e) {})
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

  onStateChange = state => {
    this.setState({
      writingState: state
    })
  }

  onDebouncedDocumentChange = (document, state) => {
    this.props.dispatch(
      setWriting({
        text: html.serialize(state)
      })
    )
  }

  onDocumentChange = (document, state) => {
    this.onDebouncedDocumentChange(document, state)
    this.props.dispatch(setWordCount(this.getWordCountForState(state)))
  }

  getWordCountForState = state => {
    return state.document.text.split(' ').filter(w => w.length > 0).length
  }

  focusEditor () {
    const writingState = this.state.writingState.transform().focus().apply()
    this.setState({ writingState })
  }

  save () {}

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} e
   * @param {String} type
   */
  onClickMark = (e, type) => {
    e.preventDefault()
    let { writingState } = this.state
    writingState = writingState.transform().toggleMark(type).apply()
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
      this.props.displayImageUploader()
    } else {
      const isActive = this.hasBlock(type)
      transform.setBlock(isActive ? DEFAULT_NODE : type)
    }

    writingState = transform.apply()
    this.setState({ writingState })
  }

  imageUploadSucceeded (url) {
    if (!url) return
    let { writingState } = this.state
    writingState = this.insertImage(writingState, url)
    this.onStateChange(writingState)
  }

  render = () => {
    const hostStyle = {
      boxShadow: `${this.props.light
        ? 'rgba(255,255,255,0.8)'
        : 'rgba(0,0,0,0.8)'} 0px 60px 59px 140px`
    }

    const colorStyle = {
      color: this.props.textColor
    }

    const bgColorStyle = {
      background: `${this.props.light
        ? 'rgba(255,255,255,0.8)'
        : 'rgba(0,0,0,0.8)'}`
    }

    return (
      <div className='host' style={hostStyle}>
        {this.renderToolbar()}

        <div className='writer' ref={this.writerRef}>
          <div
            className={`title-container ${this.props.light ? 'light' : 'dark'}`}
            style={{ ...bgColorStyle }}
          >
            <textarea
              className='title'
              tabIndex={1}
              placeholder={this.props.placeholders.title}
              ref={this.titleRef}
              onKeyDown={this.onTitleKeyDown}
              style={{
                ...colorStyle,
                borderBottom: `2px solid ${this.props.primaryColor}`
              }}
              onChange={this.onTitleChange}
              value={this.state.writingTitle}
            />
          </div>
          {this.renderEditor()}
        </div>
        <style jsx>
          {styles}
        </style>
      </div>
    )
  }

  saveAction () {
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
      backgroundColor: this.props.secondaryColor
    }
    return (
      <div
        style={{
          color: this.props.textColor
        }}
      >
        <div className='menu toolbar-menu' style={bgStyle}>
          <div className='toolbar-button'>
            <Button
              bgColor='white'
              shadow
              round
              onClick={
                this.props.onBack
                  ? () => {
                    this.props.displayModal(
                        'Are you sure? Have you saved your work?',
                        () => {
                          this.props.onClear()
                          this.props.onBack()
                        },
                        this.props.dismissModal,
                        'Yes',
                        'No'
                      )
                  }
                  : () => {}
              }
            >
              <Icon name='left' color='black' />
            </Button>
          </div>

          {!this.props.hideTextStyleButtons &&
            this.renderMarkButton('bold', 'bold')}
          {!this.props.hideTextStyleButtons &&
            this.renderMarkButton('italic', 'italic')}
          {!this.props.hideTextStyleButtons &&
            this.renderMarkButton('underlined', 'underline')}
          {!this.props.hideAlignButtons &&
            this.renderBlockButton('align-left', 'align-left')}
          {!this.props.hideAlignButtons &&
            this.renderBlockButton('align-center', 'align-center')}
          {!this.props.hideAlignButtons &&
            this.renderBlockButton('align-right', 'align-right')}
          {!this.props.hideImageButton &&
            this.renderBlockButton('image', 'picture-o')}

          <div className='toolbar-button save'>
            <Button bgColor='white' shadow onClick={this.saveAction.bind(this)}>
              SAVE
            </Button>
          </div>

          {!this.props.hideClearButton &&
            <div className='toolbar-button save'>
              <Button
                bgColor='white'
                shadow
                onClick={() => {
                  this.props.displayModal(
                    'Are you sure? This will clear everything on the page.',
                    this.props.onclear,
                    this.props.dismissModal
                  )
                }}
              >
                Clear
              </Button>
            </div>}
        </div>

        <style jsx>
          {styles}
        </style>
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
        <style jsx>
          {styles}
        </style>
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
        <style jsx>
          {styles}
        </style>
      </span>
    )
  }

  exportAsPdf () {
    var plain = Plain.serialize(this.state.writingState)
    plain = '<p>' + plain.replace(/\n\n/g, '</p><p>')
    plain += '</p>'
    var content = `
    <div style="height: 100%; background: red;">
        <h1> Writing Sparks </h1>
        
        
        <h2>Your ${this.props.planning.title}</h2>
        <div><b>Date:</b> ${new Date()}</div>
        
        <br/>
        <div>__________________________________________________________________________________</div>
        <br/>
        <h2>${this.props.writing.title}</h2>
        <div>${plain.replace(/\n/g, '<br />')}</div>
        <br/>
        <div>__________________________________________________________________________________</div>
        <br/>
        <div style="position: absolute; bottom: 0;">Writing Sparks was created by the team at Night Zookeeper. Visit nightzookeeper.com for more writing challenges and interactive lessons.</div>
    </div>
    `

    var pdf = new JsPDF()

    pdf.fromHTML(
      content,
      15,
      15,
      {
        width: 175
      },
      () => {
        pdf.save('WritingToolExport.pdf')
      }
    )
  }

  /**
   * Render the Slate editor.
   *
   * @return {Element}
   */

  renderEditor = () => {
    return (
      <div
        className='editor-wrapper'
        style={{
          boxShadow: `0px 149px 207px 72px ${this.props.light
            ? 'rgba(255,255,255,0.8)'
            : 'rgba(0,0,0,0.8)'}`
        }}
      >
        <div
          className='editor'
          style={{
            background: `${this.props.light
              ? 'rgba(255,255,255,0.8)'
              : 'rgba(0,0,0,0.8)'}`,
            color: this.props.light ? 'black' : 'white'
          }}
          ref={this.editorRef}
          onClick={this.focusEditor.bind(this)}
          name='editor'
        >
          <Editor
            key='editor'
            spellCheck
            placeholder={this.props.placeholders.text}
            placeholderStyle={{
              color: this.props.light
                ? 'rgba(0,0,0, .7)'
                : 'rgba(255,255,255, .7)'
            }}
            schema={schema}
            tabIndex={2}
            ref={this.slateEditorRef}
            state={this.state.writingState}
            onFocus={this.onSlateEditorFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            onChange={this.onStateChange}
            onDocumentChange={this.onDocumentChange}
            style={{
              height: '100%'
            }}
          />
        </div>

        <style jsx>
          {styles}
        </style>
      </div>
    )
  }
}

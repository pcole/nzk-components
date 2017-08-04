import React from 'react'
import {Editor, Block, Raw, Html, Plain} from 'slate'
import styles from './Writer.styles'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {textChanged, saveWritingLocalstorage, updateProgress, updateNbWords} from '../../store/actions/writingActions'
import Uploader from '../../../Uploader/Uploader'
import throttle from 'lodash/throttle'
import {FormattedMessage as T} from 'react-intl'
import Icon from '../../../Icon/Icon'
import Button from '../../../Button/Button'
import GSAP from 'react-gsap-enhancer'
import {TimelineMax} from 'gsap'
import cn from 'classnames'
import JsPDF from 'jspdf'
import ProgressBar from '../ProgressBar/ProgressBar'
import ConfirmModal from '../ConfirmModal/ConfirmModal'

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
      const {node} = props
      const src = node.data.get('src')
      return (
        <img src={src} className='importedImage' alt='' align='middle' style={{
          maxWidth: '75%',
          maxHeight: '400px',
          textAlign: 'center',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '20px',
          marginBottom: '20px'
        }}
             {...props.attributes} />
      )
    },
    'align-left': props => <p style={{
      textAlign: 'left'
    }}>{props.children}</p>,
    'align-center': props => <p style={{
      textAlign: 'center'
    }}>{props.children}</p>,
    'align-right': props => <p style={{
      textAlign: 'right'
    }}>{props.children}</p>
  },
  rules: [
    // Rule to insert a paragraph block if the document is empty.
    {
      match: (node) => {
        return node.kind === 'document'
      },
      validate: (document) => {
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
      match: (node) => {
        return node.kind === 'document'
      },
      validate: (document) => {
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

const RULES = [
  {
    deserialize (el, next) {
      const block = BLOCK_TAGS[el.tagName]
      if (!block) return
      return {
        kind: 'block',
        type: block,
        nodes: next(el.childNodes)
      }
    }
  },
  {
    serialize (object, children) {
      if (object.kind !== 'block') return
      switch (object.type) {
        case 'paragraph':
          return <p>{children}</p>
        case 'align-left':
          return <p style={{textAlign: 'left'}}>{children}</p>
        case 'align-center':
          return <p style={{textAlign: 'center'}}>{children}</p>
        case 'align-right':
          return <p style={{textAlign: 'right'}}>{children}</p>
        case 'image':
          return <img src={object.data.get('src')} className='importedImage' alt='' align='middle' style={{
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
          return <strong>{children}</strong>
        case 'italic':
          return <em>{children}</em>
        case 'underlined':
          return <u>{children}</u>
      }
    }
  }
]

const serializer = new Html({rules: RULES})

@connect((store) => {
  return {
    writing: store.writing,
    planning: store.planning,
    needsTitle: store.planning.needsTitle
  }
})
@GSAP()
export default class Writer extends React.Component {
  /**
   * Deserialize the initial editor state.
   *
   * @type {Object}
   */

  constructor (props) {
    super(props)
    this.state = {
      state: Raw.deserialize(this.props.writing.state, {terse: true}),
      wordCount: 0,
      mobile: false,
      focus: false,
      imagePopoverDisplayed: false,
      toolbarDisabled: true,
      modal: null
    }
    this.throttledSave = throttle(this.save, 3000)
  }

  static propTypes = {
    nbWords: PropTypes.number,
    minNbWords: PropTypes.number,
    primaryColor: PropTypes.object,
    secondaryColor: PropTypes.object,
    light: PropTypes.bool,
    onMobileFocus: PropTypes.func,
    backCallback: PropTypes.func,
    hideImageButton: PropTypes.bool,
    hideTextStyleButtons: PropTypes.bool,
    hideAlignButtons: PropTypes.bool,
    hideClearButton: PropTypes.bool
  }

  static defaultProps = {
    progress: 0,
    light: false
  }

  componentDidMount () {
    if (/Android|iPad/i.test(navigator.userAgent)) {
      this.setState({mobile: true})
      this.refs.writer.style.height = 'calc(100vh - 155px)'
    }

    this.refs.editor.addEventListener('touchmove', function (e) {
      e.stopPropagation()
    })



    this.refs.writer.addEventListener('click', (function (e) {

    }).bind(this))

    /* this.refs.writer.addEventListener('touchstart', (function (e) {

      if (!this.state.focus) {
        setTimeout((() => {
          if (e.target.offsetTop > 120) {
            this.refs.writer.scrollTop = e.target.offsetTop
          }
        }).bind(this), 200)
      }

      e.stopPropagation()

    }).bind(this)) */

  }

  setCaretPosition (ctrl, pos) {

    if (ctrl.setSelectionRange) {
      ctrl.focus()
      ctrl.setSelectionRange(pos, pos)
    }
    else if (ctrl.createTextRange) {
      var range = ctrl.createTextRange()
      range.collapse(true)
      range.moveEnd('character', pos)
      range.moveStart('character', pos)
      range.select()
    }
  }

  /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasMark = type => {
    const {state} = this.state
    return state.marks.some(mark => mark.type === type)
  }

  /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasBlock = type => {
    const {state} = this.state
    return state.blocks.some(node => node.type === type)
  }

  /**
   * On change, save the new state.
   *
   * @param {State} state
   */

  onChange = state => {
    this.setState({state: state})
    this.props.dispatch(textChanged(state))
    this.recordScreenHeight()
  }

  clear = () => {
    this.props.clearPlanning()
    this.props.clearWriting()
    this.setState({state: Plain.deserialize('')})
  }

  onDocumentChange = (document, state) => {
    var count = document.text.split(' ').filter(w => w.length > 0).length
    var progress = state.progress
    var nbWords = Math.abs(count - this.props.writing.nbWords)

    if (count > this.props.writing.nbWords) { // Addition
      if (count / this.props.writing.constraints.minNbWords * 50 > 50) {
        for (let i = 0; i < nbWords; i++) {
          progress += this.props.writing.constraints.minNbWords / (2 * count)
        }
      } else {
        progress = count / this.props.writing.constraints.minNbWords * 50
      }
    } else if (count < this.props.writing.nbWords) { // Deletion
      if (count / this.props.writing.constraints.minNbWords * 50 > 50) {
        for (let i = 0; i < nbWords; i++) {
          progress -= this.props.writing.constraints.minNbWords / (2 * count)
        }
      } else {
        progress = count / this.props.writing.constraints.minNbWords * 50
      }
    }

    this.props.dispatch(updateNbWords(count))
    this.props.dispatch(updateProgress(progress))
    this.throttledSave()
  }

  focusEditor () {
    const state = this.state.state
    .transform()
    .focus()
    .apply()

    this.setState({state})
  }

  save () {
    if (this.props.writing.lastSave > 3) {
      this.props.dispatch(saveWritingLocalstorage())
    }
  }

  displayModal (message, onConfirm, onCancel, confirmMessage, cancelMessage) {
    this.setState({
      modal: <ConfirmModal message={message}
                           onConfirm={onConfirm}
                           onCancel={onCancel}
                           confirmText={confirmMessage}
                           cancelText={cancelMessage} />
    })
  }

  dismissModal () {
    this.setState({
      modal: null
    })
  }

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} e
   * @param {String} type
   */
  onClickMark = (e, type) => {
    e.preventDefault()
    let {state} = this.state

    const sizes = ['sizeOne', 'sizeTwo', 'sizeThree']
    if (sizes.indexOf(type) > -1) {
      sizes.map((size) => {
        if (size !== type) {
          state = state.transform().removeMark(size).apply()
        }
        return null
      })
    }
    state = state.transform().toggleMark(type).apply()
    this.setState({state})
  }

  insertImage = (state, src) => {
    return state
    .transform()
    .insertBlock({
      type: 'image',
      isVoid: true,
      data: {src}
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
    let {state} = this.state
    const transform = state.transform()
    const {document} = state

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'image') {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')
      if (isList) {
        transform
        .setBlock(isActive ? DEFAULT_NODE : type)
        .unwrapBlock('bulleted-list')
      } else {
        transform.setBlock(isActive ? DEFAULT_NODE : type)
      }
    } else if (type === 'image') {
      this.displayImagePopover()
    } else {
      const isList = this.hasBlock('list-item')
      const isType = state.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type)
      })

      if (isList && isType) {
        transform.setBlock(DEFAULT_NODE).unwrapBlock('bulleted-list')
      } else {
        transform.setBlock('list-item').wrapBlock(type)
      }
    }

    state = transform.apply()
    this.setState({state})
  }

  displayImagePopover () {
    this.setState({imagePopoverDisplayed: true})
  }

  dismissImagePopover () {
    this.setState({imagePopoverDisplayed: false})
  }

  imageUploadSucceeded (url) {
    if (!url) return
    let {state} = this.state
    state = this.insertImage(state, url)
    this.onChange(state)
  }

  handleTitleChange (e) {
    this.props.dispatch({
      type: 'SET_TITLE',
      payload: e.target.value
    })
  }

  renderImagePopover () {
    return (
      <div className='popover-background' onClick={(e) => {
        e.preventDefault()
        this.dismissImagePopover()
      }}>
        <div className='image-popover'>
          <Uploader api='http://file.nightzookeeper.com/images/upload'
                    uploadedImage={this.imageUploadSucceeded.bind(this)}/>
        </div>
        <style jsx>{styles}</style>
      </div>)
  }

  /**
   * Render.
   *
   * @return {Element}
   */

  render = () => {

    const titlebarClassNames = cn({
      titleBar: true,
      dark: this.props.light,
      light: !this.props.light
    })

    return (
      <div className='host' style={{
        boxShadow: `${this.props.light ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'} 0px 60px 59px 140px`
      }}>
        {this.renderToolbar()}

        <div className='writer' ref='writer'>
          {this.props.needsTitle
            ? <div>

              <input className={titlebarClassNames} type='text' placeholder={'Enter your title here'} style={{
                color: this.props.light ? 'black' : 'white',
                background: `${this.props.light ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'}`,
                borderBottom: `5px solid ${this.props.primaryColor}`
              }} value={this.props.writing.title} onChange={this.handleTitleChange.bind(this)}/>


            </div>
            : null}

          {this.renderEditor()}

          {this.state.modal}

        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }

  saveAction () {
    this.exportAsPdf()
  }

  /**
   * Render the toolbar.
   *
   * @return {Element}
   */

  renderToolbar = () => {
    return (
      <div
        style={{
          color: this.props.light ? 'black' : 'white'
        }}
      >

        <div className='menu toolbar-menu'
             style={{
               backgroundColor: this.props.primaryColor,
               color: this.props.light ? 'black' : 'white'
             }}>

          <div className='toolbar-button'>
            <Button bgColor='white' shadow round onClick={this.props.backCallback ? () => {
              this.displayModal("Are you sure? Have you saved your work?", () => { this.clear(); this.props.backCallback() }, this.dismissModal.bind(this),  'Yes', 'No')
            } : () => {
            }}>
              <Icon name='left' color='black'/>
            </Button>
          </div>

          {this.props.hideTextStyleButtons ? null : this.renderMarkButton('bold', 'bold')}
          {this.props.hideTextStyleButtons ? null : this.renderMarkButton('italic', 'italic')}
          {this.props.hideTextStyleButtons ? null : this.renderMarkButton('underlined', 'underline')}
          {this.props.hideAlignButtons ? null : this.renderBlockButton('align-left', 'align-left')}
          {this.props.hideAlignButtons ? null : this.renderBlockButton('align-center', 'align-center')}
          {this.props.hideAlignButtons ? null : this.renderBlockButton('align-right', 'align-right')}

          {this.props.hideImageButton ? null : this.renderBlockButton('image', 'picture-o')}

          <div className='toolbar-button save'>
            <Button bgColor='white' shadow onClick={this.saveAction.bind(this)}>SAVE</Button>
          </div>

          {this.props.hideClearButton ? null : <div className='toolbar-button save'>
            <Button bgColor='white' shadow onClick={() => {
              this.displayModal("Are you sure? This will clear everything on the page.", this.clear.bind(this), this.dismissModal.bind(this))
            }}>
              Clear
            </Button>
          </div> }
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
      color: this.props.light ? 'white' : 'black'
    }

    const disabledStyle = {
      opacity: 0.3
    }

    return (
      <span className='button' onMouseDown={isDisabled ? () => {
      } : onMouseDown} data-active={isActive}>
        <span
          style={isDisabled ? disabledStyle : (isActive ? activeStyle : style)}
        >
          <Icon name={icon}/>
        </span>
        <style jsx>{styles}</style>
      </span>
    )
  }

  resizeEditorAnimation ({target}) {
    const editor = target.find({name: 'editor'})
    return new TimelineMax()
    .to(editor, 1, {height: '40px', maxHeight: '100px'})
  }

  onFocus () {
    this.setState({focus: true, toolbarDisabled: false})
    if (this.state.mobile) {
      this.props.onMobileFocus()

      // Disables iPad view pushing
      window.scrollTo(0, 0)
      document.body.scrollTop = 0

      if (window.innerHeight < window.innerWidth) {
        this.refs.writer.style.minHeight = '255px'
        this.refs.writer.style.height = '255px'
      } else {
        this.refs.writer.style.minHeight = '565px'
        this.refs.writer.style.height = '565px'
      }

    }
  }

  virtualKeyboardHeight () {
    return 700
  }

  onBlur () {
    this.setState({focus: false, toolbarDisabled: true})

    if (this.state.mobile) {
      this.refs.writer.style.minHeight = '300px'
      this.refs.writer.style.height = 'calc(100vh - 155px)'
      //  var a = this.refs.writer
      //  a.style.height = 'calc(100vh - 95px)'
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
      <span className='button' onMouseDown={isDisabled ? () => {
      } : onMouseDown} data-active={isActive}>
        <span
          style={isDisabled ? disabledStyle : (isActive ? activeStyle : style)}
        >
          <Icon name={icon}/>
        </span>
        <style jsx>{styles}</style>
      </span>
    )
  }

  recordScreenHeight () {

    /* setTimeout(() => {
     a.scrollTop = a.scrollHeight
     }, 100) */
  }

  onKeyDown () {
    this.recordScreenHeight()
  }

  focus () {
  }

  print () {
    var html = serializer.serialize(this.state.state)

    var printWindow = window.open('', '', 'height=400,width=800')
    printWindow.document.write('<html><head><title>Writing Tool Export</title>')
    printWindow.document.write('</head><body style="margin: 20px; max-width: calc(100vw - 40px);">')
    var content = `<div style="width: 100%; word-wrap: break-word;"><h1>${this.props.writing.title}</h1><div>${html}</div></div>`
    printWindow.document.write('<div id="print">' + content + '</div>')
    printWindow.document.write('<footer>Created by NightZooKeeper</footer>')
    printWindow.document.write('</body></html>')
    //printWindow.print()
    //printWindow.close()
  }

  exportAsPdf () {
    var plain = Plain.serialize(this.state.state)
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

    pdf.fromHTML(content, 15, 15, {
      'width': 175
    }, () => {
      pdf.save('WritingToolExport.pdf')
    })
  }

  /**
   * Render the Slate editor.
   *
   * @return {Element}
   */

  renderEditor = () => {
    return (
      <div className='editor-wrapper' ref='host' style={{
        boxShadow: `0px 149px 207px 72px ${this.props.light ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'}`
      }}>

        <div className='editor' ref='editor' style={{
          background: `${this.props.light ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'}`,
          color: this.props.light ? 'black' : 'white'
        }} onClick={this.focusEditor.bind(this)} name='editor'>

          <Editor
            spellCheck
            placeholder={'Start writing here...'}
            schema={schema}
            ref='slate'
            state={this.state.state}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            onChange={this.onChange}
            onDocumentChange={this.onDocumentChange}
            style={{
              height: '100%'
            }}
          />


        </div>

        {this.state.imagePopoverDisplayed ? this.renderImagePopover() : null}


        <style jsx>{styles}</style>
      </div>
    )
  }
}

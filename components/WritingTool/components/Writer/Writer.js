import React from 'react'
import {Editor, Block, Raw} from 'slate'
import styles from './Writer.styles'
import PropTypes from 'prop-types'
import ProgressBar from '../ProgressBar/ProgressBar'
import {connect} from 'react-redux'
import {textChanged, saveLocalstorage, updateProgress, updateNbWords} from '../../store/actions/writingActions'
import Uploader from '../../../Uploader/Uploader'
import throttle from 'lodash/throttle'
import {FormattedMessage as T} from 'react-intl'
import Icon from '../../../Icon/Icon'
import Button from '../../../Button/Button'

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
        <img src={src} className='importedImage' style={{
          width: '100%',
          marginTop: '20px',
          marginBottom: '20px'
        }}
          {...props.attributes} />
      )
    },
    'bulleted-list': props => <ul {...props.attributes}>{props.children}</ul>,
    'list-item': props => <li {...props.attributes}>{props.children}</li>,
    'heading-one': props => <h1 style={{
      fontSize: '24px'
    }}>{props.children}</h1>,
    'heading-two': props => <h2 {...props.attributes}>{props.children}</h2>,
    'heading-three': props => <p {...props.attributes}>{props.children}</p>
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

@connect((store) => {
  return {
    writing: store.writing
  }
})
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
      imagePopoverDisplayed: false
    }
    this.throttledSave = throttle(this.save, 3000)
  }

  static propTypes = {
    nbWords: PropTypes.number,
    minNbWords: PropTypes.number,
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    light: PropTypes.bool
  }

  static defaultProps = {
    progress: 0,
    primaryColor: '#34D9E0',
    light: false
  }

  componentDidMount () {
    if (/Android|iPad/i.test(navigator.userAgent)) {
      this.setState({mobile: true})
    }

    this.focus()
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
    var count = state.document.text.split(' ').filter(w => w.length > 0).length
    var progress = this.state.progress
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

    this.setState({state: state})
    this.props.dispatch(textChanged(state))
    this.props.dispatch(updateNbWords(count))
    this.props.dispatch(updateProgress(progress))
    this.throttledSave()
    this.recordScreenHeight()
  }

  save () {
    if (this.props.writing.lastSave > 3) {
      this.props.dispatch(saveLocalstorage())
    }
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
      })
    }
    state = state.transform().toggleMark(type).apply()
    this.setState({state})
  }

  insertImage = (state, src) => {
    console.log(src)
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

  renderImagePopover () {
    return (
      <div className='popover-background' onClick={(e) => {
        e.preventDefault()
        this.dismissImagePopover()
      }}>
        <div className='image-popover'>
          <Uploader api='http://localhost:3000/images/upload' uploadedImage={this.imageUploadSucceeded.bind(this)} />
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
    return (
      <div>
        {this.renderToolbar()}
        {this.renderEditor()}
      </div>
    )
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
            <Button bgColor='white' shadow round>
              <Icon name='left' color='black' />
            </Button>
          </div>

          {this.renderMarkButton('bold', 'format_bold')}
          {this.renderMarkButton('italic', 'format_italic')}
          {this.renderMarkButton('underlined', 'format_underlined')}
          {this.renderBlockButton('image', 'image')}

          <div className='toolbar-button save'>
            <Button bgColor='white' shadow>SAVE</Button>
          </div>
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
  renderMarkButton = (type, icon, size = null, lineHeight = null) => {
    const isActive = this.hasMark(type)
    const onMouseDown = e => this.onClickMark(e, type)

    return (
      <span className='button' onMouseDown={onMouseDown} data-active={isActive}>
        <span
          className='material-icons'
          style={{
            backgroundColor: isActive ? 'rgba(0,0,0,0.04)' : null,
            color: isActive ? 'grey' : null,
            cursor: 'pointer',
            fontSize: size,
            lineHeight: lineHeight
          }}
        >
          {icon}
        </span>
        <style jsx>{styles}</style>
      </span>
    )
  }

  onFocus () {
    this.setState({focus: true})
    /* if (this.state.mobile) {
     var a = document.getElementsByClassName('editor')[0]
     a.style.maxHeight =
     parseInt(
     window.innerHeight
     .split('')
     .splice(window.innerHeight.split('').length - 3, 2)
     .join('')
     ) - this.virtualKeyboardHeight()
     } */
  }

  onBlur () {
    this.setState({focus: false})

    if (this.state.mobile) {
      var a = document.getElementsByClassName('editor')[0]
      a.style.maxHeight = '100%'
    }
  }

  renderBlockButton = (type, icon) => {
    const isActive = this.hasBlock(type)
    const onMouseDown = e => this.onClickBlock(e, type)

    return (
      <span className='button' onMouseDown={onMouseDown} data-active={isActive}>
        <span
          className='material-icons'
          style={{
            backgroundColor: isActive ? 'rgba(0,0,0,0.04)' : null,
            color: isActive ? 'grey' : null,
            cursor: 'pointer'
          }}
        >
          {icon}
        </span>
        <style jsx>{styles}</style>
      </span>
    )
  }

  recordScreenHeight () {
    var a = document.getElementsByClassName('editor')[0]

    if (this.state.mobile) {
      a.style.maxHeight = parseInt(window.innerHeight) - 370 + 'px'
    }

    /* setTimeout(() => {
     a.scrollTop = a.scrollHeight
     }, 100) */
  }

  onKeyDown () {
    this.recordScreenHeight()
  }

  focus () {
  }

  /**
   * Render the Slate editor.
   *
   * @return {Element}
   */

  renderEditor = () => {
    return (
      <div className='host'>

        <div className='editor' style={{
          background: `linear-gradient(to bottom,
            ${this.props.light ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'} 0%, rgba(0,0,0,0) 100%)`,
          color: this.props.light ? 'black' : 'white'
        }}>

          <T id='editor_placeholder' defaultMessage='Start writing here...'>
            {
              (msg) => <Editor
                spellCheck
                placeholder={msg}
                schema={schema}
                focus={this.focus.bind(this)}
                state={this.state.state}
                onFocus={this.onFocus.bind(this)}
                onBlur={this.onBlur.bind(this)}
                onChange={this.onChange}
              />
            }
          </T>

          {this.state.imagePopoverDisplayed ? this.renderImagePopover() : null}

          <div className='progressBar'>
            <ProgressBar
              nbWords={this.props.writing.nbWords}
              minNbWords={this.props.writing.constraints.minNbWords}
              maxNbWords={this.props.writing.constraints.maxNbWords}
              progress={this.props.writing.progress}
              primaryColor={this.props.primaryColor}
              secondaryColor={this.props.secondaryColor}
              light={this.props.light}
            />
          </div>
        </div>

        <style jsx>{styles}</style>
      </div>
    )
  }
}

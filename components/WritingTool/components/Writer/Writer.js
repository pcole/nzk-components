import React from 'react'
import {Editor, Raw} from 'slate'
import styles from './Writer.styles'
import PropTypes from 'prop-types'
import ProgressBar from '../ProgressBar/ProgressBar'
import {connect} from 'react-redux'
import {textChanged, saveLocalstorage} from '../../store/actions/writingActions'

/**
 * Define the default node type.
 */
const DEFAULT_NODE = 'paragraph'

/**
 * Define a schema.
 *
 * @type {Object}
 */
const schema = {
  nodes: {
    'bulleted-list': props => <ul {...props.attributes}>{props.children}</ul>,
    'list-item': props => <li {...props.attributes}>{props.children}</li>,
    'heading-one': props => <h1 {...props.attributes}>{props.children}</h1>,
    'heading-two': props => <h2 {...props.attributes}>{props.children}</h2>,
    'heading-three': props => <p {...props.attributes}>{props.children}</p>
  },
  marks: {
    bold: {
      fontWeight: 'bold'
    },
    italic: {
      fontStyle: 'italic'
    },
    underlined: {
      textDecoration: 'underline'
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
      focus: false
    }
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
    var nbWords = Math.abs(count - this.state.wordCount)

    if (count > this.state.wordCount) { // Addition
      if (count / this.props.minNbWords * 50 > 50) {
        for (let i = 0; i < nbWords; i++) {
          progress += this.props.minNbWords / (2 * count)
        }
      } else {
        progress = count / this.props.minNbWords * 50
      }
    } else if (count < this.state.wordCount) { // Deletion
      if (count / this.props.minNbWords * 50 > 50) {
        for (let i = 0; i < nbWords; i++) {
          progress -= this.props.minNbWords / (2 * count)
        }
      } else {
        progress = count / this.props.minNbWords * 50
      }
    }

    this.setState({state: state, wordCount: count, progress: progress})
    this.props.dispatch(textChanged(state))

    if (this.props.writing.lastSave > 3) {
      this.props.dispatch(saveLocalstorage())
    }
    this.recordScreenHeight()
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

    state = state.transform().toggleMark(type).apply()

    this.setState({state})
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
    if (type !== 'bulleted-list') {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')
      if (isList) {
        transform
          .setBlock(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
      } else {
        transform.setBlock(isActive ? DEFAULT_NODE : type)
      }
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
        className='menu toolbar-menu'
        style={{
          backgroundColor: this.props.primaryColor,
          color: this.props.light ? 'black' : 'white'
        }}
      >
        {this.renderMarkButton('bold', 'format_bold')}
        {this.renderMarkButton('italic', 'format_italic')}
        {this.renderMarkButton('underlined', 'format_underlined')}
        {this.renderBlockButton('heading-one', 'looks_one')}
        {this.renderBlockButton('heading-two', 'looks_two')}
        {this.renderBlockButton('heading-three', 'looks_3')}
        {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
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
    const onMouseDown = e => this.onClickMark(e, type)

    return (
      <span className='button' onMouseDown={onMouseDown} data-active={isActive}>
        <span
          className='material-icons'
          style={{
            backgroundColor: isActive ? 'rgba(0,0,0,0.04)' : null,
            color: isActive ? 'grey' : null
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
            color: isActive ? 'grey' : null
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

    setTimeout(() => {
      a.scrollTop = a.scrollHeight
    }, 100)
  }

  onKeyDown () {
    this.recordScreenHeight()
  }

  /**
   * Render the Slate editor.
   *
   * @return {Element}
   */

  renderEditor = () => {
    return (
      <div className='host'>

        <div className='editor'>
          <Editor
            spellCheck
            placeholder={'Start writing here...'}
            schema={schema}
            state={this.state.state}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            onChange={this.onChange}
          />

          <ProgressBar
            nbWords={this.state.wordCount}
            minNbWords={this.props.minNbWords}
            maxNbWords={this.props.maxNbWords}
            progress={this.state.progress}
            primaryColor={this.props.primaryColor}
            secondaryColor={this.props.secondaryColor}
            light={this.props.light}
          />
        </div>

        <style jsx>{styles}</style>
      </div>
    )
  }
}

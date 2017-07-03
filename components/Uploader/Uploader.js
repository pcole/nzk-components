import React from 'react'
import styles from './Uploader.styles'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import PropTypes from 'prop-types'

export default class Uploader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      progress: 0,
      images: []
    }
    this.onDrop = this.onDrop.bind(this)
  }

  static propTypes = {
    uploadedImage: PropTypes.func
  }

  uploadOver () {
    setTimeout(() => {
      this.setState({progress: 0})
    }, 2000)
  }

  onDrop (file) {
    this.setState(() => {
      return {
        progress: 0
      }
    })
    var data = new window.FormData()
    data.append('image', file[0])

    var config = {
      onUploadProgress: progressEvent => {
        var percentCompleted = Math.round(
          progressEvent.loaded * 100 / progressEvent.total
        )
        this.setState({progress: percentCompleted})
        if (percentCompleted === 100) {
          this.uploadOver()
        }
      }
    }
    const _ = this
    axios
      .post(this.props.api, data, config)
      .then(res => {
        this.props.uploadedImage(res.data.url)
        var images = this.state.images.slice()
        images.push(res.data.url)
        _.setState(() => {
          return {
            images: images
          }
        })
      })
      .catch(err => {
        window.alert('Erroooor')
        console.log(err)
      })
  }

  render () {
    return (
      <div>
        <div
          className='drop-zone'
          style={{
            position: 'relative',
            height: '200px',
            width: '200px',
            cursor: 'pointer'
          }}
        >
          <div
            className='progress'
            style={{
              width: `${this.state.progress}%`,
              background: 'rgba(107, 188, 102, 0.7)'
            }}
          >
            {' '}
          </div>

          {this.props.api
            ? <Dropzone accept='image/jpeg, image/png' onDrop={this.onDrop}>
              {this.state.progress > 0
                ? <div className='progress-label'>{this.state.progress}%</div>
                : <div className='label'>Drag an image in the zone or click</div>}
            </Dropzone>
            : <p> Missing API to Component </p>}
        </div>
        { /*  <ul>
         {this.state.images.map((img, i) => {
         return <li key={i}><img src={img} style={{ width: '80%' }} /></li>
         })}
         </ul> */ }
        <style jsx>{styles}</style>

      </div>
    )
  }
}

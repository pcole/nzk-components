import React from 'react'
import styles from './Footer.styles'

export default class Footer extends React.Component {
  render () {
    return (
      <div className='host'>
        <div className='links'>
          <div className='column'>
            <a href='/'>Home</a>
            <a href='/learn-more'>Learn More</a>
            <a href='/curriculum'>Curriculum</a>
          </div>
          <div className='column'>
            <a href='/edu/lesson-hive'>Lesson Hive</a>
            <a href='/edu/night-times'>Student Showcase</a>
            <a href='http://nightzooteacher.com'>Blog</a>
          </div>
          <div className='column'>
            <a href='/contact'>Contact</a>
            <a href='/terms-and-conditions'>Terms &amp; Conditions</a>
            <a href='/privacy'>Privacy Policy</a>
          </div>
          <div className='socials'>
            <a href='https://twitter.com/nightzookeeper' target='_blank'>
              <i>
                <svg
                  viewBox='0 0 512 512'
                  style={{
                    verticalAlign: 'middle',
                    width: '24px',
                    height: '24px',
                    fill: 'grey'
                  }}
                >
                  <g>
                    <path d='m498 107c-18 8-37 13-57 15 21-12 36-31 44-55-19 12-41 20-63 24-18-19-44-31-73-31-54 0-99 45-99 99 0 8 1 16 3 23-83-4-156-44-204-104-9 15-14 32-14 50 0 35 18 65 44 83-16-1-31-5-45-13 0 1 0 1 0 1 0 48 34 89 80 98-8 2-17 3-26 3-7 0-13 0-19-2 13 40 49 68 93 69-34 27-77 43-123 43-8 0-16-1-24-2 44 28 96 45 152 45 182 0 282-151 282-282 0-5 0-9 0-13 19-14 36-31 49-51z' />
                  </g>
                </svg>
              </i>
            </a>
            <a href='https://www.facebook.com/nightzookeeper' target='_blank'>
              <i class='L6JCB'>
                <svg
                  viewBox='0 0 512 512'
                  style={{
                    verticalAlign: 'middle',
                    width: '24px',
                    height: '24px',
                    fill: 'grey'
                  }}
                >
                  <g>
                    <path d='m448 28l-385 0c-19 0-35 16-35 35l0 385c0 20 16 36 35 36l385 0c20 0 36-16 36-36l0-385c0-19-16-35-36-35z m-166 433l0-168-56 0 0-42 56 0 0-60c0-24 7-43 20-56 13-12 31-19 53-19 15 0 29 1 39 2l0 36-24 0c-43 0-44 33-44 44l0 53 64 0-6 42-58 0 0 168z' />
                  </g>
                </svg>
              </i>
            </a>
          </div>
        </div>
        <div className='wonky-star'>
          <div className='wonky-star-logo'>
            <img
              alt='Wonkey Star Logo'
              src='https://dogottrtuoo78.cloudfront.net/assets/be3a8859.png'
            />
          </div>
          <div className='wonky-star-label'>
            <div>2011-2017. Wonky Star Ltd</div>
            <div>Registered Company No. 07706300</div>
          </div>
        </div>
        <style jsx>{styles}</style>

      </div>
    )
  }
}

export default `
  .host {
    position: relative;
    height: 100vh;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    float: right;
    overflow-x: hidden;
    overflow-y: hidden;
    z-index: 100;
    width: 100%;
  }

  .host-inner {
    position: absolute;
    top: 0;
    padding: 13px 0px 100px 0px;
    min-width: 415px;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  
  .host-inner * {
    -webkit-transform: translate3d(0,0,0);
  }

  .prompt {
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 15px;
  }

  .prompt-header {
    display: block;
    text-align: center;
  }

  .prompt-icon {
    height: 30px;
    width: 30px;
    vertical-align: bottom;
    display: inline-block;
    margin-right: 10px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .prompt-title {
    display: inline-block;
    font-size: 26px;
    letter-spacing: 1.2px;
    font-family: 'Libre Baskerville', Baskerville, "Baskerville Old Face", "Hoefler Text", Garamond, "Times New Roman", serif;
    font-feature-settings: "kern" 1, "liga" 1, "calt" 1, "pnum" 1, "tnum" 0, "onum" 1, "lnum" 0, "dlig" 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.2em;
  }

  .prompt-content {
    display: flex;
    margin-top: 12px;
    margin-left: 5px;
  }

  .read-more {
    font-weight: bold;
    text-decoration: underline;
  }
  
  .prompt-image {
    position: relative;
    display: inline-block;
    width: 40%;
    height: auto;
    float: left;
    margin-right: 20px;
  }

  .prompt-image.full {
    float: none;
    margin: 0px auto 0px auto;
    display: block;
  }

  .prompt-image.portrait {
    width: 25%;
  }

  .prompt-description {
    display: block;
    min-width: 100%;
    font-size: 1.2em;
    line-height: 1.2em;
  }

  .read-more, .read-less {
    cursor: pointer;
  }

  .bottom-gradient {
    position: fixed;
    bottom: 40px;
    left: 0;
    height: 20px;
    width: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)
  }

  .section-container:nth-child(odd) {
    background-color: rgba(255,255,255,.1);
  }

  .section-container{
    padding: 15px;
  }
`

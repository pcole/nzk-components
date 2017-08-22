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
    padding: 30px 15px 100px 15px;
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
    font-size: 24px;
  }

  .prompt-content {
    display: flex;
    min-height: 150px;
    margin-top: 20px;
    margin-left: 5px;
  }

  .read-more {
    font-weight: bold;
    text-decoration: underline;
  }
  
  .prompt-image {
    position: relative;
    display: inline-block;
    min-width: 40%;
    height: 150px;
    float: left;
    max-width: 300px;
    margin-right: 20px;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .prompt-image.full {
    float: none;
    margin: 0px auto 0px auto;
    min-width: 80%;
    display: block;
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
`

export default `
  @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
 
  .titleArea {
    display: block;
    width: 100%;
    height: 100px;
    background: red;
  }
  
  .exitButton {
    display: inline-block;
    height: 35px;
    width: 35px;
    transform: translateY(2.5px);
    margin-left: 40px;
    border-radius: 50%;
    margin-right: 24px;
    text-align: center;
    line-height: 40px;
    background-color: white;
    color: black;
  }
  
  .exitButton .icon {
    display: inline-flex;
    vertical-align: middle;  
  }
  
  .writer {
    position: absolute;
    top: 0;
    width: 100%;
    margin-top: 55px;
    height: calc(100vh - 95px);
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .writer * {
    -webkit-transform: translate3d(0,0,0);
  }
  
  .menu.toolbar-menu {
    position: absolute;
    display: inline-block;
    padding-right: 5px;
    padding-left: 40px;
    height: 55px;
    background: white;
    z-index: 5;
    line-height: 63px;
    width: 100%;
  }
  
  .menu.toolbar-menu .material-icons:nth-child(n) {
    display: inline-flex;
    vertical-align: middle;
  }
  
  .toolbar-button {
    display: inline-block;
    transform: translateY(5px);
  }
  
  .toolbar-button.save {
    margin-left: 30px;
  }

  
  .menu.toolbar-menu .button {
    margin-left: 28px;
    font-size: 23px;
  }
  
  .host {
    position: relative;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    z-index: 0;
  }
  
  .editor {
    position: relative;
    font-family: 'Libre Baskerville', Baskerville, "Baskerville Old Face", "Hoefler Text", Garamond, "Times New Roman", serif;
    font-feature-settings: "kern" 1, "liga" 1, "calt" 1, "pnum" 1, "tnum" 0, "onum" 1, "lnum" 0, "dlig" 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
    padding-top: 30px;
    padding-right: 60px;
    padding-left: 40px;
    color: white;
    min-height: 300px;
    font-size: 18px;
    margin: auto auto;
  }
  
  .popover-background {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.9);
    z-index: 20;
  }
  
  .image-popover {
    position: absolute;
    top: calc(50% - 150px);
    height: 300px;
    width: 300px;
    left: calc(50% - 150px);
    z-index: 21;
  }
  
  .importedImage {

  }
  
  .progressBar {
    position: fixed;
    bottom: 0;
    z-index: 10;
    width: 100%;
  }
  
  .editor:nth-child(n) {

  }
  
  .button:active {
  }
  
  .titleBar {
    opacity: 1;
    height: 60px;
    width: 100%;
    padding-right: 0px;
    padding-left: 40px;
    outline: none;
    font-size: 24px;
    width: auto !import;
    background: transparent;
    border: none;
    font-family: 'Libre Baskerville', Baskerville, "Baskerville Old Face", "Hoefler Text", Garamond, "Times New Roman", serif;
    font-feature-settings: "kern" 1, "liga" 1, "calt" 1, "pnum" 1, "tnum" 0, "onum" 1, "lnum" 0, "dlig" 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
  }
  
  .titleBar.dark::placeholder {
    color: black
  }
  
  .titleBar.light::placeholder {
    color: white
  }
 
  
  .title-bar:focus {
    opacity: 1;
  }
`

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
  
  .menu.toolbar-menu {
    display: inline-block;
    position: relative;
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
  
  .editor {
    position: relative;
    font-family: 'Libre Baskerville', Baskerville, "Baskerville Old Face", "Hoefler Text", Garamond, "Times New Roman", serif;
    font-feature-settings: "kern" 1, "liga" 1, "calt" 1, "pnum" 1, "tnum" 0, "onum" 1, "lnum" 0, "dlig" 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
    padding: 50px 0px 0 20px;
    padding-top: 30px;
    padding-right: 40px;
    padding-left: 40px;
    min-height: 300px;
    max-width: 100%;
    max-height: calc(100vh - 200px);
    padding-bottom: 60px;
    margin-bottom: 40px;
    overflow-y: scroll;
    color: white;
    font-size: 18px;
  }
  
  .popover-background {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0,0,0,0.7);
    z-index: 10;
  }
  
  .image-popover {
    position: fixed;
    top: calc(50% - 170px);
    height: 300px;
    width: 300px;
    left: calc(50% - 250px);
    z-index: 11;
  }
  
  .importedImage {

  }
  
  .progressBar {
    position: fixed;
    background: red;
    width: 100%;
  }
  
  .editor:nth-child(n) {

  }
  
  .button:active {
  }
`

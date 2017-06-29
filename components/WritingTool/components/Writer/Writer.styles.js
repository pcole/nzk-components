export default `
  @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
 
  .titleArea {
    display: block;
    width: 100%;
    height: 100px;
    background: red;
  }
  
  .menu.toolbar-menu {
    width: 100%;
    padding-right: 170px;
    height: 40px;
    background: white;
    line-height: 54px;
    z-index: 5;
  }
  
  .menu.toolbar-menu .button {
    margin-left: 30px;
  }
  
  .editor {
    position: relative;
    padding: 50px 0px 0 20px;
    padding-right: 40px;
    padding-left: 40px;
    max-width: 100%;
    max-height: calc(100vh - 190px);
    padding-bottom: 60px;
    overflow-y: scroll;
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
  
  .editor:nth-child(n) {

  }
  
  .button:active {
  }
`

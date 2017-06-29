export default `

  .host {
    padding: 0;
    margin: 0;
    max-width: 100vw;
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    opacity: 0.3;
    z-index: -5;
  }
  
  .title-bar {
    opacity: 0.4;
    height: 60px;
    width: 100%;
    padding-right: 140px;
    padding-left: 20px;
    outline: none;
    font-size: 20px;
    width: auto !import;
    border: none;
    background: rgba(0,0,0,0);
  }
  
  .top-border {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 10px;
  }
  
  .title-bar:focus {
    opacity: 1;
  }
  
  .left-margin {
    position: absolute;
    left: 0;
    top: 0;
    height: 100vh;
    width: 10px;
  }

  .left {
    display: inline-block;
    max-width: calc(100vw - 75px);
    min-width: 440px;
  }
  
  .right {
    float: right;
    height: 100%;
    z-index: 5;
    display: inline-block;
  }  
  

  @media screen and (max-width: 1024px) {
     .left {
       width: calc(100vw - 75px);
     }
     
     .right {
       width: 75px;
     }
  }
  
  @media screen and (min-width: 1025px) {
     .left {
       width: calc(100vw - 450px);
     }
     
     .right {
       width: 450px;
     }
  }
`

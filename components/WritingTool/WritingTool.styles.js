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
    height: 40px;
    width: 100%;
    padding-right: 140px;
    padding-left: 20px;
    outline: none;
    font-size: 20px;
    width: auto !import;
    border: none;
    background: rgba(0,0,0,0);
  }
  
  .column {
  }

  .left {
    display: inline-block;
    max-width: calc(100vw - 150px);
    min-width: 400px;
  }
  
  .right {
    float: right;
    height: 100%;
    z-index: 5;
    display: inline-block;
  }  
  
  @media screen and (max-width: 840px) {
    .left {
      width: 100vw;
    }
  }
  
  @media screen and (max-width: 1024px) {
     .left {
       width: calc(100vw - 150px);
     }
     
     .right {
       width: 150px;
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

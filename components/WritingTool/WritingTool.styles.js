export default `

  .host {
    padding: 0;
    margin: 0;
    max-width: 100vw;
  }
  
  .column {
  }

  .left {
    display: inline-block;
    max-width: calc(100vw - 150px);
  }
  
  .right {
    float: right;
    height: 100%;
    z-index: 5;
    display: inline-block;
  }
  
  @media screen and (max-width: 1024px) {
     .left {
       width: calc(100vw - 150px);
     }
  }
  
  @media screen and (min-width: 1024px) {
     .left {
       width: calc(100vw - 450px);
     }
  }
`

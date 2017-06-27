export default `
  .host {
    position: fixed;
    width: 100%;
    background: blue;
    z-index: 1;
    bottom: 0px;
    left: 0px;
  }
  
  .full-bar {
    position: relative;
    height: 40px;
    background: red;
  }
  
  .progress {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: green;
  }
  
  .counter {
    position: absolute;
    height: 100%;
    line-height: 40px;
    font-size: 24px;
    left: 40px;
    color: white;
  }
  
  .limit {
    position: absolute;
    left: 50%;
    color: white;
  }
  
  .limit:before {
    position: absolute;
    content: '';
    height: 40px;
    top: 0;
    left: -10px;
    width: 5px;
    background: white;
    
  }
  
`

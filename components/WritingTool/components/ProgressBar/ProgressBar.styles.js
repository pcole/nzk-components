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
    transition: width 0.5s linear;
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
    left: calc(50% + 20px);
    color: white;
    height: 40px;
    line-height: 40px;
    font-size: 23px;
  }
  
  .min.flag {
    left: calc(50% - 30px);
  }
  
  .max.flag {
    right: 50px;
  }
  
  .flag {
    position: absolute;
    content: '';
    height: 75px;
    top: -35px;
    border-radius: 5px 5px 0 0;
    width: 5px;
    background: white;
  }
  
  .flag:after {
    position: absolute;
    content: '';
    top: 5px;
    left: 5px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 15px 0 15px 30px;
    border-color: transparent transparent transparent #000;
  }
  
  .min.bar {
    left: 50%;
  }
  
  .max.bar {
    right: 50px;
  }
  
  .bar {
    position: absolute;
    content: '';
    height: 40px;
    top: 0px;
    width: 5px;
    background: white;
  }
   
  @media screen and (max-width: 1024px) {
     .host {
       width: calc(100vw - 20px);
     }  
  }
  
  @media screen and (min-width: 1024px) {
     .host {
       width: calc(100vw - 340px);
     }  
  }
`

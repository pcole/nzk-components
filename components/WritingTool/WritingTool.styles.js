export default `

  .host {
    padding: 0;
    margin: 0;
    max-width: 100vw;
  }
  
  .right {
    float: right;
    position: relative;
  }
  
    .buttons {
      position: absolute;
      left: -50px;
      z-index: 2;
      height: 50px;
      width: 50px;
      border-radius: 9px 0px 0px 9px;
      cursor: pointer;
    }
    
    .buttonBackground {
      position: absolute;
      height: 50px;
      width: 50px;
      left: -50px;
      border-radius: 9px 0px 0px 9px;
    }
    
    .withTitle {
      top: 140px;
    }
    
    .withoutTitle {
      top: 70px;
    }
    
      .progressBar {
    position: fixed;
    bottom: 0;
    z-index: 10;
    width: 100%;
  }
    
    .buttons div:nth-child(n) {
      display: block;
      width: 40px;
      height: 40px;
      line-height: 50px;
      margin-left: 6px;
      text-align: center;
      margin-top: 4px;
      border-radius: 50%;
      background: yellow;
      box-shadow: 0 3px 0 rgba(0,0,0,0.2);
    }
    
    .buttons div:nth-child(n):active {
      box-shadow: 0 0px 0 rgba(0,0,0,0.2);
      transform: translateY(3px);
    }
    
    
    
    .buttons div.disabled {
      line-height: 42px;
      background: rgba(0,0,0,0) !important;
      border-width: 3px;
      border-style: solid;
    }

  .background {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    opacity: 1;
    z-index: -5;
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
    max-width: calc(100vw - 30px);
    min-width: 508px;
  }
  
  .right {

    float: right;
    height: 100%;
    z-index: 5;
    display: inline-block;
  }
  

  @media screen and (max-width: 1280px) {
     .left {
       width: calc(100vw - 30px);
     }
     
     .right {
       width: 30px;
       transform: translateX(0px);
     }
 
     .right.planningExpanded {
       width: 415px;
     }
     
     .left.planningExpanded {
       width: calc(100vw - 415px);
     }

  }
  
  @media screen and (min-width: 1281px) {
     .left {
       width: calc(100vw - 30px);
     }
     
     .right {
       width: 30px;
       transform: translateX(0px);
     }
     
     .right.planningExpanded {
       width: 40%;
     }
     
     .left.planningExpanded {
       width: 60%;
     }
     
         
    .buttons div:nth-child(n) {
      display: none;
    }
    
    .buttonBackground {
      display: none;
    }
  }
  
    @media screen and (max-width: 925px) {
      .right {
        position: absolute;
        right: 0;
        top: 0;
      }
      
      .left {
      
      }
      
      .right.planningExpanded {
      
      }

      .left.planningExpanded {
        
      }

    }
`

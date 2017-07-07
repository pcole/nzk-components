export default `

    .input {
      outline: none;
      font-size: 20px;
      text-align: center;
      width: auto !import;
      border: none;
      font-family: 'Libre Baskerville', Baskerville, "Baskerville Old Face", "Hoefler Text", Garamond, "Times New Roman", serif;
      font-feature-settings: "kern" 1, "liga" 1, "calt" 1, "pnum" 1, "tnum" 0, "onum" 1, "lnum" 0, "dlig" 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      line-height: 1.5;
    }
    
    .icon {
      
    }
    
    .block {
      display: block;
      width: 100% !important;
    }
    
    .borders {
      border: 1px solid black;
    }
    
    .button {
      box-shadow: 0px 4px 0px rgba(0,0,0,0.25);
      border-radius: 10px;
      cursor: pointer;
    }
    
    .button:active {
      transform: translateY(4px);
      box-shadow: 0px 0px 0px rgba(0,0,0,0.25);
    }
    
    .input {
      position: relative;
    }
    
    .value {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      color: white;
      width: 100%;
      background-color: red;
    }
    
    .removeButton {
      position: absolute;
      top: -5px;
      right: -5px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      cursor: pointer;
      color: white;
      line-height: 20px;
    }
    
    .dark {
      background-color: white;
      color: black;
    }
    
    .light {
      background-color: black;
      color: white;
    }
    
    li.stacking {
      width: 100%;
      margin: 4px;
    }
    
    input {
      border-radius: 5px;
    }
    
    textarea {
      border-radius: 5px;
    }

`

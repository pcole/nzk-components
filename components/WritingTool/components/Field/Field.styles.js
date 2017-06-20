export default `
    
    .input {
      outline: none;
      font-size: 20px;
      text-align: center;
      width: auto !import;
      border: none;
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
    }
    
    .button:active {
      transform: translateY(4px);
      box-shadow: 0px 0px 0px rgba(0,0,0,0.25);
    }
    
    .input {
      position: relative;
    }
    
    .removeButton {
      position: absolute;
      top: -5px;
      right: -5px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      cursor: pointer;
    }
    
    .light {
      background-color: white;
      color: black;
    }
    
    .dark {
      background-color: black;
      color: white;
    }
    

`

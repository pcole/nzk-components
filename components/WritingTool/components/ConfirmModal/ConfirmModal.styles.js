export default `

    .host {
      position: absolute;
      height: 100vh;
      width: 100vw;
      top: 0;
      left: 0;
      z-index: 9999;
      background-color: rgba(0,0,0,0.8); 
      color: white;     
    }
    
    .modal {
      position: absolute;
      width: 400px;
      top: calc(50% - 100px);
      left: calc(50% - 200px);
      z-index: 1000;
      border-radius: 10px;
      padding: 20px;
      font-size: 22px;
      text-transform: uppercase;
      font-family: 'Open Sans';
      font-weight: bold;
      text-align: center;
    }
    
    .buttons {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-top: 30px;
    }

`

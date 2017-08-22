export default `
  .host {
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background-color: transparent;
  }

  .modal {
    position: absolute;
    width: 400px;
    top: calc(50% - 100px);
    left: calc(50% - 200px);
    border-radius: 10px;
    padding: 20px;
    font-size: 22px;
    color: white;
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

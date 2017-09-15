export default `
  .host {
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.7);
    opacity: 0;
    transition: opacity 500ms ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .host.fadeIn {
    opacity: 1;
  }

  .modal {
    max-width: 500px;
    width: 100%;
    border-radius: 10px;
    padding: 20px;
    font-size: 22px;
    color: white;
    font-family: 'Open Sans';
    text-align: center;
  }
    
  .buttons {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 30px;
  }
`

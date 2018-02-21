import css from 'styled-jsx/css'

export default css`
  .host {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 1s ease-in-out;
  }

  .host.fadeIn {
    opacity: 1;
  }

  .spinner {
    display: inline-block;
    animation: 2s infinite spin linear;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

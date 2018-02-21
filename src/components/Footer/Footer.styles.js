import css from 'styled-jsx/css'

export default css`
  .host {
    position: relative;
    color: grey;
    font-feature-settings: normal;
    -webkit-font-smoothing: antialiased;
    width: 70vw;
    padding-left: 15vw;
    padding-right: 15vw;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .links {
    font-size: 20px;
    display: flex;
    margin-top: 20px;
    margin-bottom: 50px;
  }

  .column {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 300px;
    margin-right: 40px;
    line-height: 1.2;
  }

  .wonky-star {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .wonky-star-logo {
    width: 300px;
  }

  .wonky-star-logo {
    width: 180px;
  }

  .wonky-star-logo img {
    width: inherit;
  }

  .wonky-star-label {
    width: 300px;
    margin-left: 158px;
    font-size: 20px;
  }

  .socials a {
    margin-right: 15px;
  }

  .socials {
    position: absolute;
    margin-right: 15vw;
    right: 26px;
  }
`

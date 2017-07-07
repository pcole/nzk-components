export default `

  * {
    font-family: 'Libre Baskerville', Baskerville, "Baskerville Old Face", "Hoefler Text", Garamond, "Times New Roman", serif;
    font-feature-settings: "kern" 1, "liga" 1, "calt" 1, "pnum" 1, "tnum" 0, "onum" 1, "lnum" 0, "dlig" 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
  }
  
  h2 {
    padding: 0px;
    margin: 0;
  }
  
  
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    margin-bottom: 12px;
  }
  

  ul.stacking {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 4px;
    margin-left: -8px;
  }
  
  li.stacking {
    width: 100%;
    margin: 4px;

  }
  
  ul li.stacking {
  }
  
`

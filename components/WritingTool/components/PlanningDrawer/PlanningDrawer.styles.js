export default `
    
    .host {
      position: relative;
      height: 100vh;
      top: 0;
      margin: 0;
      padding: 0;
      float: right;
      overflow-x: hidden;
      overflow-y: hidden;
      z-index: 100;
    }
    

    
    .drawer {
      position: absolute;
      top: 0;
      right: 0;
      padding: 20px 30px;
      padding-bottom: 100px;
      height: calc(100% - 60px);
      overflow-y: scroll;
    }


    
    .buttons {
      position: absolute;
      left: 0px;
      top: 50px;
      height: 50px;
      width: 60px;
      border-radius: 9px 0px 0px 9px;
    }
    
    .buttons div:nth-child(n) {
      display: block;
      width: 40px;
      height: 40px;
      line-height: 50px;
      margin-left: 10px;
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
      box-sizing: border-box;
      line-height: 42px;
      background: rgba(0,0,0,0) !important;
      border-width: 3px;
      border-style: solid;
    }
    
    .story-desc {
      color: white;
    }
    
    .story-desc .title {
      font-size: 24px;
    }
    
    .story-desc .title .icon {
      height: 30px;
      width: 30px;
      border-radius: 50%;
    }
    
    .story-desc .informations {
      min-height: 150px;
      height: 150px;
    }
    
    .story-desc .informations .image {
      position: relative;
      width: 40%;
      max-width: 200px;
      background-color: black;
      background-size: cover;
      background-repeat: no-repeat;
    }
    
    .host.step1 .story-desc .informations .image {
      position: absolute;
      height: 100px;
      top: 80px;
    }
    
    .host.step2 .story-desc .informations .image {
      position: absolute;
      height: 140px;
      margin-top: 5px;
    }
    
    .story-desc .informations .description {
      margin-right: 30px;
    }

    .host.step1 .story-desc .informations .description {
      position: absolute;
      height: 75px;
      top: 80px;
      margin-left: calc(40% + 10px);
    }
    
    .host.step2 .story-desc .informations .description {
      height: 75px;
      height: 140px;
      margin-left: calc(40% + 10px);
    }
    
    @media screen and (max-width: 1200px) {
      .host.step2 .story-desc .informations .description {
        margin-left: calc(40% + 30px);
      }
    }
    
    @media screen and (min-width: 1400px) {
      .host.step2 .story-desc .informations .description {
        margin-left: calc(200px + 10px);
      }
    }
    
    @media screen and (max-width: 1024px) {
        .host.step1 {
          width: 75px;
          transition: width 0.5s ease-in;
        }
        
        .host.step2 {
          width: 415px;
          transition: width 0.5s ease-in;
        }
        
        
        .drawer.step1 {
          right: -340px;
          width: 300px;
          transition: right 0.5s ease-in;
        }
        
        .drawer.step2 {
          right: 0px;
          width: calc(100% - 115px);
        }
    }
    
    @media screen and (min-width: 1024px) {
        .host.step1 {
          min-width: 400px;
          transition: width 0.5s ease-in;
        }
        
        .host.step2 {
          width: 100%;
          transition: width 0.5s ease-in;
        }
        
        .drawer.step1 {
          right: 0;
          width: calc(100% - 115px);
        }
        
        .drawer.step2 {
          right: 0px;
          width: calc(100% - 115px);
        }
    }


`

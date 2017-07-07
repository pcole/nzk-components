export default `
    
    .host {
      position: relative;
      height: 100vh;
      top: 0;
      right: 0;
      margin: 0;
      padding: 0;
      float: right;
      overflow-x: hidden;      
      overflow-y: hidden;
      z-index: 100;
      width: 100%;
    }
    
    .plan-title {
      display: inline-block;
      height: 40px;
      padding-left: 50px;
      line-height: 40px;
    }

    
    .drawer {
      position: absolute;
      top: 0;
      padding: 20px 30px;
      padding-bottom: 100px;
      min-width: 200px;
      height: calc(100% - 60px);
      width: calc(100% - 60px);
      overflow-y: scroll;
      overflow-x: hidden;
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
      margin-top: 20px;
      margin-bottom: 20px;
    }
    
    .story-desc .informations .image {
      position: relative;
      display: inline-block;
      width: 40%;
      height: 100%;
      max-width: 300px;
      background-color: black;
      background-size: cover;
      background-repeat: no-repeat;
    }
    
    .host .story-desc .informations .description {
      display: inline-block;
      width: calc(60% - 20px);
      margin-left: 20px;
      transform: translateY(-50%);
      height: 100%;
    }

    
    
    @media screen and (max-width: 900px) {
      .host.step2 {
        position: absolute;
        right: 0;
      }
      
      .host.step1 {
        position: absolute;
        right: 0;
      }

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
   


`

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
      box-sizing: content-box;
      min-width: 365px;
      height: calc(100% - 60px);
      width: calc(100% - 40px);
      overflow-y: scroll;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
    }
    
    .drawer * {
        -webkit-transform: translate3d(0,0,0);
    }
    
    .story-desc {
      color: white;
    }
    
    .story-desc .title {
      font-size: 24px;
      margin-top: -15px;
    }
    
    .story-desc .title .icon {
      height: 30px;
      width: 30px;
      border-radius: 50%;
    }
    
    .story-desc .informations {
      display: flex;
      min-height: 150px;
      height: 150px;
      margin-top: 10px;
      margin-bottom: 20px;
    }
    
    .story-desc .informations .image {
      position: relative;
      display: inline-block;
      width: 40%;
      height: 100%;
      max-width: 300px;
      background-size: cover;
      background-repeat: no-repeat;
    }
    
    .host .story-desc .informations .description {
      display: flex;
      width: calc(60% - 20px);
      margin-left: 20px;      
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
      
      .drawer {
         height: calc(100% - 140px);
      }
    }
    
    @media screen and (min-width: 1400px) {
      .host.step2 .story-desc .informations .description {
        margin-left: calc(200px + 10px);
      }
    }
   


`

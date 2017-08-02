export default `
 .host {
  height: 100vh;
  width: 100vw;
  background: rgba(0,0,0,0.6);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
 }
 
 
 .container {
   position: absolute;
   width: 100%;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   background: white;
 }
 
 .title {
  text-align: center;
  font-size: 26px;
  padding-top: 30px;
  padding-bottom: 15px;
 }
 
 
 .picker {
  display: flex;
  background: white;
  padding: 20px;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 400px;
  margin: auto auto;
  vertical-align: middle;
  border-radius: 10px;
  padding-left: 40px;
 }
 
 .button {
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background: red;
  box-shadow: 0 6px 0 rgba(0,0,0,0.6);
  margin-right: 20px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
 }
 
 .button:active {
  box-shadow: 0 0 0 black;
  transform: translateY(6px);
 }
 
 .story {
  background-image: url('/assets/story.png');
 }
 
 .poetry {
  background-image: url('/assets/poem.png');
 }
 
 .opinion {
  background-image: url('/assets/persuasive-writing.png');
 }
 
  .letter {
  background-image: url('/assets/letter.png');
 }
 
 .instructions {
  background-image: url('/assets/instructions.png');
 }
 
 .news {
  background-image: url('/assets/news.png');
 }
 

`

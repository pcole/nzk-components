"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var __styledJsxDefaultExport = new String("@import url(\"https://fonts.googleapis.com/icon?family=Material+Icons\");.titleArea{display:block;width:100%;height:100px;background:red}.exitButton{display:inline-block;height:35px;width:35px;-webkit-transform:translateY(2.5px);-ms-transform:translateY(2.5px);transform:translateY(2.5px);margin-left:40px;border-radius:50%;margin-right:24px;-webkit-text-align:center;text-align:center;line-height:40px;background-color:white;color:black}.exitButton .icon{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;vertical-align:middle}.menu.toolbar-menu{display:inline-block;position:relative;padding-right:5px;padding-left:40px;height:55px;background:white;z-index:5;line-height:63px;width:100%}.menu.toolbar-menu .material-icons:nth-child(n){display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;vertical-align:middle}.toolbar-button{display:inline-block;-webkit-transform:translateY(5px);-ms-transform:translateY(5px);transform:translateY(5px)}.toolbar-button.save{margin-left:30px}.menu.toolbar-menu .button{margin-left:28px;font-size:23px}.editor{position:relative;font-family:'Libre Baskerville', Baskerville, \"Baskerville Old Face\", \"Hoefler Text\", Garamond, \"Times New Roman\", serif;font-feature-settings:\"kern\" 1, \"liga\" 1, \"calt\" 1, \"pnum\" 1, \"tnum\" 0, \"onum\" 1, \"lnum\" 0, \"dlig\" 0;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;line-height:1.5;padding-top:30px;padding-right:60px;padding-left:40px;min-height:300px;max-width:100%;max-height:calc(100vh - 220px);overflow-y:scroll;color:white;font-size:18px}.popover-background{position:fixed;top:0;left:0;height:100vh;width:100vw;background-color:rgba(0,0,0,0.7);z-index:10}.image-popover{position:fixed;top:calc(50% - 170px);height:300px;width:300px;left:calc(50% - 250px);z-index:11}.progressBar{position:fixed;z-index:10;width:100%}.title-bar{opacity:0.4;height:60px;width:100%;padding-right:0px;padding-left:40px;outline:none;font-size:24px;width:auto !import;border:none;background:rgba(0,0,0,0);font-family:'Libre Baskerville', Baskerville, \"Baskerville Old Face\", \"Hoefler Text\", Garamond, \"Times New Roman\", serif;font-feature-settings:\"kern\" 1, \"liga\" 1, \"calt\" 1, \"pnum\" 1, \"tnum\" 0, \"onum\" 1, \"lnum\" 0, \"dlig\" 0;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;line-height:1.5}.title-bar:focus{opacity:1}");

__styledJsxDefaultExport.__hash = "11562227131";
__styledJsxDefaultExport.__scoped = "@import url(\"https://fonts.googleapis.com/icon?family=Material+Icons\");.titleArea[data-jsx-ext~=\"21562227131\"]{display:block;width:100%;height:100px;background:red}.exitButton[data-jsx-ext~=\"21562227131\"]{display:inline-block;height:35px;width:35px;-webkit-transform:translateY(2.5px);-ms-transform:translateY(2.5px);transform:translateY(2.5px);margin-left:40px;border-radius:50%;margin-right:24px;-webkit-text-align:center;text-align:center;line-height:40px;background-color:white;color:black}.exitButton[data-jsx-ext~=\"21562227131\"] .icon[data-jsx-ext~=\"21562227131\"]{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;vertical-align:middle}.menu.toolbar-menu[data-jsx-ext~=\"21562227131\"]{display:inline-block;position:relative;padding-right:5px;padding-left:40px;height:55px;background:white;z-index:5;line-height:63px;width:100%}.menu.toolbar-menu[data-jsx-ext~=\"21562227131\"] .material-icons[data-jsx-ext~=\"21562227131\"]:nth-child(n){display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;vertical-align:middle}.toolbar-button[data-jsx-ext~=\"21562227131\"]{display:inline-block;-webkit-transform:translateY(5px);-ms-transform:translateY(5px);transform:translateY(5px)}.toolbar-button.save[data-jsx-ext~=\"21562227131\"]{margin-left:30px}.menu.toolbar-menu[data-jsx-ext~=\"21562227131\"] .button[data-jsx-ext~=\"21562227131\"]{margin-left:28px;font-size:23px}.editor[data-jsx-ext~=\"21562227131\"]{position:relative;font-family:'Libre Baskerville', Baskerville, \"Baskerville Old Face\", \"Hoefler Text\", Garamond, \"Times New Roman\", serif;font-feature-settings:\"kern\" 1, \"liga\" 1, \"calt\" 1, \"pnum\" 1, \"tnum\" 0, \"onum\" 1, \"lnum\" 0, \"dlig\" 0;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;line-height:1.5;padding-top:30px;padding-right:60px;padding-left:40px;min-height:300px;max-width:100%;max-height:calc(100vh - 220px);overflow-y:scroll;color:white;font-size:18px}.popover-background[data-jsx-ext~=\"21562227131\"]{position:fixed;top:0;left:0;height:100vh;width:100vw;background-color:rgba(0,0,0,0.7);z-index:10}.image-popover[data-jsx-ext~=\"21562227131\"]{position:fixed;top:calc(50% - 170px);height:300px;width:300px;left:calc(50% - 250px);z-index:11}.progressBar[data-jsx-ext~=\"21562227131\"]{position:fixed;z-index:10;width:100%}.title-bar[data-jsx-ext~=\"21562227131\"]{opacity:0.4;height:60px;width:100%;padding-right:0px;padding-left:40px;outline:none;font-size:24px;width:auto !import;border:none;background:rgba(0,0,0,0);font-family:'Libre Baskerville', Baskerville, \"Baskerville Old Face\", \"Hoefler Text\", Garamond, \"Times New Roman\", serif;font-feature-settings:\"kern\" 1, \"liga\" 1, \"calt\" 1, \"pnum\" 1, \"tnum\" 0, \"onum\" 1, \"lnum\" 0, \"dlig\" 0;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;line-height:1.5}.title-bar[data-jsx-ext~=\"21562227131\"]:focus{opacity:1}";
__styledJsxDefaultExport.__scopedHash = "21562227131";
exports.default = __styledJsxDefaultExport;
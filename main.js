let inputArr = process.argv.slice(2);

let fs = require('fs');
let path = require('path');
let command  = inputArr[0];
let helpObj = require('./Commands/help');
let treeObj = require('./Commands/tree');
let organizeObj =  require("./Commands/organize");
switch(command){
    case "help":
        helpObj.helpKey();
        break;
    case "organize":
        organizeObj.organizeKey(inputArr[1]);
        break;
    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;
    default:
        console.log("Please 🙏 input right command");
        break;
}
 

 
 

 
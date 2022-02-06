function organizeFn(dirPath){
    //1.Directory path given hogi -> Path folder ka ha ya file ka 
   let destPath;  
   if(dirPath==undefined){
       //console.log('Please enter the directory path');
       destPath = process.cwd();
       dirPath = process.cwd();
       //return;
   }else{
       
       let doesPathExists = fs.existsSync(dirPath);
       if(doesPathExists==true){
            
           let objDetails = fs.lstatSync(dirPath);
           if(objDetails.isFile()){
               console.log('Please enter the directory path');
               return;
           }else{
               //2.create a organize folder
               destPath = path.join(dirPath,"organized_files");
               if(fs.existsSync(destPath)==false){
                   fs.mkdirSync(destPath);
               }
            
           }

       }else{
           console.log('Please enter the correct path');
           return;
       }
   }
   organizeHelper(dirPath,destPath);
  
}

function organizeHelper(src,dest){
//3.file ke category identify
   //sare childs ko read karo and then uske category find karo
   let childNames = fs.readdirSync(src);
   //console.log(childNames,'----!!!!');
   for(let i=0;i<childNames.length;i++){
      
       let childAddress = path.join(src,childNames[i]);
       
       if(fs.lstatSync(childAddress).isFile()){
           //now since  child is file we have to find its category 
           let category = getCategory(childAddress);
           //console.log(childAddress,'belongs to --> ',category);
           //5.cut and paste the content
           sendFile(childAddress,dest,category);

       }  

   }
}
 
function getCategory(name){
   ////4.category ke according ke folder create karna 
   let ext = path.extname(name).slice(1);
   for(let type in types){
       let currTypeArr = types[type]
       for(let i=0;i<currTypeArr.length;i++){
           if(currTypeArr[i]==ext){
               return ext;
           }
       }  
   }
   return "other";
}

function sendFile(srcFile,dest,category){
   // first check ke dest par category exists karte han kya 
   let categoryPath = path.join(dest,category)
   if(fs.existsSync(categoryPath)==false){
       fs.mkdirSync(categoryPath);
   }
   let fileName = path.basename(srcFile);
   let destFilePath = path.join(categoryPath,fileName);
   fs.copyFileSync(srcFile,destFilePath);
   fs.unlinkSync(srcFile);
   console.log(fileName,'---copied to---',category);
}

module.exports = {
    organizeKey:organizeFn
}
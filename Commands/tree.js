function treeFn(dirPath){
    if(dirPath==undefined){
        treeHelper(process.cwd(),"");
        //console.log('Please enter the directory path');
        return;
    }else{

        let doesPathExists = fs.existsSync(dirPath);
        if(doesPathExists==true){
            treeHelper(dirPath,"");
        }else{
            console.log('Please enter the correct path');
            return;
        }
    }
 
}

function treeHelper(dirPath,indent){
    // is file ya folder
    let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile){
        console.log(indent+'├─ '+path.basename(dirPath));
    }else{
        
        console.log(indent+'└─  '+path.basename(dirPath));
        let childNames = fs.readdirSync(dirPath);
        for(let i=0;i<childNames.length;i++){
            treeHelper(path.join(dirPath,childNames[i]),indent+"\t");
        }
    }
}

module.exports = {
    treeKey : treeFn
}
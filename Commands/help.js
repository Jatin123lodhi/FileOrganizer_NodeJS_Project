function helpFn(){
    console.log(
        `List of help commands - 
            1.node main.js help
            2.node main.js tree "directory path"
            3.node main.js organize "directory path" 
        `
    );
}

module.exports = {
    helpKey:helpFn
}
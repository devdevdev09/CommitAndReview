const fs = require("fs");

const jsonFileRead = function(FILE_NAME, FILE_EXT){
    const fileData = fs.readFileSync(FILE_NAME, FILE_EXT);
    
    if(!fileData){
        return null;
    }

    return JSON.parse(fileData);
}

exports.getJsonData = jsonFileRead;

const fs = require("fs");

function logOfRequest(filename){
    return(req,res,next) => {
        fs.appendFile(
            filename,
            `${Date.now()}:${req.ip} ${req.method}: ${req.path}`,
            (err,data)=>{
                next();
            }
        )
    }
};

module.exports = { logOfRequest }
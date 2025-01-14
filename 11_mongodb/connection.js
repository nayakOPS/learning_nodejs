const mongoose = require("mongoose");

// connection
async function connectMongoDB(url){
    return mongoose.connect(url)
    .then(() => {
        console.log("MongoDB Connected");
    }).catch(err => {
            console.log("MongoDB ERR:", err);
        });
}

module.exports={
    connectMongoDB
};
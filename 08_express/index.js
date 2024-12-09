// const http = require("http");

const express = require("express");
        //
       //
const app = express();
// the app is the hamdler function
const port = 8000;

app.get('/',(req,res) => {//this (req,res)only for the / particular route
    return res.send("Hello from Home Page "+req.query.name+" Welcome to our Page"); 
})

app.get('/about',(req,res) => {//this (req,res)only for the /about particular route
    return res.send("Hello from About Page");
})
       
// this hustle also don't need to be done

/* const myServer = http.createServer(app);

myServer.listen(8000, () => {
    console.log('Express Server Started');
}) */

// simply do
app.listen(port, () => {
    console.log(`Express.js Server Started at port ${port}`);
})
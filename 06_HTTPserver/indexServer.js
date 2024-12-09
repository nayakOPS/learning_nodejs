// making our API HTTP server
const http = require("http");

const myServer = http.createServer((req,res)=>{
    // console.log("New Request Received");
    console.log(req.headers);  //request headers are shown like host, connection
    // console.log(req);
    // response to be ended from server
    
    // for not recording the favicon request
    if(req.url === "/favicon.ico") return res.end();
    res.end("Hello From Server");
}); // hanlder function(a.k.a the arrow function which is a callback to createServer()) to process our incoming request

// req has all metadata of client site like ip, req fro what by whom

// response can be sent through res var

// for a server to run it needs a PORT

myServer.listen(8000,() => {
    // if everything runs perfectly this callback will run
    console.log("Server Started");
})
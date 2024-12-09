const http = require("http");
const fs = require("fs");
const url = require("url")

const { getCurrentDate } = require('./todayDate');
const { sendHTMLFile } = require('./sendHTMLfile');

const myServer = http.createServer((req,res)=>{
    // for not recording the favicon request
    if(req.url === "/favicon.ico") return res.end();
    const log = `New Request Recieved at: ${getCurrentDate()} at path : ${req.url}, and  the HTTP-Method is : ${req.method}\n`;
    const myurl = url.parse(req.url, true); // true passed for passing the query parameter in String
    // the QP will be automatically parsed as object
    // console.log(myurl);
    // it returns a object of url like protocols,slashes,auth,path,query,search etc

    fs.appendFile("logOfRequest.txt",log, (err,data) => {
        if(err) return err;
        else{
            switch (myurl.pathname) {
                case '/kabaj':sendHTMLFile(res,'kabajSecurities.html');
                    break;
                case '/home':res.end("Welcome To Homepage");
                    break;
                case '/about':res.end("ABOUT US - we are a CyberSecurity Company");
                    break;
                case '/career':
                    const username = myurl.query.applier || "Visitor"
                    res.end(` Hello ${username} , Contact or mail your Resume at : Kabaj@security.com`);
                    break;
                case '/signup':
                    sendHTMLFile(res,'Signup.html');
                    break;
                default:res.end("404 NOT FOUND");
                    break;
            }
        } 
        // res.end("Hello From Server--\"heHEHEhe\"");
    })
    // console.log(log);
}); 

myServer.listen(8000,() => {
    console.log("Server Started");
})

// the req recieved is printed two times cause of browser and the favicon
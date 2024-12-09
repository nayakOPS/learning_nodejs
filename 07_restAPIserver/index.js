let users = require("./MOCK_DATA.json");
const fs = require("fs");
const express = require("express");
const { log } = require("console");
const app = express();
const port = 8000;

// MiddleWare-Plugin

// Middleware to parse JSON bodies
app.use(express.json());
// this middleware is parsing/process of http methods body
app.use(express.urlencoded({extended:true}));
// urlencoded does is that when any form data is received it is encode at body

app.use((req,res,next) => {
    console.log("Hello From Middleware 1");
    // Now this middleware is not letting the request response cycle to be communicating with the Client and Server
    // Your Request to ceratin route will stuck due to this middleware
    // This MiddleWare is holding the request to itself

    // Now, the response is given directly from the middleware not the server , that's why the asked route is not responded
    /* return res.json ({
        msg : "Hello From MiddleWare 1"
    }) */
    // if you want to forward the request to other functions call next
    // the next is pointing to other functions the response of the dedicated route is responded

    // Middleware have access to req,res object and can manipulate them
    req.myUsername = "BinayakSoftEng" //so this property can be accessed by all next middleware and other functions
    next();
});

app.use((req,res,next) => {
    console.log("Hello From Middleware 2"," And the middleware 1 changes is this : ",req.myUsername);
    // return res.end("REQUEST RESPONSE CYCLE ENDED FROM MIDDLEWARE 2")
    next();
});

// defining Routes
app.get("/users",(req,res) => {
    res.sendFile(__dirname + '/Users.html');
});

// getting the JSON response of users
app.get("/api/users",(req,res) => {
    res.setHeader("X-myName","Binayak Kunwor") //custom Header
    //Always add X to custom Headers
    res.json(users);
});


// this is the individual routing
/* app.get("/api/users/:id",(req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id );
    return res.json(user);
}); */

app.post("/api/users/",(req,res) => {
    // the data send by front end is stored at the body of the request
    const body = req.body;
    const requiredFields = ['first_name', 'last_name', 'email', 'job_title'];
    
    // Check if body exists and all required fields are present
    if (!body || !requiredFields.every(field => body.hasOwnProperty(field))) {
        return res.status(400).json({ error: "Bad parsing. Missing required fields." });
    }
    // console.log("Body:",body);
    users.push({...body, id:users.length+1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
        // when creating something put status code 201
        return res.status(201).json({
            status : "SUCCESS",
            id: users.length
        });
    })
});


app.route("/api/users/:id")
    .get((req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id );
    // if the searched user is not found send 404 error
    if(!user) return res.status(404).json({"Errmsg": "404 user Not FOund"})
    return res.json(user);
    })
    //for deleting the user id which is passed through URL
    .delete((req,res) => {
        // we are receiving the id as :id in string so removing : and converting to Number
        let idToBeDeleted = req.params.id;
        idToBeDeleted = Number(idToBeDeleted.replace(":",""));
        users = users.filter( user => user.id !== idToBeDeleted);

        // console.log(users);
        // console.log(req.params);
        // console.log(idToBeDeleted,typeof(idToBeDeleted));
        
        // writing the updated users array back to the JSON file
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
            if(err){
                return res.status(500).json({ error: "Internal server error" });
            }
            return res.json({
                status : "SUCCESSFULLY DELETED",
                id_deleted : idToBeDeleted
            });
        });
    });


app.listen(port,(req,res) => {
    console.log(`Server Started at Port : ${port}`);
});
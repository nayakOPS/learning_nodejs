const express = require("express");
const app = express();
const port = 8000;

// importing the user router
const userRouter = require('./routes/users.route.js');

const {connectMongoDB} = require('./connection.js')

const { logOfRequest } = require('./middlewares/index.middleware.js')

// connection
connectMongoDB('mongodb://127.0.0.1:27017/learningMongoDB');
/* mongoose.connect('mongodb://127.0.0.1:27017/learningMongoDB')
.then(() => {
    console.log("MongoDB Connected");
}).catch(err => {
        console.log("MongoDB ERR:", err);
    }); */

const { handleGetAllUsers } = require("./controllers/user.controller.js")

// Middle-Wares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(logOfRequest("LogOfRequest.txt"))

// defining Routes
// displaying users in browser
/* app.get("/users", async(req,res) => {
    const allUsersFromDB = await User.find({});
    const userHTML = `
        <ul>
        ${allUsersFromDB.map((user) => `<li>UserName:${user.first_name} & Email:${user.email}</li><br>`)}
        </ul>
    `;
    res.send(userHTML);
});

// getting the JSON response of users
app.get("/api/users",async (req,res) => {
    const allUsersFromDB = await User.find({});
    return res.status(200).json(allUsersFromDB);
});

//Creating Users Object
app.post("/api/users/", async (req,res) => {
    // the data send by front end is stored at the body of the request
    const body = req.body;
    const requiredFields = ['first_name','last_name','email','job_title','gender'];
    
    // Check if body exists and all required fields are present
    if (!body || !requiredFields.every(field => body.hasOwnProperty(field))) {
        return res.status(400).json({ error: "Bad parsing. Missing required fields." });
    }
    const userObject = await User.create({
            first_name: body.first_name,
            last_name : body.last_name,
            email : body.email,
            job_title : body.job_title,
            gender : body.gender
    })

    console.log("USER CREATED :",userObject);
    return res.status(201).json({
        msg : "SUCCCESS"
    });
});


app.route("/api/users/:id")
    .get(async (req,res) => {
    const user = await User.findById(req.params.id);
    // if the searched user is not found send 404 error
    if(!user) return res.status(404).json({"Errmsg": "404 user Not FOund"})
    return res.json(user);
    })
    .patch(async(req,res) => {
         await User.findByIdAndUpdate(req.params.id, { last_name : "Changed"});
         return res.json({});
    })
    //for deleting the user id which is passed through URL
    .delete(async (req,res) => {
         await User.findByIdAndDelete(req.params.id);
            return res.json({
                status : "SUCCESSFULLY DELETED",
                id_deleted : req.params.id
            });
        });
 */

//Now, the Routing will be
app.use("/api/users",userRouter);

app.listen(port,(req,res) => {
    console.log(`Server Started at Port : ${port}`);
});
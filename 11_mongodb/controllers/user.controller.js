const User = require("../models/user.model.js")

async function handleGetAllUsers(req,res){
    const allUsersFromDB = await User.find({});
    return res.json(allUsersFromDB);
}

async function handleGetUserById(req,res){
    const user = await User.findById(req.params.id);
    // if the searched user is not found send 404 error
    if(!user) return res.status(404).json({"Errmsg": "404 user Not FOund"})
    return res.json(user);
}

async function handleUpdateUserByID(req,res){
    await User.findByIdAndUpdate(req.params.id, { last_name : "Changed"});
    return res.json({});
}

async function handleDeletionUserByID(req,res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({
        status : "SUCCESSFULLY DELETED",
        id_deleted : req.params.id
    })
}

async function handleCreateNewUser(req,res){
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
         msg : "SUCCCESS",
         id : userObject._id
     });
}

module.exports={
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserByID,
    handleDeletionUserByID,
    handleCreateNewUser
}
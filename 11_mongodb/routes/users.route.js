const express = require("express");

// we are refractoring according to MVC thats why seperate router concern is initialized
const router = express.Router();
// inplace of app we will be using router

const { handleGetAllUsers, handleGetUserById, handleUpdateUserByID, handleDeletionUserByID, handleCreateNewUser } = require('../controllers/user.controller.js')

// So this whole route is based upon users so we dont need to explicitly define the users route
router.get("/userHTML", async(req,res) => {
    const allUsersFromDB = await User.find({});
    const userHTML = `
        <ul>
        ${allUsersFromDB.map((user) => `<li>UserName:${user.first_name} & Email:${user.email}</li><br>`)}
        </ul>
    `;
    res.send(userHTML);
});

/* // getting the JSON response of users
router.get("/api",handleGetAllUsers);

//Creating Users Object
router.post("/api",handleCreateNewUser); */

router.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUser);

router.route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserByID)
    .delete(handleDeletionUserByID);

module.exports = router;
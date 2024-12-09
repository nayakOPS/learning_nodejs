const express = require("express");
const app = express();

// next param is the reference to the next Middleware in the Middleware Stack
// Middleware Stack Should be written in Chronological Order
// next can be pointing to your routes
app.use((req,res,next) => {

})
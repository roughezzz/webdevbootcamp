//Initializing The Dependencies
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");

//Setting Up Firebase
var firebaseAdmin = require('firebase-admin');
var config = {
    apiKey: "AIzaSyDxgrTD7FmK0SLYHmlVHv6itOCU9nVAPu8",
    authDomain: "progamming-task.firebaseapp.com",
    databaseURL: "https://progamming-task.firebaseio.com",
    projectId: "progamming-task",
    storageBucket: "progamming-task.appspot.com",
    messagingSenderId: "176536725939"
};
firebaseAdmin.initializeApp(config);

//App Configuration
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//Home Route
app.get("/", function(req,res){
    res.render("index");
});

app.post("/", function(req, res){
    res.render();
});

//Listening the PORT
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SEVER IS RUNNING!");
});
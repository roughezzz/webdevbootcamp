var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//App starts from here
router.get("/", function(req, res){
    res.render("landing");
});

//AUTH ROUTES

//Register
router.get("/register", function(req, res) {
    res.render("register");
});

//Register handling
router.post("/register", function(req, res) {
    var newUser= new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register")
        }
        else{
            passport.authenticate("local")(req,res, function(){
                res.redirect("/campgrounds");
            });
        }
    });
});

//Login
router.get("/login", function(req, res) {
    res.render("login");
});

//Login handling
router.post("/login",passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

//LOGOUT ROUTE
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login");
    }
}

module.exports = router;
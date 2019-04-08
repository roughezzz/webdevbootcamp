var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    passportLocal = require("passport-local"),
    passportLocalMongoose =  require("passport-local-mongoose"),
    User = require("./models/user");
    

mongoose.connect("mongodb://localhost/auth_demo_app", { useNewUrlParser: true });

//App Configuration
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//ROUTES
app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret",isLoggedIn, function(req, res){
    res.render("secret");
});

//AUTH ROUTES
app.get("/register", function(req, res) {
    res.render("register");
});

//SIGN UP 
app.post("/register", function(req, res){
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        else {
            passport.authenticate("local")(req,res, function(){
               res.redirect("/secret"); 
            });
        }
    });
});

//LOGIN ROUTES
app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login",passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/login"
}),function(req,res){
      
});

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

//Custom middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login");
    }
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started......");
});
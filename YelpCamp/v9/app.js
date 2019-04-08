//Require variable for using node module
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    passportLocal =  require("passport-local"),
    methodeOverride =  require("method-override"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");

//Importing Routes
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index");

//Connecting the app with the database
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

//For using methode override
app.use(methodeOverride("_method"));

//For using body parser
app.use(bodyParser.urlencoded({extended: true}));

//For setting up the ejs view engine
app.set("view engine", "ejs");

//For setting external stylesheets and scripts
app.use(express.static(__dirname + "/public"));

//PASSPORT Config
app.use(require("express-session")({
    secret: "Campground Session Is Going On",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//Seeding Data
// seedDB();

//Using the routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// For listening the port and ip of localhost
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp v9 is connected");
});
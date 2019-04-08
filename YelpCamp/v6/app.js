//Require variable for using node module
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    passportLocal =  require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");

seedDB();
//Connecting the app with the database
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

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
})

//App starts from here
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    //Get all the campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/campground", {campgrounds: allCampgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image:image, description: desc};
    
    // Inserting a new campground into the DB
    Campground.create(newCampground,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            //redirect back to campgrounds page
            res.redirect("/campgrounds");  
        }
    });
});

app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new"); 
});

//SHOW - show more info about a campground
app.get("/campgrounds/:id", function(req, res) {
    //find the campground according to :id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            //show the template with that campground
            res.render("campgrounds/show",{campground: foundCampground}); 
        }
    });
});

//NEW - for the comments route
app.get("/campgrounds/:id/comments/new", isLoggedIn,function(req, res) {
    //find campground by ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {campground: campground});     
        }
    });
});

//CREATE - for the comments route
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    // lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }
                else{
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    // redirect to campground showpage  
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//AUTH ROUTES

//Register
app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
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
app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login",passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

//LOGOUT ROUTE
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login");
    }
}

// For listening the port and ip of localhost
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp v4 is connected");
});
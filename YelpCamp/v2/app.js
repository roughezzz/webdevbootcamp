//Require variable for using node module
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

//Connecting the app with the database
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
//For using body parser
app.use(bodyParser.urlencoded({extended: true}));

//For setting up the ejs view engine
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema =  new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

var Campground = mongoose.model("Campground", campgroundSchema);

//***** < For testing *****
// Campground.create(
//     {
//         name: "Mountain Burke Roll", 
//         image: "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
//         description: "This is really a beautiful campground, no water, no bathrooms."
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("Newly created campgroung: ");
//             console.log(campground);
//         }
//     });
//***** For testing > *****


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
            res.render("campground", {campgrounds: allCampgrounds});
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
    res.render("new"); 
});

//SHOW - show more info about a campground
app.get("/campgrounds/:id", function(req, res) {
    //find the campground according to :id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            //show the template with that campground
            res.render("show",{campground: foundCampground}); 
        }
    });
});

// For listening the port and ip of localhost
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp V2 is connected");
});
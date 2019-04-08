var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//Index
router.get("/", function(req, res){
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

//CREATE - add a new campground
router.post("/", function(req, res){
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

//NEW Route
router.get("/new", function(req, res) {
    res.render("campgrounds/new"); 
});

//SHOW - show more info about a campground
router.get("/:id", function(req, res) {
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

module.exports = router;
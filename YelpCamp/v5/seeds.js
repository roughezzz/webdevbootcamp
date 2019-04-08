var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt justo libero, sit amet egestas felis semper quis. Aenean ac interdum lacus, sed euismod risus. Aliquam leo sem, dignissim a quam vitae, efficitur consectetur odio. Duis id consectetur enim."
        
    },
    {
        name: "Desert Mesa",
        image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt justo libero, sit amet egestas felis semper quis. Aenean ac interdum lacus, sed euismod risus. Aliquam leo sem, dignissim a quam vitae, efficitur consectetur odio. Duis id consectetur enim."
        
    },
    {
        name: "Canyon Floor",
        image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt justo libero, sit amet egestas felis semper quis. Aenean ac interdum lacus, sed euismod risus. Aliquam leo sem, dignissim a quam vitae, efficitur consectetur odio. Duis id consectetur enim."
        
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.deleteMany({},function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Campground is removed");
        }
    });
    
    //add a few campgrounds
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            }
            else{
                console.log("Campground added");
                // create a comment
                Comment.create({
                    text: "This place is great but I wish there was internet",
                    author: "Homer"
                }, function(err, comment){
                    if(err){
                        console.log(err);
                    }
                    else{
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created comment");
                    }
                });
            }
        });
    });
}

module.exports = seedDB;
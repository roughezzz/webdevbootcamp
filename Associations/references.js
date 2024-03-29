var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2", { useNewUrlParser: true });

var Post = require("./models/post");

var User = require("./models/user")

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });

// Post.create({
//     title: "How to cook the best nachos pt 3",
//     content: "Lorem ipsum lorem ipsum lorem ipsum"
// }, function(err,post){
//     User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
//         if(err){
//             console.log(err);
//         }
//         else{
//             foundUser.posts.push(post);
//             foundUser.save(function(err, data){
//                 if(err){
//                     console.log(err);
//                 }
//                 else{
//                     console.log(data);
//                 }
//             });
//         }
//     });
// });

//Find user
// Find all posts of the users

User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
    if(err){
        console.log(err);
    }
    else{
        console.log(user);
    }
});
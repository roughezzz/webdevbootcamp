const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app", { useNewUrlParser: true });

var  catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// adding a data from the JS

// var george = new Cat({
//   name: "Mrs. Norris",
//   age: 7,
//   temperament: "Evil"
// });

// george.save(function(err, cat){
//     if(err){
//         console.log("Something went wrong!");
//     }
//     else{
//         console.log("A new cat has been saved to database!");
//         console.log(cat);
//     }
// });

//retrieving data from the database

Cat.find({}, function(err, cats){
    if(err){
        console.log("ERROR!!");
        console.log(err);
    }
    else{
        console.log("All the cats.....");
        console.log(cats);
    }
});
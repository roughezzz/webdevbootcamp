const express = require("express");
const app = express();

app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
    var animal = req.params.animal.toLowerCase();
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof",
        cat: "Meow Meow"
    }
    var sound = sounds[animal];
    res.send("The " + animal + " says '"+ sound +"'");
});

app.get("/repeat/:str/:num", function(req, res) {
    var str = req.params.str;
    var num = parseInt(req.params.num);
    var temp = "";
    
    for(var i = 0; i < num; i++){
        temp += str + " ";
    }
    res.send(temp);
});

app.get("*",function(req, res) {
   res.send("Sorry, page not found... What are you doing with your life?"); 
});
// Check whether server is connnected or not
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Connected");
});
const express = require("express");
const app = express();
const request = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res) {
   res.render("search"); 
});

app.get("/results", function(req, res){
   var query = req.query.search;
   var url = "http://www.omdbapi.com/?apikey=317f9390&s="+ query;
   request(url, function (error, response, body) {
       if(!error && response.statusCode == 200){
           var parseData = JSON.parse(body);
           //res.send(parseData["Search"][0]);
           res.render("results", {data: parseData});
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Connected!!!");
});
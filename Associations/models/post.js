var mongoose =  require("mongoose");

//POST - title, content
var postSChema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSChema);

module.exports = Post;
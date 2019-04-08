// Declaring the modules ***
var express = require("express"),
    app = express(),
    mongoose =  require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");
    
//App Configuring ***
mongoose.connect("mongodb://localhost/restful_blog_app", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// Creating mongoose Schema ***
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

// Modelling the Schema ***
var Blog = mongoose.model("Blog", blogSchema);

//Testing the data
// Blog.create({
//     title: "Test Blog",
//     image: "https://images.unsplash.com/photo-1529927066849-79b791a69825?ixlib=rb-1.2.1&auto=format&fit=crop&w=749&q=80",
//     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada sollicitudin nisi, at volutpat leo blandit eu. Proin nec risus id nibh pharetra consequat. Nullam lobortis enim tortor, vitae vehicula nulla sollicitudin sit amet. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
// });

//RESTful routes
app.get("/", function(req, res) {
    res.redirect("/blogs");
})

//INDEX route
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }
        else{
            res.render("index", {blogs: blogs});
        }
    });
});

//NEW routes
app.get("/blogs/new",function(req, res) {
    res.render("new");
});

//CREATE Route
app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        }
        else{
            res.redirect("/blogs");
        }
    });
});

//SHOW Route
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("show", {blog: foundBlog});
        }
    });
});

//EDIT Route
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("edit", {blog: foundBlog});
        }
    });
});

//UPDATE Route
app.put("/blogs/:id", function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//DELETE Route
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs/" + req.params.id)
        }
        else{
            res.redirect("/blogs");
        }
    })
});

//Listening the PORT ***
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SEVER IS RUNNING!");
});
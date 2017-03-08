var express = require("express"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
app = express();

// app config
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// mongoose/model config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// resful routes
app.get("/", function(req, res) {
    res.redirect("/blogs");
});

// index route
app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

// new route
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

// create route
app.post("/blogs", function(req, res) {
    Blog.create(req.body.blog, function(err, newBlog) {
        if(err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

// show route
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    })
});

// edit route
app.get("/blogs/:id/edit", function(req, res) {
    res.render("edit");
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running!");
});
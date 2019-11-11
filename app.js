var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require('method-override')
var expressSanitizer = require('express-sanitizer');

mongoose.connect("mongodb://localhost/restful_blog_app");

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
//if meet _method in the url, treat it as what it equals to
app.use(methodOverride('_method'));
app.use(expressSanitizer());

var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog",blogSchema);

// Blog.create({
// 	title: "dog 1",
// 	image: "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg",
// 	body: "HELLO THIS IS DOG 1"
// }, function(err,new_dog){
// 	if(err)
// 	{
// 		console.log("ERROR HAPPEN");
// 		console.log(err);
// 	}
// 	else
// 	{
// 		console.log("NEW DOG CREATED");
// 		console.log(new_dog);
// 	}
// });

//RESTFUL ROUTES

app.get("/",function(req,res){
	res.redirect("/blogs");
})

app.get("/blogs", function(req,res){
	Blog.find({},function(err,blogs){
		if(err)
		{
			console.log("ERROR HAPPEN");
			console.log(err);			
		}
		else
		{
			res.render("index", {blogs: blogs});
		}	
	});
})


app.get("/blogs/new", function(req,res){
	res.render("new");
})

//create route, using direct to "/blogs" after new page
app.post("/blogs", function(req,res){
	//Use sanitizer to filtor <script> tag 
	//first "body" is to get the data from form, the second "body"
	//is to get the blog[body] from the object 
	req.body.blog.body = req.sanitize(req.body.blog.body);
	
	Blog.create(req.body.blog,function(err,new_blog){
		if(err)
		{
			res.render("new");
		}
		else
		{
			console.log("hello");
			res.redirect("/blogs");
		}
	})
})

//show route, show detailed info for a specific blog
app.get("/blogs/:id", function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err)
		{
			res.redirect("/blogs");
		}
		else
		{
			res.render("show", {blog:foundBlog});
		}
	})
})

//edit route
app.get("/blogs/:id/edit", function(req,res){
	Blog.findById(req.params.id, function(err,foundBlog){
		if(err)
		{
			res.redirect("/blogs");
		}
		else
		{
			res.render("edit", {blog:foundBlog});
		}
	})
})

//update route, after updating go to show route
app.put("/blogs/:id",function(req,res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	//three parameters, (id, newdata(from the form in edit.ejs), callback)
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,updatedBlog){
		if(err)
		{
			res.redirect("/blogs");
		}
		else
		{
			res.redirect("/blogs/" + req.params.id);
		}
	})
})

//delete route, will also need the methodoverride
app.delete("/blogs/:id",function(req,res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err)
		{
			//if meeting error, redirect to main page
			res.redirect("/blogs");
		}
		else
		{
			res.redirect("/blogs");
		}
	})
})

app.listen("3000",function(){
	console.log("SERVER STARTED");
})
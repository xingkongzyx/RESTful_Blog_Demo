# RESTful_Blog_Demo


![1](https://user-images.githubusercontent.com/36606851/68806116-6f0d0380-0622-11ea-8425-5d5974ad781d.png)
![2](https://user-images.githubusercontent.com/36606851/68806123-72a08a80-0622-11ea-82c7-e37f33b51f65.png)
![3](https://user-images.githubusercontent.com/36606851/68806127-73d1b780-0622-11ea-8bf6-669cd9f891a1.png)


### Project Info: 
RESTful Blog App is a web application with best applications of RESTful Routing using NodeJS, ExpressJS for the back-end, and Semantic UI in the front-end. It is made while pursuing The Web Developer Bootcamp course on Udemy. Home page shows a list of all the blog posts, and users can add a new post with a featured image, edit or delete existing post. 

### Installation:
Using "npm install" to install all required dependecies listed in package.json file 
Then open MongoDB database at first, finally enter "node app.js" to open the server, the port assigned is 3000.

### 7 RESTful Routes in the project:

| Name    | Path            | HTTP Verb | Purpose                                           | Mongoose Method          |
| ------- | --------------- | --------- | ------------------------------------------------- | ------------------------ |
| Index   | /blogs          | GET       | List all blogs                                    | Blog.find()              |
| New     | /blogs/new      | GET       | Show new blog form                                | N/A                      |
| Create  | /blogs          | POST      | Create a new blog, then redirect somewhere        | Blog.create()            |
| Show    | /blogs/:id      | GET       | Show info about one specific blog                 | Blog.findById()          |
| Edit    | /blogs/:id/edit | GET       | Show edit form for one blog                       | Blog.findById()          |
| Update  | /blogs/:id      | PUT       | Update a particular blog, then redirect somewhere | Blog.findByIdAndUpdate() |
| Destroy | /blogs/:id      | DELETE    | Delete a particular blog, then redirect somewhere | Blog.findByIdAndRemove() |



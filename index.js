require('dotenv').config();
const exp = require("constants");
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const {v4: uuidv4} = require('uuid');
const methodOverride = require('method-override');
const { send } = require("process");

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public/css")));
app.use(express.static(path.join(__dirname,"public/js")));

let posts =[
    {
        id:uuidv4(),
        username: "Harshil",
        content:"I Love Coding!"
    },
    {
        id:uuidv4(),
        username: "Ravi",
        content:"I Love Hardwork!"
    },
    {
        id:uuidv4(),
        username: "Akash",
        content:"I got select microsoft!"
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});


app.get("/",(req,res)=>{
    res.redirect("/posts");
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content}= req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    // console.log(req.body);
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    console.log(post);
    res.render("show.ejs",{post})
});
app.patch("/posts/id:",(req,res)=>{
    let {id}=req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{post})
});

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts= posts.filter((p)=> id !== p.id);
    // res.send "delete succesfully";
    res.redirect("/posts");
});



app.listen(port,()=>{
    console.log(`listing to port :${port}`);
});


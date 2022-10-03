const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

let posts=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
  
});

app.get("/post",(req,res)=>{
  res.redirect("/");
})

app.get("/post/:postName",(req,res)=>{
  // console.log(req.params.postName);
  let postUrl =req.params.postName;
  let flag =0;
  let index = 0;
  let postTitle=[];
  let temp =[];

  postUrl = _.lowerCase(postUrl);
  postUrl = postUrl.split(" ").join("");

  for(var i=0;i<posts.length;i++){

    postTitle[i] = _.lowerCase(posts[i].title);
    postTitle[i] = postTitle[i].split(" ").join("");
    
    console.log(postUrl+" : "+ postTitle[i]);
    
    if(postUrl == postTitle[i]){
      flag=1; 
      index =i;
    } 

  }
  
  if(flag ==1) console.log("match found ");
  else console.log("Match not found ");
  

  res.render("post",{
    postEJS: posts,
    index: index
  })
  
  // const requestedTitle = req.params.postName;
  // posts.forEach((post)=>{
  //   const storedTitle = post.title;
  //   if(storedTitle === requestedTitle){
  //     console.log("match found and the url is "+ requestedTitle);
  //   }
  //   else{
  //     console.log("Match not found url is "+ requestedTitle);
  //   }
  // });
});


app.get("/about", (req,res)=>{
  res.render("about",{
    aboutContent: aboutContent
  })
});

app.get("/contact", (req,res)=>{
  res.render("contact", {
    contactContent: contactContent
  })
})

app.get("/compose", (req,res)=>{
  res.render("compose");
})

app.post("/compose", (req,res)=>{
  let post ={
    title: req.body.postTitle,
    body: req.body.postBody
  }
  posts.push(post);
  // console.log(req.route.path);
  res.redirect("/");
  
})




app.listen(3000, function() {
  console.log("Server started on port 3000");
});

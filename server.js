const express = require('express');
const app = express(); // this is the server
app.listen(3000,()=>{
    console.log("server running on 3000 port ")
});

app.set('view engine','ejs')

// creating the GET route
app.get("/",(req,res)=>{
    res.send("This is the responses");
})

app.get("/web", (req, res) => {
    res.render("Home");
});


//getting the users by the id
app.get("/users/:id", (req, res) => {

    console.log(req.params);

    res.send("User Found");

});


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


// Gate Question
//exo2

// const express = require("express");
// const app = express();

// Middleware
function requestLogger(req, res, next) {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;

        const time = new Date().toISOString();

        console.log(`[${time}] ${req.method} ${req.url} - ${duration}ms`);
    });

    next();
}

// use middleware for ALL routes
app.use(requestLogger);

app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.json({ message: "Home Page" });
});

app.get("/users", (req, res) => {
    res.json([{ id: 1, name: "Florence" }]);
});

// start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});


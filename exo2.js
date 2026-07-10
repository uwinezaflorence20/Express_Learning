// Create an Express.js middleware function called requestLogger that logs the following information for every incoming request:

// - HTTP method (e.g., GET, POST)
// - URL path
// - Timestamp of the request
// - Response time (in milliseconds)

// Then:

// 1. Integrate this middleware into an Express app.
// 2. The app should have at least *two routes* (/ and /users) that return a JSON response.
// 3. Ensure the middleware runs for *all routes* and prints logs in the following format:
// shell
// [2025-11-11T18:23:10Z] GET /users - 5ms

// Answer to the question

const express = require('express');
const app = express();

const start = Date.now();  
// creating the middleware
function requestLogger(req, res, next) {
    res.on('finish', () => {
        const duration = Date.now() - start;
        const time = new Date().toISOString();
        console.log(`[${time}] ${req.method} ${req.url} - ${duration}ms`)
    }
    )
    next();
}

app.use(requestLogger);
app.use(express.json());

// route 1
app.get('/',(req,res)=>{
    res.send("Welcome to the Home Page");
})

app.get('/users',(req,res)=>{
    res.send([{id:1,name:"Uwineza"}]);
})

app. listen(2000,()=>{
    console.log("locally running on port 2000")
})
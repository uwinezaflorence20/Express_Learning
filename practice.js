const express = require('express')
const fs = require('fs');

const app = express();
let FILE = './auth.json';
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("this is the home page welcome");
})

function getUsers(){
    if(!fs.existsSync(FILE)) return [];
    const data = fs.readFileSync(FILE,'utf-8');
    return data ?JSON.parse(data) : [];
}

function saveUsers(user){
    return fs.writeFileSync(FILE,JSON.stringify(user,null,2));
}

app.post("/signup", (req,res)=>{
    const {username,password} = req.body;
    if(!username || !password){
        res.send("the username and password are required");
    }
    const users = getUsers();

const userExists = users.find(u => u.username === username);

if (userExists) {
    return res.json("User already exists");
}

    users.push({username,password});
    saveUsers(users);
    res.json("signup successful");
});

app.post("/login", (req,res)=>{
    const {username,password} = req.body;
    const users = getUsers();

    let validUser = users.find(u => u.username === username &&  u.password === password);
    if(validUser){
        res.send("logged in successful");
    }else{
        res.send("invalid credentials");
    }
});

app.get("/users",(req,res)=>{
    let users = getUsers();
    res.json(users)
})
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
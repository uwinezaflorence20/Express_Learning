const express = require('express')
const fs = require('fs');

const app = express();
let FILE = './auth.json';

app.get("/", (req,res)=>{
    res.send("this is the home page welcome");
})

function getUsers(){
    if(!fs.existsSync(File)) return [];
    const data = fs.readFileSync(FILE,'utf-8');
    return data ?JSON.parse(data) : [];
}

function saveUsers(user){
    return fs.writeFileSync(FILE,JSON.stringify(user,null,2));
}
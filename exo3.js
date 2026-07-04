// Implement these endpoints: The main route will be /todo
// POST →/todo to create a task,
// GET → /todo to get all tasks
// Use a search parameter to filter tasks by status,
// Use route parameters to a task by id,
// A task will be have this shape:
// type task = {
// id: number,
// task: string,
// status: "todo" | "doing" | "done"
// }

const express = require('express');
const app = express();

app.use(express.json());

// fake data
const todos = [];
let currentId = 1;

app.get("/", (req, res) => {
    res.send("This is the beginning of everything");
});

app.get("/todos", (req, res) => {
    res.json(todos);
});

app.post("/todos", (req, res) => {

    const { task, status } = req.body;

    let newtask = {
        id: currentId++,
        task: task,
        status: status || "doing"
    };

    todos.push(newtask);

    res.json(newtask);
});

app.get("/todos/:id",(req,res)=>{
    const taskId = Number(req.params.id);
    const tasks = todos.find(t=>t.id === task.id);
    if(!tasks){
        res.json({message:"Task is not found"})
    }
    res.json(task);
})

app.listen(4000, () => {
    console.log("Server running on port 4000");
});
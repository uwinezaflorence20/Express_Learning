const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const FILE = "./auth.json";

app.get("/", (req, res) => {
    res.send("This is the beginning of everything");
});

function getUsers() {
  if (!fs.existsSync(FILE)) return [];
  const data = fs.readFileSync(FILE, "utf-8");
  return data ? JSON.parse(data) : [];
}

function saveUsers(users) {
  fs.writeFileSync(FILE, JSON.stringify(users, null, 2));
}

app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  const users = getUsers();

  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.send("User already exists");
  }

  users.push({ username, password });
  saveUsers(users);

  res.send("Signup successful!");
});
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const users = getUsers();

  const validUser = users.find(
    u => u.username === username && u.password === password
  );

  if (validUser) {
    return res.send("You are logged in!");
  }

  res.send("Wrong credentials!");
});

/**
 * Start server
 */
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

let users = [
  {
    name: "Rika Ciminieri",
    password: "rikarocks123",
  },
  {
    name: "Eric Freilafert",
    password: "ericrocks123",
  },
  {
    name: "Leo Ciminieri",
    password: "leorocks123",
  },
];

server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

server.post("/api/register", (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res
      .status(400)
      .json({ message: "Please provide name and password" });
  }
  users.push(req.body);
  res.status(201).send(req.body);
});

server.post("/api/login", (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res
      .status(400)
      .json({ message: "Please provide name and password" });
  }
  if (users.some((user) => user.name === req.body.name)) {
    return res.status(200).json({ message: "Welcome to your page!" });
  } else {
    return res.status(500).json({ message: "Error logging in" });
  }
});

server.use("*", (req, res) => {
  res.send("<h1>Welcome!!</h1>");
});

server.listen(process.env.PORT || 500, () => {
  console.log(`server running on port ${process.env.PORT || 500}`);
});

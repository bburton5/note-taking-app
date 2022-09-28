// Setting up express
const express = require("express");
const PORT = 3001;
const app = express();

// GET requests
app.get("/notes", (req, res) => {});
app.get("*", (req, res) => {});
app.get("/api/notes", (req, res) => {});

// POST requests
app.post("/api/notes", (req, res) => {});

// PORT is listening
app.listen(PORT, () =>
  console.log(`Note-taking app listening at http://localhost:${PORT}`)
);

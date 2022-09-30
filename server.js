// Requirements
const express = require("express");
const database = require("./db/db.json");
const path = require("path");
const fs = require("fs");
const uuid = require("./helpers/uuid");
const PORT = process.env.PORT || 5001;
const app = express();

// Middleware for parsing JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Middleware for accessing public folder
app.use(express.static("public"));

// GET and POST request for API
app
  .route("/api/notes")
  .get((req, res) => {
    // Sending a message to the user
    res.status(200).json(database);
    // Logging our request to the terminal
    console.info(`${req.method} request received to get notes`);
  })

  // POST request to add a new note
  .post((req, res) => {
    // Logging out request to the terminal
    console.info(`${req.method} request received to add a new note`);
    // Destructuring the for items in req.body
    const { title, text } = req.body;
    if (title && text) {
      // Where the new note is saved to (which will get pushed later)
      const newNote = {
        title,
        text,
        id: uuid(),
      };
      // Obtaining the existing notes
      fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Converting the strings into a JSON object
          const parsedNotes = JSON.parse(data);
          // Adding the new review to the JSON object
          parsedNotes.push(newNote);
          // Writing the file again with the new note
          fs.writeFile(
            "./db/db.json",
            JSON.stringify(parsedNotes, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(fs.writeErr)
                : console.info("Successfully updated notes!")
          );
        }
      });

      const response = {
        status: "success",
        body: newNote,
      };

      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json("Error in adding new note");
    }
  });

// Remaining GET requests
app.get("/notes", (req, res) => {
  console.log("get request for /notes is working");
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("*", (req, res) => {
  console.log("get request for * is working");
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// App is listening on PORT
app.listen(PORT, () =>
  console.log(`Note-taking app listening at http://localhost:${PORT}`)
);

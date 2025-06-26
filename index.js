const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const notes = [];

app.get("/", (req, res) => {
  res.send("📒 Welcome to the Notes App!");
});

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.post("/notes", (req, res) => {
  const note = req.body.note;
  if (!note) return res.status(400).send("Note cannot be empty");
  notes.push(note);
  res.status(201).send("Note saved successfully");
});

app.delete("/notes/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (isNaN(index) || index < 0 || index >= notes.length) {
    return res.status(400).send("Invalid index");
  }
  notes.splice(index, 1);
  res.send("Note deleted successfully");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

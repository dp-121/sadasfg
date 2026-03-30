// const express = require('express');
// const app = express();

// app.get("/", (req, res) => {
//     res.send("Hi, buddy!");
// });

// app.get("/about", (req, res) => {
//     res.send("Heyyyyyyyyyyyyyyyyyyy");
// });

// app.get("/profile/:name/:id", (req, res) => {
//     res.send(`Hi, i'm profile page of ${req.params.name}`);
//     // res.send(`My id is ${req.params.id}`);
// });

// module.exports = app;

const express = require('express');
const app = express();

app.use(express.json());

const notes = [];

app.post("/notes", (req, res) => {
    notes.push(req.body);
    res.status(201).json({
        message:"note is created successfully"
    })
});

app.get("/notes", (req, res) => {
    res.status(200).json({
        message:"notes are fetched successfully",
        notes: notes
    })
});

app.delete("/notes/:index", (req, res) => {
    const index = req.params.index;
    delete notes[index];
    res.status(200).json({
        message:"note is deleted successfully"
    })
});

app.patch("/notes/:index", (req, res) => {
    const index = req.params.index;
    const newdes = req.body.description;
    notes[index].description = newdes;
    res.status(200).json({
        message:"note is updated successfully"
    })
});

module.exports = app;
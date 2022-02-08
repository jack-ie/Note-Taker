// required modules
const fs = require('fs');
const path = require('path');

module.exports = app => {

    // notes variable
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);

       // api/notes get route
        app.get("/api/notes", function (req, res) {
            // read db.json and return notes as JSON.
            res.json(notes);
        });

        // api/notes post route
        app.post("/api/notes", function (req, res) {
            // receives new note, adds to db.json, returns the new note
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Added new note: " + newNote.title);
        });

        // retrieves note
        app.get("/api/notes/:id", function (req, res) {
            res.json(notes[req.params.id]);
        });

        // deletes a note
        app.delete("/api/notes/:id", function (req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id " + req.params.id);
        });

       // display notes.html
        app.get('/notes', function (req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        // display index.html 
        app.get('*', function (req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        //updates the json file when a note is added or deleted
        function updateDb() {
            fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
                if (err) throw err;
                return true;
            });
        }

    });

}
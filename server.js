// required modules
const express = require('express');
const fs = require ('fs');
const path = require('path');

// server port created
const app = express();
const PORT = process.env.PORT || 3000;

// Read URL or JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname));

// routes file
require("./routes/routes")(app);

// public folder
app.use(express.static("public"));

// Add listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
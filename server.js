// I import Express because I need a server for this CA2 project.
// In CA1, I opened HTML files directly in the browser.
// In CA2, the website must run through a server using localhost.
const express = require("express");

// I import path because it helps Node.js find files correctly on my computer.
// This is useful on Mac and Windows because file paths can be different.
const path = require("path");

// I import my database connection file
const connection = require("./database");


// I create the Express application.
// The variable app will be used to define routes and server settings.
const app = express();

// I choose port 3000 because this is the local address used in class examples.
// When the server runs, I will open http://localhost:3000 in the browser.
const PORT = 3000;

// I tell Express to serve all files inside the public folder.
// This folder contains the visible part of my website:
// HTML files, CSS file, JavaScript file and images.
app.use(express.static(path.join(__dirname, "public")));

// This is the main route of my website.
// When the user visits http://localhost:3000,
// the server sends the index.html file as the home page.
app.get("/", (req, res) => {

    // res.sendFile sends an HTML file from the server to the browser.
    // path.join helps locate index.html inside the public folder.
    res.sendFile(path.join(__dirname, "public", "index.html"));

});

// This starts the server.
// app.listen keeps the server running and waiting for browser requests.
app.listen(PORT, () => {

    // This message appears in the terminal so I know the server is working.
    console.log(`Server running at http://localhost:${PORT}`);

});
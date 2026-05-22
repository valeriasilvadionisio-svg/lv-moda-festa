// I import the MySQL2 library to connect my Node.js server to MySQL
const mysql = require("mysql2");

// I create the database connection using my local MySQL settings
const connection = mysql.createConnection({

    // My local MySQL server
    host: "localhost",

    // Default MySQL username
    user: "root",

    // My MySQL password
    password: "Estados581358",

    // Database created for this CA2 project
    database: "lvmodafesta"

});

// I connect Node.js to the MySQL database
connection.connect((error) => {

    // If there is an error, I show it in the terminal
    if (error) {

        console.log("Database connection failed");
        console.log(error);

    }

    // If everything works, I show a success message
    else {

        console.log("Connected to MySQL database");

    }

});

// I export the connection so I can use it in server.js
module.exports = connection;
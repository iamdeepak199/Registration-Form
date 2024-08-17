const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const chalk = require('chalk');

const app = express();
const port = 3000;

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // your MySQL username
    password: '12345', // your MySQL password
    database: 'mydatabase'
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log(chalk.blueBright.italic('connection successfully established to mysql server...'));
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname)));

// Route to handle form submission
app.post('/submit', (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const address = req.body.address;
    const message = req.body.message || 'No message provided'; // Default if NULL

    const sql = 'INSERT INTO users (name, phone, email, Address, Message) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, phone, email, address, message], (err, result) => {
        if (err) throw err;
        res.send('User added successfully');
    });
});

// Route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});

app.listen(port, () => {
    console.log(chalk.green.bold.inverse(`Server running on http://localhost:${port}`));
});

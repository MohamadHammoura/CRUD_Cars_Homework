const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'a5_=W.w5', // Replace with your MySQL password
    database: 'testdb'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// CREATE
app.post('/cars', (req, res) => {
    const { make, model, year, price } = req.body;
    const query = 'INSERT INTO Cars (make, model, year, price) VALUES (?, ?, ?, ?)';
    db.query(query, [make, model, year, price], (err, result) => {
        if (err) throw err;
        res.send('Car added successfully');
    });
});

// READ
app.get('/cars', (req, res) => {
    const query = 'SELECT * FROM Cars';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// UPDATE
app.put('/cars/:id', (req, res) => {
    const { id } = req.params;
    const { make, model, year, price } = req.body;
    const query = 'UPDATE Cars SET make = ?, model = ?, year = ?, price = ? WHERE id = ?';
    db.query(query, [make, model, year, price, id], (err, result) => {
        if (err) throw err;
        res.send('Car updated successfully');
    });
});

// DELETE
app.delete('/cars/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Cars WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.send('Car deleted successfully');
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

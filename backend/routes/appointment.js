// backend/routes/appointment.js

const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Asdfghjkl@#3700',
    database: 'appointments'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

router.post('/', (req, res) => {
    const { name, age, email, date, time } = req.body;
    const query = 'INSERT INTO appointments (name, age, email, date, time) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, age, email, date, time], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('Appointment booked successfully');
        }
    });
});

module.exports = router;

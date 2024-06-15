// backend/routes/appointment.js

// const express = require('express');
// const router = express.Router();
// const mysql = require('mysql');

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Asdfghjkl@#3700',
//     database: 'appointments'
// });

// db.connect(err => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//     } else {
//         console.log('Connected to MySQL');
//     }
// });

// router.post('/', (req, res) => {
//     const { name, age, email, date, time } = req.body;
//     const query = 'INSERT INTO appointments (name, age, email, date, time) VALUES (?, ?, ?, ?, ?)';
//     db.query(query, [name, age, email, date, time], (err, result) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.status(200).send('Appointment booked successfully');
//         }
//     });
// });

// module.exports = router;

// backend/routes/appointment.js

const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const { emailUser, emailPass } = require('../config');

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

const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use any email service
    auth: {
        user: emailUser,
        pass: emailPass
    }
});

router.post('/', (req, res) => {
    const { name, age, email, date, time } = req.body;
    const query = 'INSERT INTO appointments (name, age, email, date, time) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, age, email, date, time], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            // Send confirmation email to the user
            const userMailOptions = {
                from: emailUser,
                to: email,
                subject: 'Appointment Confirmation',
                text: `Dear ${name},\n\nYour appointment is confirmed for ${date} at ${time}.\n\nThank you!`
            };

            transporter.sendMail(userMailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending confirmation email:', error);
                } else {
                    console.log('Confirmation email sent:', info.response);
                }
            });

            // Send notification email to you
            const adminMailOptions = {
                from: emailUser,
                to: 'harrsha.code@gmail.com',
                subject: 'New Appointment Booked',
                text: `New appointment booked:\n\nName: ${name}\nAge: ${age}\nEmail: ${email}\nDate: ${date}\nTime: ${time}`
            };

            transporter.sendMail(adminMailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending admin email:', error);
                } else {
                    console.log('Admin email sent:', info.response);
                }
            });

            res.status(200).send('Appointment booked successfully');
        }
    });
});

module.exports = router;

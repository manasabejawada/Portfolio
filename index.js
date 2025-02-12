const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('All fields are required!');
    }

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'prashanth.chinthapoola@gmail.com',
            pass: 'eshsgsxoqqzxwbsd' // Replace with actual app password
        }
    });

    const mailOptions = {
        from: 'prashanth.chinthapoola@gmail.com',
        replyTo: email,
        to: 'prashanth.chinthapoola@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error sending email. Please try again later.');
        }
        console.log('Email sent:', info.response);
        res.send('Thank you! Your message has been sent.');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
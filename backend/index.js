
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',  // Replace with your MySQL root password
    database: 'crm'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// API to ingest data into customers
app.post('/api/customers', (req, res) => {
    const { name, email, total_spends, last_visit } = req.body;
    const sql = 'INSERT INTO customers (name, email, total_spends, last_visit) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, total_spends, last_visit], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Customer added...' });
    });
});

// API to ingest data into orders
app.post('/api/orders', (req, res) => {
    const { customer_id, amount, order_date } = req.body;
    const sql = 'INSERT INTO orders (customer_id, amount, order_date) VALUES (?, ?, ?)';
    db.query(sql, [customer_id, amount, order_date], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Order added...' });
    });
});

// API to create audience
app.post('/api/audience', (req, res) => {
    const { rules } = req.body;
    let sql = 'SELECT * FROM customers WHERE 1=1';
    rules.forEach(rule => {
        sql += ` AND ${rule.field} ${rule.operator} ${rule.value}`;
    });
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Dummy API to send messages
app.post('/api/send-campaign', (req, res) => {
    const { customer_id, message } = req.body;
    const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
    const sql = 'INSERT INTO communications_log (customer_id, message, status) VALUES (?, ?, ?)';
    db.query(sql, [customer_id, message, status], (err, result) => {
        if (err) throw err;
        axios.post('http://localhost:3000/api/delivery-receipt', {
            log_id: result.insertId,
            status
        }).then(() => {
            res.send({ message: 'Message sent...' });
        }).catch(err => {
            console.error(err);
            res.status(500).send('Error sending message');
        });
    });
});

// API to handle delivery receipt
app.post('/api/delivery-receipt', (req, res) => {
    const { log_id, status } = req.body;
    const sql = 'UPDATE communications_log SET status = ? WHERE id = ?';
    db.query(sql, [status, log_id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Delivery status updated...' });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

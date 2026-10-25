const express = require('express');
const { Pool } = require('pg');
const client = require('prom-client');

const app = express();
const port = 3000;

app.use(express.json());

const pool = new Pool({
    host: process.env.DB_HOST || 'postgres',
    port: 5432,
    database: process.env.DB_NAME || 'restaurant',
    user: process.env.DB_USER || 'restaurant',
    password: process.env.DB_PASSWORD || 'restaurant123'
});

const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.get('/', (req, res) => {
    res.send(`
        <h1>Restaurant Order</h1>
        <p>Welcome to Restaurant Order System!</p>
        <p><a href="/health">Health Check</a></p>
        <p><a href="/orders">View Orders</a></p>
    `);
});

app.get('/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({ status: 'OK', database: 'connected' });
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            database: 'disconnected'
        });
    }
});

app.get('/orders', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM orders ORDER BY id'
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Cannot load orders' });
    }
});

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Restaurant Order running on port ${port}`);
});

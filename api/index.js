const express = require('express');
const jsonServer = require('json-server');
const cors = require('cors');

const app = express();

// Load data directly via require to ensure it's bundled
const dbData = require('./db.json');

const router = jsonServer.router(dbData);
const middlewares = jsonServer.defaults();

app.use(cors());
app.use(middlewares);

// Health check endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!', data_keys: Object.keys(dbData) });
});

// Explicit rewrite for Vercel: /api/contacts -> /contacts
app.use(jsonServer.rewriter({
  "/api/*": "/$1"
}));

app.use(router);

module.exports = app;

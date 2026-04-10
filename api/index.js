const express = require('express');
const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();

// Load db.json as an object to prevent json-server from trying to write to disk
// (Vercel is read-only at runtime)
const dbPath = path.join(process.cwd(), 'api', 'db.json');
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const router = jsonServer.router(dbData);
const middlewares = jsonServer.defaults({
  // Disable the logger in production to keep logs clean
  logger: false
});

app.use(cors());
app.use(middlewares);

// Add a test route to verify the API is alive
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Explicitly handle the /api prefix
app.use(jsonServer.rewriter({
  "/api/*": "/$1"
}));

app.use(router);

module.exports = app;

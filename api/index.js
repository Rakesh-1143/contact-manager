const express = require('express');
const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors');

const app = express();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

app.use(cors());
app.use(middlewares);

// Explicitly handle the /api prefix before passing to the router
app.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    req.url = req.url.replace(/^\/api/, '');
  }
  // If the URL is empty after replacement, default to /
  if (req.url === '') req.url = '/';
  next();
});

app.use(router);

module.exports = app;

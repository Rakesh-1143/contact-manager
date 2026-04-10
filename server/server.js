const express = require('express');
const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors');

const app = express();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

app.use(cors());
app.use(middlewares); // Standard json-server middlewares

// Rewriting /api to / so the router sees /contacts
app.use(jsonServer.rewriter({
  "/api/*": "/$1"
}));

app.use(router); // Mount the router

// Local development only
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the app for Vercel
module.exports = app;

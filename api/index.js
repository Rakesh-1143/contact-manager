const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Vercel routes /api/contacts to this file.
// We want json-server to see /contacts.
server.use(jsonServer.rewriter({
  "/api/*": "/$1"
}));

server.use(router);

module.exports = server;

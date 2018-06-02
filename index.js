const express = require('express');
const bodyParser = require('body-parser');

const mountRoutes = require('./routes');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

mountRoutes(app);

// Ensure only one server instance is running in test environment
if (!module.parent) {
  app.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
}

module.exports = app;

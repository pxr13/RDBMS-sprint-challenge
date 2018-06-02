const express = require('express');
const bodyParser = require('body-parser');

const code = require('./utils/statusCodes');
const mountRoutes = require('./routes');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

// Custom middleware for error handling
app.use((message, req, res, next) => {
  res.status(code.USER_ERROR).send({ error: { code: code.USER_ERROR, message } });
});

mountRoutes(app);

// Ensure only one server instance is running in test environment
if (!module.parent) {
  app.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
}

module.exports = app;

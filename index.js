const express = require('express');
const bodyParser = require('body-parser');

const mountRoutes = require('./routes');

const app = express();
const port = 8080;

app.use(bodyParser.json());

mountRoutes(app);

app.listen(port, () => {
  console.log(`\n=== API up on port: ${port} ===\n`);
});

const express = require('express');
require('dotenv').config();

const app = express();

const routes = require('./routes/routes')

app.use(routes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
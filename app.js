const express = require('express');
const app = express();

const routes = require('./routes/api');


app.use('',routes);
module.exports = app;

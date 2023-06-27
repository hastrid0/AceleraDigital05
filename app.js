const express = require('express');
const app = express();

const routes = require('./routes/api');


app.use('',routes);
//Exportar todo lo que hay en express
module.exports = app;

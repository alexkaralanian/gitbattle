const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

app.use(morgan('dev')); //logging middleware
app.use(express.static(path.join(__dirname, '../public'))); //serving up static files (e.g. css files)

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//error handling middleware - MUST have all 4 parameters
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal Error');
})

module.exports = app

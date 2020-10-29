"use strict";

var express = require('express');

var path = require('path');

var app = express(); // Set static folder

app.use(express["static"](path.join(__dirname, 'public')));
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("Server started on ".concat(PORT));
});
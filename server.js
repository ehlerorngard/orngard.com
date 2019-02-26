const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");


// Configure body parser for axios requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// |======================|
// |Serve up static assets|
// |======================|

// app.use(express.static('build'));


app.use(express.static(path.join(__dirname, 'build')));

-app.get('/', function (req, res) {
+app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });
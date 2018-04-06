var express = require('express');
var app = express();
var path = require('path');
var public = __dirname + "/public/";
var port = 7003;
var colors = require("colors/safe");


app.get('/joy', function(req, res) {
    res.sendFile(path.join(public + "index.html"));
});

app.use('/joy', express.static(public));

app.listen(port, function() {
    console.log(new Date() + " Server is listening on port " + colors.yellow(port));
  });
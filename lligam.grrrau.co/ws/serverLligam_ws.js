var express = require('express');
var app = express();
var path = require('path');
var public = __dirname + "/public/";

app.get('/joy', function(req, res) {
    res.sendFile(path.join(public + "index.html"));
});

app.use('/joy', express.static(public));

app.listen(7003);
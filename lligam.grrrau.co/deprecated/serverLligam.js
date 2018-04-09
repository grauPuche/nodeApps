const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 7003;

app.get('/', (req, res) => res.send('just visited lligam.grrrau.co '))

http.listen(port, () => console.log('listening on port ' + port));
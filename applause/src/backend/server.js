
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/createaccount', function(req, res) {
    console.log(req.body);
    res.status(200);
    res.end();
 });

 app.post('/login', function(req, res) {
    console.log(req.body);
    res.status(200);
    res.end();
 });


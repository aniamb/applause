
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

var unirest = require("unirest");

var req = unirest("GET", "https://deezerdevs-deezer.p.rapidapi.com/search");

req.query({
	"q": "harry styles"
});

req.headers({
	"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
	"x-rapidapi-key": "0eb2fb4595mshdb8688a763ce4f8p1f0186jsn77d3735b4c36",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);
    console.log("hi");
    var yes = res.body;
    console.log(yes);
});

app.post('/search', function (req,res) {

});
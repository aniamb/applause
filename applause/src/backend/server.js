
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

var unirest = require("unirest");

var api = unirest("GET", "https://deezerdevs-deezer.p.rapidapi.com/search");
//var albumAPI = unirest("GET", "https://deezerdevs-deezer.p.rapidapi.com/album/%7Bid%7D");

var searchTerm;

api.headers({
	"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
	"x-rapidapi-key": "0eb2fb4595mshdb8688a763ce4f8p1f0186jsn77d3735b4c36",
	"useQueryString": true
});

//searches API for artist/album
app.post('/searchserver', function (req,res1) {
	console.log(req.body);
	searchTerm = (req.body.value);
	console.log(searchTerm);
	//res.status(200);
	var albumTitles = [];
	var noDups;
	var finalVals = [];


	api.query({
		"q": searchTerm
	});
	
	api.end(function (res) {
		if (res.error) throw new Error(res.error);
		var i;
		for (i = 0; i < res.body.data.length; i++) {
			var albumId = "Album Id:" + res.body.data[i].album.id;
			var albumTitle = "Album Title:" + res.body.data[i].album.title;
			var artist = "Artist:" + res.body.data[i].artist.name;

			albumTitles.push(res.body.data[i].album.title);
		}
		noDups = new Set(albumTitles);
		//console.log(noDups);
		finalVals = Array.from(noDups);
		res1.status(200).json({result: finalVals});
		res1.end();
	});
});





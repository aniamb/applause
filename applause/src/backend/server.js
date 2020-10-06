
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
	var objectsTest = [];
	var finalVals = [];
	var finalObjects = [];


	function Content(title, artist, art) { 
		this.title = title; 
		this.artist = artist; 
		this.art = art;
	 }


	api.query({
		"q": searchTerm
	});
	
	api.end(function (res) {
		if (res.error) throw new Error(res.error);
		var i;
		var k = 'value';
		console.log(res.body.data[0]);
		for (i = 0; i < res.body.data.length; i++) {

			var val1 = new Content(res.body.data[i].album.title, res.body.data[i].artist.name, res.body.data[i].album.cover_medium); 
			objectsTest.push(val1);

			albumTitles.push(res.body.data[i].album.title);
		}
		noDups = new Set(albumTitles);
		var noDupObj = new Set(objectsTest);
		finalVals = Array.from(noDups);
		finalObjects = Array.from(noDupObj);

		//res1.status(200).json({result: finalVals});
		res1.status(200).json({result: finalObjects})
		res1.end();
	});
});





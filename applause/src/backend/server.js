
// const express = require('express');
// const app = express();
// const port = process.env.PORT || 5000;

// // console.log that your server is up and running
// app.listen(port, () => console.log(`Listening on port ${port}`));


const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
//const MongoClient = require('mongodb').MongoClient;
const dbConnectionString = "mongodb+srv://applause:applause@cluster0.schfs.mongodb.net/test?retryWrites=true&w=majority";
const mongoose = require('mongoose');
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

let User = require('./models/user');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());
const bcrypt = require('bcrypt');

mongoose.connect(dbConnectionString, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

//LOADING INFO INTO USER PROFILE CODE
app.get('/profile', function(req, res, err) {
    User.findOne({$or: [
        {'email' : req.query.email}]}).exec(function (err, user){
           console.log(user);
           res.status(200).json(user);
     });
});

// const express = require('express');
// const app = express();
// const port = process.env.PORT || 5000;

// // console.log that your server is up and running
// app.listen(port, () => console.log(`Listening on port ${port}`))

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

mongoose.connect('mongodb://127.0.0.1:27017/applause', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});


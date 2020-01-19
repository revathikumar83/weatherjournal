/* Empty JS object to act as endpoint for all routes */
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());


/* Initializing the main project folder */
app.use(express.static('website'));

const port = 3000;

const data = [];

app.get('/all', getData)

function getData(req, res) {
	res.send(projectData)
}


app.post('/add', addWeather);

function addWeather(req, res) {

	projectData['date'] = req.body.date;
	projectData['temp'] = req.body.temp;
	projectData['content'] = req.body.content;
	projectData['last'] = req.body.last;

	res.send(projectData);

}

// TODO-Spin up the server
const server = app.listen(port, listening);

function listening() {
	console.log(`server is listening on ${port}`);
}

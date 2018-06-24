var express = require('express');
var router = express.Router();
var app = express();

var config=require('./config/config.js');
var bodyParser = require('body-parser');

// for posting nested object if we have set extended true

app.use(bodyParser.urlencoded({ extended : true}));

// parsing JSON

app.use(bodyParser.json());

//nexted routes

var demo_routes = require('./routes/demo_route.js');


//use nexted routes

app.get('/', function(req, res){
    res.send("Welcome to kaustubh framework");
});

app.use('/demo', demo_routes);


app.listen(config.port);

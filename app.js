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
var master_routes = require('./routes/master_route.js');
var login_routes = require('./routes/login_route.js');


//use nexted routes

app.get('/', function(req, res){
    res.send("Welcome to camcrush");
});

app.use('/demo', demo_routes);
app.use('/master', master_routes);
app.use('/login', login_routes);

app.listen(config.port);

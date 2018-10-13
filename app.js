var express = require('express');
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
var camera_routes = require('./routes/camera_route.js');
var general_routes = require('./routes/general_route.js');
var holiday_route = require('./routes/holiday_route.js');
var notification_route = require('./routes/notification_route.js');


//use nexted routes

app.get('/', function(req, res){
    res.send("Welcome to camcrush");
});

app.use('/demo', demo_routes);
app.use('/master', master_routes);
app.use('/login', login_routes);
app.use('/camera', camera_routes);
app.use('/general', general_routes);
app.use('/holiday', holiday_route);
app.use('/notification', notification_route);

app.listen(config.port);

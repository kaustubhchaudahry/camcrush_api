var mysql = require('mysql');
var config =require('../config/config.js');
var helper = require('../helpers/helper.js');

var con = mysql.createConnection(config.connection_config, function (err) {
    if (err)
       return helper.response_json(400, 'connection error',err);

    console.log('database connected successfully');

});

module.exports=con;
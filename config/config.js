var mysql = require('mysql');

module.exports.port = "3000";

//mysql_connection

var env=0; // 0:staging,1:live,2:local

if(env==0)
{
    var host='localhost';
    var user='root';
    var password='';
    var database='camcrush';
}

module.exports.connection_config = {
    host: host,
    user: user,
    password: password,
    database: database,
};


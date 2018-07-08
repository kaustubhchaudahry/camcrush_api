var express = require('Express');
var router = express.Router();
var helper = require('../helpers/helper.js');
var MasterController = require('../controllers/master/MasterController.js');
var con = require('../custom_packages/connection.js');

router.use('/', function (req, res, next) {
    //header = req.headers.header_token;
    //if (header != "undefined") {
    //    con.query('select * from token where token =?', [header], function (err, result) {
    //        if (err) {
    //            return helper.response_json(401, 'Unable to check header', res);
    //        }
    //
    //        if (result.length == 0) {
    //            return helper.response_json(401, 'Unable to authenticate user', res);
    //        }
    //        else {
    //            next();
    //        }
    //    })
    //}

    //console.log(req.headers.header_token);
    console.log('welcome to master');
    next();
});

router.post('/', function(req, res){
    MasterController.get({},res);
});


module.exports = router;
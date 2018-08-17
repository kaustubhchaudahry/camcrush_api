var express = require('express');
var router = express.Router();
var helper = require('../helpers/helper.js');
var MasterController = require('../controllers/master/MasterController.js');
var CommonController = require('../controllers/common/CommonController.js');

var con = require('../custom_packages/connection.js');

router.use('/', function (req, res, next) {

    header = req.headers.header_token;
    CommonController.validateToken(header,res,next);
});

router.post('/', function(req, res){
    MasterController.get({},res);
});


module.exports = router;
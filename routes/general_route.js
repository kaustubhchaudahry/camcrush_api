var express = require('express');
var router = express.Router();
var GeneralController = require('../controllers/general/GeneralController.js');
var CommonController = require('../controllers/common/CommonController.js');

var con = require('../custom_packages/connection.js');

router.use('/', function (req, res, next) {
    header = req.headers.header_token;
    CommonController.validateToken(header,res,next);
});

router.post('/', function (req, res) {
res.send('welcome to general route');
});

router.post('/curent-timestamp', function (req, res) {
   GeneralController.currentTimeStamp({},res);
});


module.exports = router;


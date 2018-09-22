var express = require('express');
var router = express.Router();
var GeneralController = require('../controllers/general/GeneralController.js');
var CommonController = require('../controllers/common/CommonController.js');
var Validator = require('validatorjs');
var con = require('../custom_packages/connection.js');
var helper = require('../helpers/helper.js');

router.use('/', function (req, res, next) {
    header = req.headers.header_token;
    CommonController.validateToken(header, res, next);
});

router.post('/', function (req, res) {
    res.send('welcome to general route');
});

router.post('/curent-timestamp', function (req, res) {
    GeneralController.currentTimeStamp({}, res);
});

router.post('/validate-user', function (req, res) {

    rules = {
        student_id: 'required',
    };

    data = req.body;

    var validation = new Validator(data, rules);

    if (validation.fails()) {
        return helper.response_missing_json('Invalid parameter', res, validation.errors.all());
    }

    res1 = GeneralController.validateUser(data);

    res1.then((result)=> {
        return helper.response_json(200, 'Valid User', res, result);
    }, (result)=> {
        return helper.response_json(400, "User Don't Have Access", res, result);
    })
});


module.exports = router;


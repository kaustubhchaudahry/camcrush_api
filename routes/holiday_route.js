var express = require('express');
var router = express.Router();
var helper = require('../helpers/helper.js');
var HolidayController = require('../controllers/holiday/HolidayController.js');
var CommonController = require('../controllers/common/CommonController.js');
var con = require('../custom_packages/connection.js');

router.use('/', async function (req, res, next) {
    header = req.headers.header_token;
  CommonController.validateToken(header,res,next);
});

router.post('/get-holiday', function (req, res) {
    HolidayController.getHoliday(req.body, res);
        //res.send(req.body);
});

module.exports = router;
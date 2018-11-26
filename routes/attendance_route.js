var express = require('express');
var router = express.Router();
var helper = require('../helpers/helper.js');
var AttendanceController = require('../controllers/attendance/AttendanceController.js');
var CommonController = require('../controllers/common/CommonController.js');
var con = require('../custom_packages/connection.js');

router.use('/', async function (req, res, next) {
    header = req.headers.header_token;
  CommonController.validateToken(header,res,next);
});

router.post('/get-attendance', function (req, res) {
    AttendanceController.getAttendance(req.body, res);
});

module.exports = router;
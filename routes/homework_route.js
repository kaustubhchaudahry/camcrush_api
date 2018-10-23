var express = require('express');
var router = express.Router();
var HomeworkController = require('../controllers/homework/HomeworkController.js');
var CommonController = require('../controllers/common/CommonController.js');


router.use('/', async function (req, res, next) {
    header = req.headers.header_token;
  CommonController.validateToken(header,res,next);
});

router.post('/', function (req, res) {
    HomeworkController.getHomework(req.body, res);
});

module.exports = router;
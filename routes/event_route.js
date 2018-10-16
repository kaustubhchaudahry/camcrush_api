var express = require('express');
var router = express.Router();
var EventController = require('../controllers/event/EventController.js');
var CommonController = require('../controllers/common/CommonController.js');


router.use('/', async function (req, res, next) {
    header = req.headers.header_token;
  CommonController.validateToken(header,res,next);
});

router.post('/get-event', function (req, res) {
    EventController.getEvent(req.body, res);
});

module.exports = router;
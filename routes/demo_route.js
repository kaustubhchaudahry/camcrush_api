var express = require('Express');
var router = express.Router();
var helper = require('../helpers/helper.js');
var DemoController = require('../controllers/demo/DemoController.js');

router.post('/list', function (req, res) {
    DemoController.getAll(data, res);
});

router.post('/save', function (req, res) {
    DemoController.save(req.body, res);
});

router.put('/update', function (req, res) {
    DemoController.update(req.body, res);
});

module.exports = router;
var express = require('Express');
var router = express.Router();
var helper = require('../helpers/helper.js');
var DemoController = require('../controllers/demo/DemoController.js');
var con = require('../custom_packages/connection.js');

router.use('/', function (req, res, next) {

    header = req.headers.header_token;
    if (header != "undefined") {
        con.query('select * from token where token =?', [header], function (err, result) {
            if (err) {
                return helper.response_json(401, 'Unable to check header', res);
            }

            if (result.length == 0) {
                return helper.response_json(401, 'Unable to authenticate user', res);
            }
            else {
                next();
            }
        })

    }

    console.log(req.headers.header_token);
});

router.post('/list', function (req, res) {
    DemoController.getAll({}, res);
});

router.post('/save', function (req, res) {
    DemoController.save(req.body, res);
});

router.put('/update', function (req, res) {
    DemoController.update(req.body, res);
});

module.exports = router;
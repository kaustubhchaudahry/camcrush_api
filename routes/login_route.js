var express = require('express');
var router = express.Router();
var LoginController = require('../controllers/login/LoginController.js');
var con = require('../custom_packages/connection.js');

router.use('/', function (req, res, next) {
    next();
});

router.post('/', function (req, res) {
    LoginController.login(req.body, res);
});

router.post('/change-password', function (req, res) {

    LoginController.changePassword(req.body, res);
});

router.post('/get-school-menu-role', function (req, res) {

    LoginController.getSchoolMenuRole(req.body, res);
});

module.exports = router;
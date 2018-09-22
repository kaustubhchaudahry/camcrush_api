var con = require('../../custom_packages/connection.js');
var helper = require('../../helpers/helper.js');
var Validator = require('validatorjs');

module.exports.currentTimeStamp = async function (data, res) {

    response={};

    response.timestamp=helper.currentTimeStamp();

    return helper.response_json(200, 'success', res, response);
};


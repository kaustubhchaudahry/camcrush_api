var con = require('../../custom_packages/connection.js');
var helper = require('../../helpers/helper.js');
var Validator = require('validatorjs');

module.exports.validateToken =async function (header,res,next) {

    if (header != "undefined") {
        con.query('select * from cc_token where token =?', [header], function (err, result) {
            if (err) {
                return helper.response_json(401, 'Token Require', res);
            }

            if (result.length == 0) {
                return helper.response_json(401, 'Unable to authenticate user', res);
            }
            else {
                next();
            }
        })
    }else
    {
        return helper.response_json(401, 'Token Require', res);
    }


};

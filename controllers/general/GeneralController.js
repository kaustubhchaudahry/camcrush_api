var con = require('../../custom_packages/connection.js');
var helper = require('../../helpers/helper.js');
var Validator = require('validatorjs');

module.exports.currentTimeStamp = async function (data, res) {

    response = {};

    response.timestamp = helper.currentTimeStamp();

    return helper.response_json(200, 'success', res, response);
};

module.exports.validateUser = async function (data) {

    return new Promise((resolve, reject)=> {
        var sql = "select * from cc_student where status=1 and id=?";

        con.query(sql, [data.student_id], function (err, result) {

            if (err) {
                reject({valid: 0})
            }

            if (result.length > 0) {
                resolve({valid: 1});
            } else {
                reject({valid: 0});
            }

        });


    });
};


var con = require('../../custom_packages/connection.js');
var helper = require('../../helpers/helper.js');
var Validator = require('validatorjs');

module.exports.getStudentCamera = function (data, res) {

    rules = {
        student_id: 'required',
    };

    var validation = new Validator(data, rules);

    if (validation.fails()) {
        return helper.response_missing_json('Invalid parameter', res, validation.errors.all());
    }

   var student_id=data.student_id;

    var mysql_query='select ' +
        'cc_camera.* ' +
        'from cc_camera_student left join cc_camera on cc_camera_student.camera_id=cc_camera.id ' +
        'where student_id=?';

    con.query(mysql_query,[student_id] ,function (err, result) {
        if (err) {
            return helper.response_json(400, 'Unable to fetch data', res,err);
        };

        return helper.response_json(200, 'success', res, result);
    });
};


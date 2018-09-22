var con = require('../../custom_packages/connection.js');
var helper = require('../../helpers/helper.js');
var Validator = require('validatorjs');
var fs = require('fs');

module.exports.getStudentCamera = function (data, res) {

    rules = {
        student_id: 'required'
    };

    var validation = new Validator(data, rules);

    if (validation.fails()) {
        return helper.response_missing_json('Invalid parameter', res, validation.errors.all());
    }

   var student_id=data.student_id;

    var global_config=JSON.parse(fs.readFileSync('./config/global_config.json','utf8'));

    var access_time=global_config.access_time;

    var mysql_query='select ' +
        'cc_camera.* ,' +
        'cc_class.start_time ,' +
        'cc_class.end_time ,' +
        ''+access_time+' as access_time ' +
        'from cc_camera_student left join cc_camera on cc_camera_student.camera_id=cc_camera.id ' +
        'left join cc_class on cc_class.id=cc_camera_student.class_id ' +
        'where cc_camera_student.student_id=?';

    con.query(mysql_query,[student_id] ,function (err, result) {
        if (err) {
            return helper.response_json(400, 'Unable to fetch data', res,err);
        };

        return helper.response_json(200, 'success', res, result);
    });
};


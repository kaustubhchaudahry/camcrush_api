var con = require('../../custom_packages/connection.js');
var helper = require('../../helpers/helper.js');
var Validator = require('validatorjs');
var fs = require('fs');

module.exports.getAttendance= async function (data, res) {

    rules = {
        school_id: 'required',
        branch_id: 'required',
        class_id: 'required',
        student_id:'required'
    };

    var validation = new Validator(data, rules);

    if (validation.fails()) {
        return helper.response_missing_json('Invalid parameter', res, validation.errors.all());
    }

    var school_id = data.school_id;
    var branch_id = data.branch_id;
    var class_id = data.class_id;
    var student_id=data.student_id


    var mysql_query = 'SELECT ' +
        'DATE_FORMAT(day,"%Y-%m%-%d") as day, ' +
        'attendance' +
        ' FROM' +
        ' cc_attendance ' +
        ' WHERE status=1 ' +
        ' AND school_id=? ' +
        ' AND branch_id=? ' +
        ' AND class_id=? '+
        ' AND student_id=? '+
        ' order by day desc';

    con.query(mysql_query, [school_id, branch_id, class_id,student_id],async function (err, result) {
        if (err) {
            return helper.response_json(400, 'Unable to fetch data', res, err);
        }
        ;

        response = {};

            response['attendance'] = result;

            return helper.response_json(200, 'success', res, response);
    });
};

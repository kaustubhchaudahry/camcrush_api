var con = require('../../custom_packages/connection.js');
var helper = require('../../helpers/helper.js');
var Validator = require('validatorjs');
var fs = require('fs');

module.exports.getEvent = function (data, res) {

    rules = {
        school_id: 'required',
        branch_id: 'required',
        class_id: 'required',
        event_type: 'required'
    };

    var validation = new Validator(data, rules);

    if (validation.fails()) {
        return helper.response_missing_json('Invalid parameter', res, validation.errors.all());
    }

    var school_id = data.school_id;
    var branch_id = data.branch_id;
    var class_id = data.class_id;
    var event_type = data.event_type;

    var parameter = [school_id, branch_id];

    var mysql_query = 'select ' +
        'name,' +
        'descr,' +
        'start_time,' +
        'end_time,' +
        'DATE_FORMAT(day,"%d %M %Y") as day,' +
        'location,' +
        'type ' +
        'from cc_event where school_id=?' +
        ' and branch_id=?' +
        ' and status=1';

    if (event_type != 0) {
        mysql_query += ' and type=?';
        parameter.push(event_type);
    }

    con.query(mysql_query, parameter, function (err, result) {
        if (err) {
            return helper.response_json(400, 'Unable to fetch data', res, err);
        }
        ;

        response = {};

        response['list_of_event'] = result;

        return helper.response_json(200, 'success', res, response);
    });
};


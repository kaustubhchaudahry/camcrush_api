var con = require('../../custom_packages/connection.js');
var helper = require('../../helpers/helper.js');
var Validator = require('validatorjs');
var fs = require('fs');

module.exports.getHoliday = function (data, res) {

    rules = {
        school_id: 'required',
        branch_id: 'required'
    };

    var validation = new Validator(data, rules);

    if (validation.fails()) {
        return helper.response_missing_json('Invalid parameter', res, validation.errors.all());
    }

   var school_id=data.school_id;


    var mysql_query='select ' +
        'id,' +
        'DATE_FORMAT(day,"%d %M %Y") AS day ,' +
        'descr ' +
        'from cc_holiday where status=1 and school_id= ? order by day ASC';

    con.query(mysql_query,[school_id] ,function (err, result) {
        if (err) {
            return helper.response_json(400, 'Unable to fetch data', res,err);
        };

        response={};

        response['list_of_holidays']=result;

        return helper.response_json(200, 'success', res, response);
    });
};


var con = require('../../custom_packages/connection.js');
var helper = require('../../helpers/helper.js');
var Validator = require('validatorjs');
var fs = require('fs');

module.exports.getHomework = async function (data, res) {

    rules = {
        school_id: 'required',
        branch_id: 'required',
        class_id: 'required'
    };

    var validation = new Validator(data, rules);

    if (validation.fails()) {
        return helper.response_missing_json('Invalid parameter', res, validation.errors.all());
    }

    var school_id = data.school_id;
    var branch_id = data.branch_id;
    var class_id = data.class_id;


    var mysql_query = 'SELECT ' +
        '*' +
        ' FROM' +
        ' cc_homework ' +
        ' WHERE status=1 ' +
        ' AND school_id=? ' +
        ' AND branch_id=? ' +
        ' AND class_id=? ';

    con.query(mysql_query, [school_id, branch_id, class_id],async function (err, result) {
        if (err) {
            return helper.response_json(400, 'Unable to fetch data', res, err);
        }
        ;

        response = {};


        for(i in result)
        {
            result[i]['images']= await new Promise((resolve, reject)=> {
                var mysql_query = 'SELECT ' +
                    'img_path' +
                    ' FROM' +
                    ' cc_homework_images ' +
                    ' WHERE status=1 ' +
                    ' AND homework_id=? ';

                con.query(mysql_query, [result[i]['id']], function (err, result2) {
                    return resolve(result2);
                });
        });

        }

            response['list_of_homework'] = result;

            return helper.response_json(200, 'success', res, response);
    });
};

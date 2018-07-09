var con = require('../../custom_packages/connection.js');
var helper = require('../../helpers/helper.js');
var Validator = require('validatorjs');

module.exports.getAll = function (data, res) {
    con.query('select * from student', function (err, result) {
        if (err) {
            return helper.response_json(400, 'Unable to fetch data', res);
        };

        return helper.response_json(200, 'success', res, result);
    });
};

module.exports.save = function (data, res) {
    rules = {
        name: 'required',
        marks: 'required',
        year: 'required',
        class: 'required'
    };

    var validation = new Validator(data, rules);

    if (validation.fails()) {
        return helper.response_missing_json('Invalid parameter', res, validation.errors.all());
    }

    sql_query = "insert into student(name,mark,year,class) value ?";

    sql_param = [[
        data.name,
        data.marks,
        data.year,
        data.class
    ]];

    con.query(sql_query, [sql_param], function (err, result) {
        console.log(err);
        if (err) {
            throw err.sqlMessage;
        };
        if(result.affectedRows>0) {
            return helper.response_success_json('Data store successfully', res);
        }
        return helper.response_error_json('Unable to insert data', res);
    });
};

module.exports.update = function (data, res) {
    rules = {
        id: 'required',
        name: 'required',
        marks: 'required',
        year: 'required',
        class: 'required'
    };

    var validation = new Validator(data, rules);

    if (validation.fails()) {
        return helper.response_missing_json('Invalid parameter', res, validation.errors.all());
    }

    sql_query = "update student" +
        " set name=? , mark=?," +
        "year=? , class=? where id=?";

    sql_param = [
        data.name,
        data.marks,
        data.year,
        data.class,
        data.id
    ];

    con.query(sql_query, sql_param, function (err, result) {

        if (err) {
            throw err.sqlMessage;
        };

        if(result.affectedRows>0) {
            return helper.response_success_json('Data updated successfully', res);
        }
        return helper.response_error_json('Unable to update data', res);
    });
};
var con = require('../../custom_packages/connection.js');
var helper = require('../../helpers/helper.js');
var Validator = require('validatorjs');

module.exports.login = async function (data, res) {

    rules = {
        email: 'required',
        password: 'required',
        device_id: 'required'
    };

    var validation = new Validator(data, rules);

    if (validation.fails()) {
        return helper.response_missing_json('Invalid parameter', res, validation.errors.all());
    }

    var email = data.email;
    var password = data.password;
    var device_id = data.device_id;
    var response = {};
    var school_id;
    var student_id;

    //user name and password checking code

    await new Promise((resolve, reject) => {

        var sql_query = 'select ' +
            'id,' +
            'branch_id,' +
            'school_id,' +
            'class_id,' +
            'division,' +
            'first_name,' +
            'last_name,' +
            'dob,' +
            'gender,' +
            'blood_group,' +
            'roll_no,' +
            'adminssion_no,' +
            'religion,' +
            'adhar_number,' +
            'father_name,' +
            'father_occu,' +
            'father_phone,' +
            'mother_name,' +
            'mother_occ,' +
            'mother_phono,' +
            'email,' +
            'nationality,' +
            'present_address,' +
            'city_id,' +
            'state_id,' +
            'pincode,' +
            'per_address,' +
            'per_city_id,' +
            'per_state_id,' +
            'per_pincode,' +
            'start_time,' +
            'changed_password,' +
            'end_time' +
            ' from cc_student where email= ? and password= ? and  status=1 limit 1';

        con.query(sql_query, [email, password], function (err, result) {

            if (err) {
                return helper.response_json(400, 'Unable to fetch data', res, err);
            }

            response.details = result;

            resolve();
        });
    });

    if (response.details.length > 0) {

        student_id=response.details[0].id;

        //return menu master

        var menu=  getMenu(response.details[0].school_id);

        menu.then(function(result)
        {
            response.school_menu_role=result;

        });

        //delete previous token

        await new Promise((resolve, reject)=> {

            sql_query = "delete  from cc_token where student_id= ?";

            con.query(sql_query, [student_id], function (err, result) {
                if (err) {
                    return helper.response_json(400, 'Something went wrong while Deleting Token', res, err);
                }
                resolve();
            });
        });

        //generate new token and insert


        await new Promise((resolve, reject)=> {

            var token = helper.guid(student_id);
            var timestamp = helper.currentTimeStamp();

            sql_query = "insert into cc_token(token,device_id,student_id,created_at,updated_at) values (?,?,?,?,?)";

            con.query(sql_query, [token, device_id, student_id, timestamp, timestamp, timestamp], function (err, result) {
                if (err) {
                    return helper.response_json(400, 'Something went wrong while Deleting Token', res, err);
                }

                response.token = token;
                resolve();
            });
        });

        return helper.response_json(200, 'success', res, response);
    }

    return helper.response_json(400, 'Invalid Credential', res, {});
};

module.exports.changePassword = async function (data, res) {

    rules = {
        student_id: 'required',
        old_password: 'required',
        new_password: 'required',
    };

    var validation = new Validator(data, rules);

    if (validation.fails()) {
        return helper.response_missing_json('Invalid parameter', res, validation.errors.all());
    }

    var student_id = data.student_id;
    var old_password = data.old_password;
    var new_password = data.new_password;

    await new Promise((resolve, reject)=> {

        sql_query = "select * from cc_student where id=? and password=? and status=1";

        con.query(sql_query, [student_id, old_password], function (err, result) {
            if (err) {
                return helper.response_json(400, 'Something went wrong', res, err);
            }

            if (result.length == 0) {
                return helper.response_json(400, 'Invalid Old password', res, {});
            }
            resolve();
        });
    });

    await new Promise((resolve, reject)=> {

        sql_query = "update cc_student set password=? where id=?";

        con.query(sql_query, [new_password, student_id], function (err, result) {
            if (err) {
                return helper.response_json(400, 'Something went wrong', res, err);
            }

            if (result.affectedRows > 0) {
                return helper.response_json(200, 'Password changed successfully', res, err);
            }

            resolve();
        });
    });
};

getMenu =(school_id)=> {

    return new Promise((resolve, reject)=> {

        var sql_query = 'select ' +
            'menu.id,' +
            'menu.name ' +
            'from cc_school_menu as school_menu ' +
            'left join cc_menu_master as menu on school_menu.menu_id = menu.id' +
            ' where school_menu.school_id= ? and  school_menu.status=1';

        con.query(sql_query, [school_id], function (err, result) {
            if (err) {
                resolve([]);
            }

            resolve(result);
        });
    });

};

module.exports.getSchoolMenuRole=async function (data, res) {

    rules = {
        school_id: 'required',
    };

    var validation = new Validator(data, rules);

    if (validation.fails()) {
        return helper.response_missing_json('Invalid parameter', res, validation.errors.all());
    }

    var school_id=data.school_id;
    var response={};

    //return menu master

    var menu=  getMenu(school_id);

    menu.then(function(result)
    {
        response.school_menu_role=result;
        return helper.response_json(200, 'Success', res, response);
    },function(error)
    {
        return helper.response_json(400, 'error', res, response);
    });

};

module.exports.forgetPassword=async function (data, res) {

    rules = {
        username: 'required',
    };

    var validation = new Validator(data, rules);

    if (validation.fails()) {
        return helper.response_missing_json('Invalid parameter', res, validation.errors.all());
    }

    return helper.response_json(200, 'Your password has been mailed', res);

};
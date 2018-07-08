var con = require('../../custom_packages/connection.js');
var helper = require('../../helpers/helper.js');
var Validator = require('validatorjs');

module.exports.login = async function (data, res) {

    rules = {
        email: 'required',
        password: 'required',
        device_id: 'required',
    };

    var validation = new Validator(data, rules);

    if (validation.fails()) {
        return helper.response_missing_json('Invalid parameter', res, validation.errors.all());
    }

    var email=data.email;
    var password=data.password;
    var device_id=data.device_id;
    var response={};
    var login=0;
    var school_id;
    var student_id;

    //user name and password checking code

   await new Promise((resolve,reject) => {
        con.query('select * from cc_student where email= ? and password= ? and  status=1 limit 1', [email, password], function (err, result) {
            if (err) {
                return helper.response_json(400, 'Unable to fetch data', res, err);
            }

            login=1;
            response.details = result;

            resolve();
        });
    });

    if (response.details.length > 0) {

        //return menu master

        await new Promise((resolve,reject)=>{

             school_id=response.details[0].school_id;
            student_id=response.details[0].id;

            var sql_query='select ' +
                'menu.id,' +
                'menu.name ' +
                'from cc_school_menu as school_menu ' +
                'left join cc_menu_master as menu on school_menu.menu_id = menu.id' +
                ' where school_menu.school_id= ? and  school_menu.status=1';


            con.query(sql_query, [school_id], function (err, result) {
                if (err) {
                    return helper.response_json(400, 'Something went wrong while fetch school menu', res, err);
                }

                response.school_menu=result;
                resolve();
            });
        });

        //delete previous token

        await new Promise((resolve,reject)=>{

            sql_query="delete  from cc_token where student_id= ?";

            con.query(sql_query, [student_id], function (err, result) {
                if (err) {
                    return helper.response_json(400, 'Something went wrong while Deleting Token', res, err);
                }
                resolve();
            });
        });

        //generate new token and insert


        await new Promise((resolve,reject)=>{

            var token=helper.guid(student_id);
            var timestamp=helper.currentTimeStamp();

            sql_query="insert into cc_token(token,device_id,student_id,created_at,updated_at) values (?,?,?,?,?)";

            con.query(sql_query, [token,device_id,student_id,timestamp,timestamp,timestamp], function (err, result) {
                if (err) {
                    return helper.response_json(400, 'Something went wrong while Deleting Token', res, err);
                }
                resolve();
            });
        });



        return helper.response_json(200, 'success', res, response);
    }

    return helper.response_json(400, 'fail to login', res, {});
};


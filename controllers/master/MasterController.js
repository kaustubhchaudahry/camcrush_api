var con = require('../../custom_packages/connection.js');
var helper = require('../../helpers/helper.js');
var Validator = require('validatorjs');

module.exports.get = async function (data, res) {
    var response = {};

    // menu master

    await new Promise((resolve, reject) => {
        con.query('select id,name from cc_menu_master where status=1', function (err, menu_master) {

            if (err) {
                return helper.response_json(400, 'Unable to fetch data', res, err);
            }
            ;

            response.menu_master = menu_master;
            resolve();
        });
    });

    //version master

    await new Promise((resolve, reject) => {
        con.query('select id,name,version,url from cc_version_master where status=1 order by created_at desc', function (err, version_master) {

            if (err) {
                return helper.response_json(400, 'Unable to fetch data', res, err);
            }
            ;

            response.version = version_master;
            resolve();
        });
    });

    return helper.response_json(200, 'success', res, response);

};

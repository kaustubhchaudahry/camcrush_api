var moment = require('moment');

module.exports.response_json = function (code, msg, res, data) {

    var res_data = data || {};
    var response = {
        code: code,
        msg: msg,
        data: res_data
    };

    return res.status(code).send(response);
};

module.exports.response_success_json = function (msg, res, data) {
    var code = 200; // OK
    var res_data = data || {};
    var response = {
        code: code,
        msg: msg,
        data: res_data
    };

    return res.status(code).send(response);
};

module.exports.response_error_json = function (msg, res, data) {
    var code = 204; // NO CONTENT
    var res_data = data || {};
    var response = {
        code: code,
        msg: msg,
        data: res_data
    };

    return res.status(code).send(response);
};


module.exports.response_missing_json = function (msg, res, data) {
    var code = 400; // PARAMETER MISSING
    var res_data = data || {};
    var response = {
        code: code,
        msg: msg,
        data: res_data
    };

    return res.status(code).send(response);
};

module.exports.guid = function (id) {
    function s4() {

        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return id + '_' + s4() + s4() + s4() + s4() + s4();
};

module.exports.currentTimeStamp=function()
{
    return moment().format("YYYY-MM-DD HH:mm:ss");
};
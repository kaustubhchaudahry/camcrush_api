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
const autoBind = require('auto-bind');
const responseBuilder = require('../common/builders/response.builder');
const {HttpCode} = require('../common/enums');

class BaseController {
    constructor() {
        autoBind(this);
    }

    ok(callback, data) {
        const response = responseBuilder.build(HttpCode.OK, data);
        callback(null, response);
    }

    error(callback, message, httpCode = HttpCode.InternalServerError) {
        const response = responseBuilder.build(httpCode, message);
        callback(null, response);
    }
}
module.exports = BaseController;

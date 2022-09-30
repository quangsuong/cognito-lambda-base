'use strict';

const {ResponseMessage} = require('../constants');
const {HttpCode, ErrorCode} = require('../enums');

function getMessageFromCode(code) {
    switch (code) {
        case HttpCode.InternalServerError:
            return ResponseMessage.InternalServerError;
        case HttpCode.BadRequest:
            return ResponseMessage.BadRequest;
        case HttpCode.Unauthorized:
            return ResponseMessage.Unauthorized;
        case HttpCode.Forbidden:
            return ResponseMessage.Forbidden;
        case HttpCode.NotFound:
            return ResponseMessage.ResourceNotFound;
        case HttpCode.ServiceUnavailable:
            return ResponseMessage.ServiceUnavailable;
        default:
            return ResponseMessage.InternalServerError;
    }
}

function getErrorCode(data) {
    const code = Number(data);
    return Number.isInteger(code) ? code : 0;
}

function getErrorMessage(code) {
    const message = getKeyByValue(ErrorCode, code);
    return message ? message.replace(/([A-Z])/g, ' $1').trim() : `${code}`;
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function getErrorResponse(httpCode, data) {
    const response = {
        errorCode: httpCode ? httpCode : HttpCode.InternalServerError,
    };

    if (data) {
        response.errorMessage = data ? data : getMessageFromCode(response.errorCode);
    } else {
        response.errorMessage = getMessageFromCode(httpCode);
    }

    return {
        statusCode: response.errorCode,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(response),
        isBase64Encoded: false,
    };
}

function getSuccessResponse(data) {
    return {
        statusCode: HttpCode.OK,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        isBase64Encoded: false,
    };
}

class ResponseBuilder {
    build(httpCode = HttpCode.OK, data) {
        switch (httpCode) {
            case HttpCode.OK:
                return getSuccessResponse(data);
            default:
                return getErrorResponse(httpCode, data);
        }
    }
}

module.exports = new ResponseBuilder();

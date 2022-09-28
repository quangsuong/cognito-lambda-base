'use strict';

const ResponseMessage = Object.freeze({
    InternalServerError: 'Internal Server Error',
    BadRequest: 'Bad Request',
    Unauthorized: 'Unauthorized',
    Forbidden: 'Forbidden',
    ResourceNotFound: 'Resource Not Found',
    ServiceUnavailable: 'Service Unavailable',
});

module.exports = Object.freeze({
    ResponseMessage,
});

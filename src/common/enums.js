'use strict';

const HttpCode = Object.freeze({
    OK: 200,
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    InternalServerError: 500,
    ServiceUnavailable: 503,
});

const ErrorCode = Object.freeze({
    None: 0,
    DataNotFound: 1,

    //Auth: 100 - 199
    UsernameOrPasswordIsIncorrect: 100,
    TokenIsInvalid: 101,
    TokenIsExpired: 102,
    Unauthorized: 103,
    NotChangePassword: 104,
    AppIdOrAppSecretIsIncorrect: 105,
    UnauthorizedOrg: 106,
    OldPasswordNotCorrect: 107,

    //User: 200-299
    UserIsNotFound: 200,
    CannotChangeStatus: 201,
    CannotGetUser: 202,
    CannotUpdateUser: 203,
    CannotCreateUser: 204,
    CannotDeleteUser: 205,
    UserIsExisting: 206,
    EmailIsExisting: 207,
    CannotSendEmail: 208,
    EmailDoesNotExist: 209,

    //Role:400-499
    CannotGetRole: 400,
    RoleNotFound: 401,
    CannotCreateRole: 402,
    CannotUpdateRole: 403,
});

module.exports = Object.freeze({
    HttpCode,
    ErrorCode,
});

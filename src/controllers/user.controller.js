const BaseController = require('./base.controller');
const {
    HttpCode,
    ErrorCode,
} = require('../common/enums');
const Cognito = require('../cognito/cognito');
// const userModel = require('../models/user.model');
require('cross-fetch/polyfill');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = {
    UserPoolId: 'ap-southeast-1_N7inwdT11', // Your user pool id here
    ClientId: '4m4rhbfoti4ocbdrt583ghglci', // Your client id here
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// const sequelize = require('../config/database');
class UserController extends BaseController {
    init() {
        // userModel.sync({alter: true});
    }

    async signUp(event, context, callback) {
        const body = event.body;
        const attributeList = [];
        const dataEmail = {
            Name: 'email', Value: body.email,
        };
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail));
        try {
            userPool.signUp(body.email, body.password, attributeList, null, (error, result) => {
                if (error) return this.error(callback, error);
                const data = {
                    success: true, user: result.user,
                };
                callback(null, data);
            });
        } catch (error) {
            console.error(error);
            return this.error(callback, error);
        }
    }

    async confirmRegistration(event, context, callback) {
        try {
            callback(null, event);
        } catch (error) {
            console.error(error);
            return this.error(callback, error);
        }
    }

    async resendConfirmationCode(event, context, callback) {
        try {
            callback(null, event);
        } catch (error) {
            console.error(error);
            return this.error(callback, error);
        }
    }

    async login(event, context, callback) {
        try {
            const body = JSON.parse(event.body);
            const result = await Cognito.asyncAuthenticateUser(body.username, body.password);
            const data = {
                accessToken: result.getAccessToken().getJwtToken(),
                refreshToken: result.getRefreshToken().getToken(),
                exp: result.getAccessToken().getExpiration(),
            };
            this.ok(callback, data);
        } catch (error) {
            return this.error(callback, error.message, ErrorCode.UsernameOrPasswordIsIncorrect);
        }
    }

    async createUser(event, context, callback) {
        try {
            callback(null, event);
        } catch (error) {
            console.error(error);
            return this.error(callback, error);
        }
    }

    async getUserInfo(event, context, callback) {
        try {
            return this.ok(callback, event);
            // return this.error(res, ErrorCode.TutorialNotFound);
        } catch (error) {
            console.error(error);
            return this.error(callback);
        }
    }
}

module.exports = new UserController();

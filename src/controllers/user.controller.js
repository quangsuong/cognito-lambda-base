const BaseController = require('./base.controller');
const {HttpCode} = require('../common/enums');
const Cognito = require('../cognito/cognito');
const userModel = require('../models/user.model');

class UserController extends BaseController {
    async login(event, context, callback) {
        try {
            const body = JSON.parse(event.body);
            const result = await Cognito.asyncAuthenticateUser(body.username, body.password);
            const data = {
                accessToken: result.getAccessToken().getJwtToken(),
                refreshToken: result.getRefreshToken().getToken(),
            };
            await userModel.upsert(
                {
                    sub: result.idToken.payload.sub,
                    email: result.idToken.payload.email,
                    id_token: result.getIdToken().getJwtToken(),
                    refresh_token: result.getAccessToken().getJwtToken(),
                    access_token: result.getRefreshToken().getToken(),
                },
                {
                    returning: true,
                },
            );
            this.ok(callback, data);
        } catch (error) {
            this.error(callback, error.message, HttpCode.NotFound);
        }
    }

    async logout(event, context, callback) {
        try {
            this.ok(callback, event);
        } catch (error) {
            this.error(callback, error.message, HttpCode.NotFound);
        }
    }

    async refreshToken(event, context, callback) {
        try {
            const body = JSON.parse(event.body);
            const user = await userModel.findOne({
                where: {
                    refreshToken: body.refreshToken,
                },
            });
            const result = await Cognito.refreshToken(user.refreshToken, user.email);
            const data = {
                accessToken: result.getAccessToken().getJwtToken(),
                refreshToken: result.getRefreshToken().getToken(),
                exp: result.getAccessToken().getExpiration(),
            };
            this.ok(callback, data);
        } catch (error) {
            this.error(callback, error.message, HttpCode.NotFound);
        }
    }
}

module.exports = new UserController();

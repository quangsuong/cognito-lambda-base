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
                    access_token: result.getAccessToken().getJwtToken(),
                    refresh_token: result.getRefreshToken().getToken(),
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
            const user = await userModel.findOne({
                where: {
                    access_token: event.headers.Authentication,
                },
            });

            if (user != null) {
                await Cognito.logout(user.email, user.id_token, user.access_token, user.refresh_token);
                const data = {
                    'success': true
                }
                this.ok(callback, data);

                return;
            }
            this.error(callback, error.message, HttpCode.NotFound);
        } catch (error) {
            this.error(callback, error.message, HttpCode.NotFound);
        }
    }

    async refreshToken(event, context, callback) {
        try {
            const body = JSON.parse(event.body);
            const user = await userModel.findOne({
                where: {
                    refresh_token: body.refreshToken,
                },
            });
            const result = await Cognito.refreshToken(user.refresh_token, user.email);
            const data = {
                accessToken: result.getAccessToken().getJwtToken(),
                refreshToken: result.getRefreshToken().getToken(),
            };

            await userModel.upsert(
                {
                    sub: user.sub,
                    email: user.email,
                    id_token: user.id_token,
                    access_token: result.getAccessToken().getJwtToken(),
                    refresh_token: result.getRefreshToken().getToken(),
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

    async forgotPassword(event, context, callback) {
        try {
            const body = JSON.parse(event.body);
            await Cognito.forgotPassword(body.username);
            const data = {
                'success': true
            }
            this.ok(callback, data);
        } catch (error) {
            this.error(callback, error.message, HttpCode.InternalServerError);
        }
    }

    async confirmPassword(event, context, callback) {
        try {
            const body = JSON.parse(event.body);
            await Cognito.confirmPassword(body.username, body.verificationCode, body.newPassword);
            const data = {
                'success': true
            }
            this.ok(callback, data);
        } catch (error) {
            if (error.code) {
                this.error(callback, error.code, HttpCode.LimitExceeded);

                return;
            }
            this.error(callback, error.message, HttpCode.InternalServerError);
        }
    }

    async changePassword(event, context, callback) {
        try {
            const body = JSON.parse(event.body);

            await Cognito.changePassword(body.username, body.oldPassword, body.newPassword);
            const data = {
                'success': true
            }
            this.ok(callback, data);
        } catch (error) {
            if (error.code) {
                this.error(callback, error.code, HttpCode.LimitExceeded);

                return;
            }
            this.error(callback, error.message, HttpCode.InternalServerError);
        }
    }
}

module.exports = new UserController();

const BaseController = require('./base.controller');
const userModel = require('../models/user.model');

const sequelize = require('../config/database');

class UserController extends BaseController {
    init() {
        userModel.sync({alter: true});
    }

    async signUp(event, context, callback) {
        try {
            callback(null, event);
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
            callback(null, event);
        } catch (error) {
            console.error(error);
            return this.error(callback, error);
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

const userController = require('../controllers/user.controller');

exports.loginLambdaHandler = async (event, context, callback) => {
    await userController.login(event, context, callback);
};
exports.logoutLambdaHandler = async (event, context, callback) => {
    await userController.logout(event, context, callback);
};
exports.refreshTokenLambdaHandler = async (event, context, callback) => {
    await userController.refreshToken(event, context, callback);
};
exports.forgotPasswordLambdaHandler = async (event, context, callback) => {
    await userController.forgotPassword(event, context, callback);
};
exports.confirmPasswordLambdaHandler = async (event, context, callback) => {
    await userController.confirmPassword(event, context, callback);
};
exports.changePasswordLambdaHandler = async (event, context, callback) => {
    await userController.changePassword(event, context, callback);
};
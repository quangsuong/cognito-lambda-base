const userController = require('../controllers/user.controller');

exports.getUserInfoLambdaHandler = async (event, context, callback) => {
    await userController.getUserInfo(event, context, callback);
};
exports.signUpLambdaHandler = async (event, context, callback) => {
    await userController.signUp(event, context, callback)
};
exports.confirmRegistrationLambdaHandler = async (event, context, callback) => {
    await userController.confirmRegistration(event, context, callback)
};
exports.resendConfirmationCodeLambdaHandler = async (event, context, callback) => {
    await userController.resendConfirmationCode(event, context, callback)
};
exports.loginLambdaHandler = async (event, context, callback) => {
    await userController.login(event, context, callback)
};

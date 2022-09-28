const userController = require('../controllers/user.controller');

exports.getUserInfoLambdaHandler = async (event, context, callback) => {
    await userController.getUserInfo(event, context, callback);
};

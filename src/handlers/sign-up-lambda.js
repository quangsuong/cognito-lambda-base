const userController = require('../controllers/user.controller');

exports.postConfirmationTrigger = async (event, context, callback) => {
    await userController.createUser(event, context, callback);
};

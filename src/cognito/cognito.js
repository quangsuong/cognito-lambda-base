const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = {
    UserPoolId: 'ap-southeast-1_N7inwdT11', // Your user pool id here
    ClientId: '4m4rhbfoti4ocbdrt583ghglci', // Your client id here
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
class Cognito {
    asyncAuthenticateUser(username, password) {
        const authenticationData = {
            Username: username,
            Password: password,
        };
        const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        const userData = {
            Username: username,
            Pool: userPool,
        };
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        return new Promise(function(resolve, reject) {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: resolve,
                onFailure: reject,
                newPasswordRequired: resolve,
            });
        });
    }
}

module.exports = new Cognito();




const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = {
    UserPoolId: process.env.USER_POOL_ID, // Your user pool id here
    ClientId: process.env.CLIENT_ID, // Your client id here
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

        return new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: resolve,
                onFailure: reject,
                newPasswordRequired: resolve,
            });
        });
    }

    logout(username, idToken, accessToken, refreshToken) {
        const userData = {
            Username: username,
            Pool: userPool,
        };
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        const session = new AmazonCognitoIdentity.CognitoUserSession({
            IdToken: new AmazonCognitoIdentity.CognitoIdToken({IdToken: idToken}),
            AccessToken: new AmazonCognitoIdentity.CognitoAccessToken({AccessToken: accessToken}),
            RefreshToken: new AmazonCognitoIdentity.CognitoRefreshToken({RefreshToken: refreshToken}),
        });
        cognitoUser.setSignInUserSession(session);
        return new Promise((resolve, reject) => {
            cognitoUser.globalSignOut({
                onSuccess: resolve,
                onFailure: reject,
            });
        });
    }

    refreshToken(refreshToken, username) {
        const RefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({RefreshToken: refreshToken});
        const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        const userData = {
            Username: username,
            Pool: userPool,
        };
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        return new Promise((resolve, reject) => {
            cognitoUser.refreshSession(RefreshToken, {
                onFailure: reject,
                onSuccess: resolve,
            });
        });
    }
}

module.exports = new Cognito();

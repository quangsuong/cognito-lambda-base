const appConfig = require('../config/app.config');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = {
    UserPoolId: appConfig.cognito.userPoolId, // Your user pool id here
    ClientId: appConfig.cognito.clientId, // Your client id here
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
            cognitoUser.refreshSession(RefreshToken, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    forgotPassword(username) {
        const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        const userData = {
            Username: username,
            Pool: userPool,
        };
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

        return new Promise((resolve, reject) => {
            cognitoUser.forgotPassword({
                onSuccess: resolve,
                onFailure: reject,
                inputVerificationCode: resolve
            })
        });
    }

    confirmPassword(username, verificationCode, newPassword) {
        const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        const userData = {
            Username: username,
            Pool: userPool,
        };
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

        return new Promise((resolve, reject) => {
            cognitoUser.confirmPassword(verificationCode, newPassword, {
                onSuccess: resolve,
                onFailure: reject,
            })
        });
    }

    changePassword(username, oldPassword, newPassword) {
        const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        const userData = {
            Username: username,
            Pool: userPool,
        };
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        const authenticationData = {
            Username: username,
            Password: oldPassword,
        };
        const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

        return new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: () => {
                    cognitoUser.changePassword(oldPassword, newPassword, (err, result) => {
                        if (err) return reject(err);
                        resolve(result);
                    })
                },
                onFailure: reject
            });
        });
    }
}

module.exports = new Cognito();

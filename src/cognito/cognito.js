const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = {
    UserPoolId: 'ap-southeast-1_N7inwdT11', // Your user pool id here
    ClientId: '4m4rhbfoti4ocbdrt583ghglci', // Your client id here
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

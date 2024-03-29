require('dotenv').config()
'use strict';

const appConfig = Object.freeze({
    env: {
        stage: process.env.NODE_ENV || 'dev',
    },
    cognito: {
        userPoolId: process.env.USER_POOL_ID,
        clientId: process.env.CLIENT_ID,
    },
    db: {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
});

module.exports = appConfig;

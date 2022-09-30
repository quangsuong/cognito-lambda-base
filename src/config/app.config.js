'use strict';

const appConfig = Object.freeze({
    env: {
        port: process.env.PORT || 8000,
        stage: process.env.NODE_ENV || 'dev',
    },
    encryption: {
        password: process.env.ENCRYPTION_PASS || '',
        salt: process.env.ENCRYPTION_SALT || '',
    },
    db: {
        host: process.env.DB_HOST || 'cognito-base.cqu8umnjvhry.ap-southeast-1.rds.amazonaws.com',
        database: process.env.DB_DATABASE || 'lambda',
        user: process.env.DB_USER || 'admin',
        password: process.env.DB_PASSWORD || 'kRLoyAIBX7mdz9S60EBv',
    },
});

module.exports = appConfig;

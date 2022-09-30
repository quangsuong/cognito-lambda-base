const {Sequelize} = require('sequelize');
const appConfig = require('./app.config');
const sequelize = new Sequelize(appConfig.db.database, appConfig.db.user, appConfig.db.password, {
    host: appConfig.db.host,
    dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    define: {
        freezeTableName: true,
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    sync: {force: true},
    pool: {
        max: 100,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: appConfig.env.stage === 'prod',
});

module.exports = sequelize;

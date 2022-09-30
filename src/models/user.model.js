const {DataTypes} = require('sequelize');
const BaseModel = require('./base.model');

class User extends BaseModel {
    init() {
        this.name = 'user';
        this.model = {
            sub: {
                type: DataTypes.STRING(200),
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING(1000),
            },
            id_token: {
                type: DataTypes.STRING(2000),
            },
            refresh_token: {
                type: DataTypes.STRING(2000),
            },
            access_token: {
                type: DataTypes.STRING(2000),
            },
        };
    }
}

const user = new User().instance();
(async () => {
    await user.sync({alter: true});
})();

module.exports = user;

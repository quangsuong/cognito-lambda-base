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
            verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        };
    }
}

module.exports = new User().instance();

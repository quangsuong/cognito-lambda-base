const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class BaseModel {
    constructor() {
        this.init();
        this.createSchema();
    }

    instance() {
        return sequelize.define(this.name, this.model, {
            timestamps: false,
            freezeTableName: true,
        });
    }

    createSchema() {
        const commonFields = {
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
            },
        };
        const idField = {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true,
            },
        };
        this.model = Object.assign(idField, this.model, commonFields);
    }
}

module.exports = BaseModel;

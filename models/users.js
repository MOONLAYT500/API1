('use strict');
const bcrypt = require('bcryptjs/dist/bcrypt');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        static associate(models) {
            // define association here
        }
    }
    users.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            nickname: DataTypes.STRING,
            password: {
                type: DataTypes.STRING,
                set(value) {
                    this.setDataValue('password', bcrypt.hashSync(value, 10));
                },
            },
        },
        {
            sequelize,
            modelName: 'users',
            createdAt: false,
            updatedAt: false,
        }
    );
    return users;
};

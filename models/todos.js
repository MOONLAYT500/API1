'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todos extends Model {
    static associate(models) {
    }
  }
  todos.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        unique: true,
      },
      done: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'todos',
      createdAt: true,
      updatedAt: false,
    }
  );
  return todos;
};

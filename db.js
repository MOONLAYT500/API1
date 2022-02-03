const { Sequelize, Op } = require('sequelize');

const sequelize = new Sequelize('todos', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const todos = sequelize.define(
  'todos',
  {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
    },
    done: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: false,
  }
);
todos.sync();



const errorsHandler = (errors) => {
  return errors.errors.map((err) => err.msg).join(', ');
};

module.exports = {
  todos,
  errorsHandler,
};

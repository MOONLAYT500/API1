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

const getTodos = (date, pp, page,filterBy = { [Op.or]: [true, false] }) =>
  todos.findAndCountAll({
    where: {
      done: filterBy,
    },
    order: [['createdAt', date]],
    offset:pp*(page-1),
    limit:pp
  });

const createTodo = (name, done) =>
  todos.create({
    name: name,
    done: done ?? false,
  });

const updateTodo = (id, name, done) => {
  todos.update(
    {
      name: name,
      done: done,
    },
    {
      where: {
        uuid: id,
      },
    }
  );
};

const deleteTodo = (id) => {
  todos.destroy({
    where: {
      uuid: id,
    },
  });
};

const errorsHandler = (errors) => {
  return errors.errors.map((err) => err.msg).join(', ');
};

module.exports = {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodos,
  errorsHandler,
};



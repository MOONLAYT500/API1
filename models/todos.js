const { Sequelize } = require('sequelize');

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


let recievedTodos= async(name,done) =>  await todos.create({
  name: name,
  done: done ?? false,
})





module.exports = {
  todos,
  recievedTodos
};

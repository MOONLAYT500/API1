const fs = require('fs');
const {dataBase} = require('./config')

const readAndParse = () => {
  return JSON.parse(fs.readFileSync(dataBase, 'utf8'));
};

const parseAndWrite = (todos) => {
  fs.writeFileSync(dataBase, JSON.stringify(todos));
};

const filter = (filterBy, order, pp, page) => {
  let filteredTodos = readAndParse();

  if (filterBy === 'done') {
    filteredTodos = filteredTodos.filter((todo) => todo.done == true);
  }

  if (filterBy === 'undone') {
    filteredTodos = filteredTodos.filter((todo) => todo.done == false);
  }

  
  if (order === 'asc') {
    filteredTodos.sort((a, b) => a.createdAt - b.createdAt);
  }
  if (order === 'desc') {
    filteredTodos.sort((a, b) => b.createdAt - a.createdAt);
  }

  const count = filteredTodos.length;
  const lastOnPage = page * pp;
  const firstOnPage = lastOnPage - pp;

  let todosOnPage = filteredTodos.slice(firstOnPage, lastOnPage);

  return { count: count, todos: todosOnPage };
};

module.exports = {readAndParse, parseAndWrite, filter}

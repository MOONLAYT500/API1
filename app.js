const express = require('express');
const req = require('express/lib/request');
const app = express();
const fs = require('fs');
const { v4 } = require('uuid');
const port = 3000;
const jsonParser = express.json();

app.use(express.static(__dirname + '/public'));

const filePath = 'todos.json';

// get all todos
app.get('/api/todos', (req, res) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const todos = JSON.parse(content);
  res.send(todos);
});


// add new todo
app.post('/api/todos', jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const todoName = req.body.name;
  const todoDone = req.body.done;
  let todo = { 
    uuid:v4(), 
    name: todoName, 
    done: todoDone, 
    createdAt:+new Date()
  };

  let data = fs.readFileSync(filePath, 'utf8');
  let todos = JSON.parse(data);

  todos.push(todo);
  data = JSON.stringify(todos);
  fs.writeFileSync('todos.json', data);
  res.send(todo);
});

// delete
app.delete('/api/todos/:id', (req, res) => {
  const id = req.params.id;
  let data = fs.readFileSync(filePath, 'utf8');
  let todos = JSON.parse(data);
  todos = todos.filter((todo) => todo.uuid !== id);
  data = JSON.stringify(todos);
  fs.writeFileSync('todos.json', data);
});
// patch


app.patch('/api/todos/:id', jsonParser, (req, res) => {
  const id = req.params.id;
  let data = fs.readFileSync(filePath, 'utf8');
  let todos = JSON.parse(data);
  let todo = todos.find((todo) => todo.uuid == id);
  todo.name = req.body.name
  todo.done = req.body.done
  index = todos.findIndex((todo) => todo.uuid == id);
  todos.splice(index, 1, todo);
  data = JSON.stringify(todos);
  fs.writeFileSync('todos.json', data);
  res.send(todo);
});

app.listen(port, () => {
  console.log(`${port}`);
});

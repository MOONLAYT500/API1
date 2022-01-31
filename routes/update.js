const express = require("express");
const router = express.Router();
const jsonParser = express.json();
const { readAndParse, parseAndWrite } = require('../utils');


router.patch('/todos/:id', jsonParser, (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  const todos = readAndParse();
  const todo = todos.find((todo) => todo.uuid == id);
  index = todos.findIndex((todo) => todo.uuid == id);
  todo.name = req.body.name;
  todo.done = req.body.done;
  todos.splice(index, 1, todo);
  parseAndWrite(todos)
  res.send('patched');
});

module.exports = router;
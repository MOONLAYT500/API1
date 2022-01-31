const express = require('express');
const router = express.Router();
const { readAndParse, parseAndWrite } = require('../utils');

router.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  let todos = readAndParse();
  todos = todos.filter((todo) => todo.uuid !== id);
  parseAndWrite(todos);
  res.send('deleted');
});

module.exports = router;

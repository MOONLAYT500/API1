const express = require('express');
const router = express.Router();
const { v4 } = require('uuid');
const jsonParser = express.json();
const mainURI = '/todos';
const { readAndParse, parseAndWrite} = require('../utils');


router.post(mainURI, jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  let todo = {
    uuid: v4(),
    name: req.body.name,
    done: req.body.done ?? false,
    createdAt: +new Date(),
  };
  let todos = readAndParse();
  todos.push(todo);
  parseAndWrite(todos);
  res.send('');
});

module.exports = router;

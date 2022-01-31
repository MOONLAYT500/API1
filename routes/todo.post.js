const express = require('express');
const router = express.Router();
const { v4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const jsonParser = express.json();
const { readAndParse, parseAndWrite, errorsHandler } = require('../utils');

router.post('/todos', jsonParser,
body('name').isLength({ min: 1 }).withMessage('length, lesser then one is not allowed'),
(req, res) => {

  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errorsHandler(errors) })
  }

  let todo = {
    uuid: v4(),
    name: req.body.name,
    done: req.body.done ?? false,
    createdAt: +new Date(),
  };
  let todos = readAndParse();
  todos.push(todo);
  parseAndWrite(todos);
  res.send('ok');
  } catch (e) {
    res.status(400).json({ message: e });
  }
});

module.exports = router;

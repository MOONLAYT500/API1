const express = require('express');
const router = express.Router();
const jsonParser = express.json();
const { body, param, validationResult } = require('express-validator');
const { updateTodo } = require('../db');

router.patch(
  '/todos/:id',
  jsonParser,
  param('id').notEmpty().withMessage('param "taskId" is empty'),
  body('name')
    .optional()
    .isLength({ min: 1 })
    .withMessage('length, lesser then one is not allowed'),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errorsHandler(errors) });
      }

      await updateTodo(req.params.id, req.body.name, req.body.done);

      res.send('patched');
    } catch (e) {
      return res.status(400).json({ message: e });
    }
  }
);

module.exports = router;

// const todos = readAndParse();
// const todo = todos.find((todo) => todo.uuid == id);
// index = todos.findIndex((todo) => todo.uuid == id);
// todo.name = req.body.name;
// todo.done = req.body.done;
// todos.splice(index, 1, todo);
// parseAndWrite(todos);

const express = require('express');
const router = express.Router();
const { readAndParse, parseAndWrite, errorsHandler } = require('../utils');
const { param, validationResult } = require('express-validator');

router.delete(
  '/todos/:id',
  param('id').notEmpty().withMessage('param "id" is empty'),
  (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errorsHandler(errors) });
      }
      
      const id = req.params.id;
      let todos = readAndParse();
      todos = todos.filter((todo) => todo.uuid !== id);
      parseAndWrite(todos);
      res.send('deleted');
    } catch (e) {
      return res.status(400).json({ message: e });
    }
  }
);

module.exports = router;

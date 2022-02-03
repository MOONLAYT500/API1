const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jsonParser = express.json();
const { errorsHandler } = require('../errorHandlers');
const {todos} = require('../models/todos')

router.post(
  '/todos',
  jsonParser,
  body('name')
    .isLength({ min: 1 })
    .withMessage('length, lesser then one is not allowed'),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errorsHandler(errors) });
      }

      await todos.create({
        name: req.body.name,
        done: req.body.done ?? false,
      })

      res.send('ok');
    } catch (e) {
      res.status(400).json({ message: e });
    }
  }
);

module.exports = router;

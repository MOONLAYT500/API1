const express = require('express');
const router = express.Router();
const { v4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const jsonParser = express.json();
const { createTodo, errorsHandler } = require('../db');

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

      await createTodo(req.body.name, req.body.body);

      res.send('ok');
    } catch (e) {
      res.status(400).json({ message: e });
    }
  }
);

module.exports = router;

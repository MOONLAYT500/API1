const express = require('express');
const router = express.Router();
const jsonParser = express.json();
const { body, param, validationResult } = require('express-validator');
const { todos } = require('../db');

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

      await todos.update(
        {
          name: req.body.name,
          done: req.body.done,
        },
        {
          where: {
            uuid:req.params.id,
          },
        }
      );

      res.send('patched');
    } catch (e) {
      return res.status(400).json({ message: e });
    }
  }
);

module.exports = router;


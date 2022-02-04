const express = require('express');
const router = express.Router();
const jsonParser = express.json();
const { body, param } = require('express-validator');
const { todos } = require('../models/index');
const { handleErrors } = require('../errorHandlers');

router.patch(
  '/todos/:id',
  jsonParser,
  param('id').notEmpty().withMessage('param "taskId" is empty'),
  body('name')
    .optional()
    .isLength({ min: 2 })
    .withMessage('length, lesser then one is not allowed'),
  handleErrors,
  async (req, res) => {
    try {
      const taskExists = await todos.findOne({
        where: { name: req.body.name },
      });
      if (taskExists) {
        return res.status(400).json('task with same name exists');
      }

      await todos.update(
        {
          name: req.body.name,
          done: req.body.done,
        },
        {
          where: {
            uuid: req.params.id,
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

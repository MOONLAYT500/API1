const express = require('express');
const router = express.Router();
const { param, validationResult } = require('express-validator');
const {errorsHandler } = require('../errorHandlers');
const {todos} = require('../models/todos')

router.delete(
  '/todos/:id',
  param('id').notEmpty().withMessage('param "id" is empty'),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errorsHandler(errors) });
      }
      
      await todos.destroy({
        where: {
          uuid: req.params.id,
        },
      });

      res.send('deleted');
    } catch (e) {
      return res.status(400).json({ message: e });
    }
  }
);

module.exports = router;

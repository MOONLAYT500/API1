const express = require('express');
const router = express.Router();
const jsonParser = express.json();
const { query, validationResult } = require('express-validator');
const { getTodos, errorsHandler } = require('../db');

router.get(
  '/todos',
  jsonParser,
  query('filterBy')
    .isIn(['', 'true', 'false'])
    .withMessage('query "filterBy" must be in array: ["all", "true", "false"]'),
  query('order')
    .isIn(['asc', 'desc'])
    .withMessage('query "order" must be in array: ["asc", "desc"]'),
  query('pp').isInt().withMessage('"pp" must be integer'),
  query('page')
    .isInt()
    .withMessage('"page" must be integer')
    .custom((value) => value >= 1)
    .withMessage('"page" cant be 0 '),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errorsHandler(errors) });
      }

      let filterBy;
      if (req.query.filterBy) {
        filterBy = req.query.filterBy;
      }

      const params = [
        req.query.order ?? 'desc',
        req.query.pp,
        req.query.page ?? 1,
        filterBy,
      ];
      console.log(params);
      let date = 'asc';
      let todos = await getTodos(...params);
      console.log(todos);
      res.send({ count: todos.length, todos: todos });
    } catch (e) {
      return res.status(400).json({ message: e });
    }
  }
);

module.exports = router;

const express = require('express');
const router = express.Router();
const {query, validationResult } = require('express-validator');
const { readAndParse, filter, errorsHandler } = require('../utils');

router.get(
  '/todos',
  query('filterBy')
    .isIn(['', 'done', 'undone'])
    .withMessage(
      'query "filterBy" must be in array: ["all", "done", "undone"]'
    ),
  query('order')
    .isIn(['asc', 'desc'])
    .withMessage('query "order" must be in array: ["asc", "desc"]'),
  query('pp').isInt().withMessage('"pp" must be integer'),
  query('page')
    .isInt()
    .withMessage('"page" must be integer')
    .custom((value) => value >= 1)
    .withMessage('"page" cant be 0 '),
  (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errorsHandler(errors) });
      }

      let todos = readAndParse();

      const params = [
        req.query.filterBy ?? 'all',
        req.query.order ?? 'desc',
        req.query.pp,
        req.query.page ?? 1,
      ];

      todos = filter(...params);
      res.send(todos);
    } catch (e) {
      return res.status(400).json({ message: e });
    }
  }
);

module.exports = router;

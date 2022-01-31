const express = require('express');
const router = express.Router();
const { readAndParse, filter } = require('../utils');

router.get('/todos', (req, res) => {
  let todos = readAndParse();

  const params = [
    req.query.filterBy ?? '',
    req.query.order ?? 'desc',
    req.query.pp,
    req.query.page ?? 1,
  ];

  todos = filter(...params);
  res.send(todos);
});

module.exports = router;


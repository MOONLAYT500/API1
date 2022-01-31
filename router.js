const express = require('express');
const router = express.Router();
const recursive = require('recursive-readdir-sync');
const getTodos = require('./routes/read');
const createTodo = require('./routes/create');
const updateTodo = require('./routes/update');
const deleteTodo = require('./routes/delete');



router.use('/', getTodos);
router.use('/', createTodo);
router.use('/', deleteTodo);
router.use('/', updateTodo);

// recursive(`${__dirname}`)
//     .forEach(file => router.use('/', require(file)))

module.exports = router;

// const recursive = require('recursive-readdir-sync');

// recursive(`${__dirname}/routes`)
//     .forEach(file => app.use('/', require(file)));

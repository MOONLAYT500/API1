const express = require('express');
const app = express();
const router = express.Router();
const getTodos = require('./read')
const createTodo = require('./create')
const updateTodo = require('./update');
const deleteTodo = require('./delete');


app.use(router, getTodos)
app.use('/api', createTodo)
app.use('/api',deleteTodo)
app.use('/api',updateTodo)

module.exports = router
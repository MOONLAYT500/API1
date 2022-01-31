const express = require('express');
const app = express();
const getTodos = require('./routes/read')
const createTodo = require('./routes/create')
const updateTodo = require('./routes/update');
const deleteTodo = require('./routes/delete');
const router = require('./router')

const port = 3000;
app.use('/api', router)
// app.use('/api', getTodos)
// app.use('/api', createTodo)
// app.use('/api',deleteTodo)
// app.use('/api',updateTodo)

app.listen(port, () => {
  console.log(`${port}`);
});

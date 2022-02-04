const { validationResult } = require('express-validator');

const handleErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res
      .status(400)
      .json({ message: errors.errors.map((error) => error.msg).join(', ') });
  next();
};

const taskExists = (todos, name) => {
  let result
  if(todos.findOne({
    where: {
      name: name,
    },
  })){ result =  res.status(400).json('task with same name exists')}
  return result
};

module.exports = {
  handleErrors,
  taskExists,
};


// if (existingTask) {
//   return res.status(400).json('task with same name exists');
// }
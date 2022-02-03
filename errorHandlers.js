const errorsHandler = (errors) => {
  return errors.errors.map((err) => err.msg).join(', ');
};

module.exports = {
  errorsHandler,
};

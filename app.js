const express = require('express');
const cors = require('cors');
const app = express();
const recursive = require('recursive-readdir-sync');
const { port, mainUri } = require('./config');

app.use(cors());
app.options('*', cors());

recursive(`${__dirname}/routes`).forEach((file) =>
  app.use(mainUri, require(file))
);

app.listen(port, () => {
  console.log(`${port}`);
});

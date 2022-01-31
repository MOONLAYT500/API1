const express = require('express');
const app = express();
const recursive = require('recursive-readdir-sync');
const {port,mainUri} = require('./config')

recursive(`${__dirname}/routes`)
    .forEach(file => app.use(mainUri, require(file)));

app.listen(port, () => {
  console.log(`${port}`);
});

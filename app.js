const express = require('express');
const cors = require('cors');
const app = express();
const recursive = require('recursive-readdir-sync');
const { basePort, mainUri } = require('./config/config');

app.use(cors());
app.options('*', cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello');
});

recursive(`${__dirname}/routes`).forEach((file) =>
    app.use(mainUri, require(file))
);

app.listen(basePort, () => {
    console.log(`${basePort}`);
});

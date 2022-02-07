const express = require('express');
const cors = require('cors');
const app = express();
const recursive = require('recursive-readdir-sync');
const { basePort, mainUri } = require('./config/config');
const res = require('express/lib/response');
const req = require('express/lib/request');
const auth = require('./auth');

app.use(cors());
app.options('*', cors());
app.use(express.json());

app.get('/api/welcome', auth, (req, res) => {
    res.status(200).send('Welcome');
});

recursive(`${__dirname}/routes`).forEach((file) =>
    app.use(mainUri, require(file))
);

app.listen(basePort, () => {
    console.log(`${basePort}`);
});

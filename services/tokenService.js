const jwt = require('jsonwebtoken');
const { token_key } = require('../config/config');

const createToken = (nickname, id) =>
    jwt.sign({ nickname: nickname, id: id }, token_key, {
        expiresIn: '2h',
    });

const verifyToken = (token) => jwt.verify(token, token_key);

module.exports = { createToken, verifyToken };

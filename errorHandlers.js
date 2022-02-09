const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { token_key } = require('./config/config');
const { users } = require('./models/index');

const handleErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({
            message: errors.errors.map((error) => error.msg).join(', '),
        });
    next();
};

const findUser = (nickname) =>
    users.findOne({
        where: { nickname },
    });

const createToken = (nickname, id) =>
    jwt.sign({ nickname: nickname, id: id }, token_key, {
        expiresIn: '2h',
    });

const verifyToken = (token) => jwt.verify(token, token_key);

const getId = (req) => {
    const headers = req.headers.authorization;
    const token = headers.split(' ')[1];
    const { id } = verifyToken(token);
    return id;
};

module.exports = {
    handleErrors,
    createToken,
    findUser,
    verifyToken,
    getId,
};

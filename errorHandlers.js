const { validationResult } = require('express-validator');
const res = require('express/lib/response');
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

const taskExists = (todos, name) => {
    let result;
    if (
        todos.findOne({
            where: {
                name: name,
            },
        })
    ) {
        result = res.status(400).json('task with same name exists');
    }
    return result;
};

const findUser = (nickname) =>
    users.findOne({
        where: { nickname },
    });

const createToken = (nickname, id) =>
    jwt.sign({ nickname:nickname, id:id }, token_key, {
        expiresIn: '2h',
    });

const verifyToken = (token) => jwt.verify(token, token_key);

module.exports = {
    handleErrors,
    taskExists,
    createToken,
    findUser,
    verifyToken
};

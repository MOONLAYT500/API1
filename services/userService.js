const { users } = require('../models/index');
const { verifyToken } = require('./tokenService');

const findUser = (nickname) =>
    users.findOne({
        where: { nickname },
    });

const getId = (req) => {
    const headers = req.headers.authorization;
    const token = headers.split(' ')[1];
    const { id } = verifyToken(token);
    return id;
};

module.exports = { findUser, getId };




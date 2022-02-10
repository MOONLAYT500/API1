const { validationResult } = require('express-validator');
const { verifyToken } = require('./tokenService');

const handleErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({
            message: errors.errors.map((error) => error.msg).join(', '),
        });
    next();
};

const authentificate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(400).send({ message: 'headers missing' });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res
                .status(403)
                .send('A token is required for authentication');
        }
        try {
            const decoded = verifyToken(token);
            req.user = decoded;
        } catch (e) {
            return res.status(401).send({ message: 'Invalid Token' });
        }
        return next();
    } catch (error) {}
};

module.exports = { handleErrors, authentificate };

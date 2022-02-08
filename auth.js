const { verifyToken } = require('./errorHandlers');

const authentificate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(400).send({ message: 'headers missing' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
    } catch (e) {
        return res.status(401).send('Invalid Token');
    }
    return next();
};

module.exports = authentificate;

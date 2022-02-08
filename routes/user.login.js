const express = require('express');
const router = express.Router();
const { createToken, findUser } = require('../errorHandlers');
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');
const { token_key } = require('../config/config');

router.post('/login', async (req, res) => {
    try {
        const { nickname, password } = req.body;
        if (!(nickname && password)) {
            return res
                .status(400)
                .send({ message: 'All fields need to be filled' });
        }

        const user = await findUser(nickname);
        if (!user) {
            return res.status(400).send({ message: 'user not found' });
        }
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ nickname, id: user.id }, token_key, {
                expiresIn: '2h',
            });
            return res.send({ token: token });
        }
        return res.status(400).send({ message: 'wrong password' });
    } catch (e) {
        return res.status(400).send({ message: 'error' });
    }
});

module.exports = router;

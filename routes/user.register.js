const express = require('express');
const router = express.Router();
const { findUser, createToken } = require('../errorHandlers');
const { users } = require('../models/index');

router.post('/register', async (req, res) => {
    try {
        const { nickname, password } = req.body;
        if (!(nickname && password)) {
            return res
                .status(400)
                .send({ message: 'All fields need to be filled ' });
        }

        const existingUser = await findUser(nickname);
        if (existingUser) {
            return res
                .status(400)
                .send({ message: 'User already exists,log in please' });
        }

        const user = await users.create({
            nickname,
            password,
        });
        console.log(user.id);
        const token = createToken(nickname, user.id);
        return res.status(204).send({ token: token });
    } catch (e) {
        return res.status(400).json({ message: 'error' });
    }
});

module.exports = router;

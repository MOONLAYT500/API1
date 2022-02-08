const express = require('express');
const router = express.Router();
const { createToken, findUser } = require('../errorHandlers');
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
            return res.status(400).send({ message: 'user already exists' });
        }

        const user = await users.create({
            nickname,
            password,
        });
        return res.send(user);
    } catch (e) {
        return res.status(400).json({ message: 'error' });
    }
});

module.exports = router;

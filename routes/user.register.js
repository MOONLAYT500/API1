const express = require('express');
const router = express.Router();
const { createToken, findUser } = require('../errorHandlers');
const { users } = require('../models/index');

router.post('/register', async (req, res) => {
    try {
        const { nickname, password } = req.body;
        if (!(nickname && password)) {
            res.status(400).send('All fields need to be filled ');
        }

        const existingUser = await findUser(nickname);
        if (existingUser) {
            throw 'nickname already exists';
        }

        const user = await users.create({
            nickname,
            password,
        });
        res.send(user);
    } catch (e) {
        return res.status(400).json({ message: String(e) });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { createToken, findUser } = require('../errorHandlers');
const { users } = require('../models/index');
const bcrypt = require('bcryptjs/dist/bcrypt');

router.post('/login', async (req, res) => {
    try {
        const { nickname, password } = req.body;

        if (!(nickname && password)) {
            res.status(400).send('All fields need to be filled');
        }

        const user = await findUser(nickname);

        if (user && bcrypt.compare(nickname + password, user.password)) {
            const token = createToken();
            return res.send({ token: token });
        }
        return res.status(400).send('Invalid creds');
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;

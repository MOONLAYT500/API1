const express = require('express');
const router = express.Router();
const { findUser } = require('../services/userService');
const { handleErrors } = require('../services/validationServise');
const { createToken } = require('../services/tokenService');
const bcrypt = require('bcryptjs/dist/bcrypt');
const { body } = require('express-validator');

router.post(
    '/login',
    body('nickname').notEmpty().withMessage('nickname is empty'),
    body('password').notEmpty().withMessage('password is empty'),
    handleErrors,
    async (req, res) => {
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
                const token = createToken(nickname, user.id);
                return res.status(200).send({ token: token });
            }
            return res.status(400).send({ message: 'wrong password' });
        } catch (e) {
            return res.status(400).send({ message: 'login error' });
        }
    }
);

module.exports = router;

const express = require('express');
const router = express.Router();
const { findUser } = require('../services/userService');
const { handleErrors } = require('../services/validationServise');
const { createToken } = require('../services/tokenService');
const { users } = require('../models/index');
const { body } = require('express-validator');

router.post(
    '/register',
    body('nickname').notEmpty().withMessage('nickname is empty'),
    body('password').notEmpty().withMessage('password is empty'),
    handleErrors,
    async (req, res) => {
        try {
            const { nickname, password } = req.body;
            if (!(nickname && password)) {
                return res
                    .status(400)
                    .send({ message: 'All fields need to be filled ' });
            }

            const existingUser = await findUser(nickname);
            console.log(1);
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
            return res.status(200).send({ token: token });
        } catch (e) {
            return res.status(400).send({ message: 'registration error' });
        }
    }
);

module.exports = router;

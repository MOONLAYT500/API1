const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { handleErrors, verifyToken } = require('../errorHandlers');
const { todos } = require('../models/index');

router.post(
    '/todo',
    body('name')
        .isLength({ min: 2 })
        .withMessage('length, lesser then one is not allowed'),
    handleErrors,
    async (req, res) => {
        try {
            const headers = req.headers.authorization;
            const token = headers.split(' ')[1];
            const { id } = verifyToken(token);
            const taskExists = await todos.findOne({
                where: { name: req.body.name },
            });
            if (taskExists) {
                return res.status(400).json('task with same name exists');
            }

            const todo = await todos.create({
                user_id: id,
                name: req.body.name,
                done: false,
            });

            res.send(todo);
        } catch (e) {
            res.status(400).json({ message: e });
        }
    }
);

module.exports = router;

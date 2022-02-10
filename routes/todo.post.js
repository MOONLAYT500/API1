const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { authentificate } = require('../services/validationServise');
const { handleErrors } = require('../services/validationServise');
const { getId } = require('../services/userService');
const { todos } = require('../models/index');

router.post(
    '/todo',
    body('done')
        .optional()
        .isBoolean()
        .withMessage('body "done" is not boolean'),
    body('name')
        .isLength({ min: 2 })
        .withMessage('length, lesser then one is not allowed'),
    handleErrors,
    authentificate,
    async (req, res) => {
        try {
            const id = getId(req);
            const taskExists = await todos.findOne({
                where: { user_id: id, name: req.body.name },
            });
            if (taskExists) {
                return res
                    .status(400)
                    .send({ message: 'task with same name exists' });
            }
            const todo = await todos.create({
                user_id: id,
                name: req.body.name,
                done: false,
            });
            res.send(todo);
        } catch (e) {
            res.status(400).json({ message: String(e) });
        }
    }
);

module.exports = router;

const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { todos } = require('../models/index');
const { authentificate } = require('../services/validationServise');
const { handleErrors } = require('../services/validationServise');
const { getId } = require('../services/userService');

const { Op } = require('sequelize');

router.patch(
    '/todo/:id',
    param('id').notEmpty().withMessage('param "taskId" is empty'),
    body('name')
        .optional()
        .isLength({ min: 2 })
        .withMessage('length, lesser then one is not allowed'),
    handleErrors,
    authentificate,
    async (req, res) => {
        try {
            const uuid = req.params.id;
            const { name, done } = req.body;
            const id = getId(req);

            const taskExists = await todos.findOne({
                where: {
                    user_id: id,
                    name: req.body.name,
                    [Op.not]: [{ uuid }],
                },
            });
            if (taskExists) {
                return (
                    res
                        .status(400)
                        // .send({ message: 'task with same name exists' });
                        .send({
                            message: 'task with same name exists',
                            todo: taskExists,
                        })
                );
            }

            const todo = await todos.update(
                { name, done },
                {
                    where: {
                        uuid: req.params.id,
                    },
                }
            );

            res.send(todo);
        } catch (e) {
            return res.status(400).send({ message: 'cannot patch' });
        }
    }
);

module.exports = router;

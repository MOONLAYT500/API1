const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { todos } = require('../models/index');
const { handleErrors } = require('../errorHandlers');
const { Op } = require('sequelize');

router.patch(
    '/todo/:id',
    param('id').notEmpty().withMessage('param "taskId" is empty'),
    body('name')
        .optional()
        .isLength({ min: 2 })
        .withMessage('length, lesser then one is not allowed'),
    handleErrors,
    async (req, res) => {
        try {
            const uuid = req.params.id
            const { name, done} = req.body;

            const taskExists = await todos.findOne({
                where: {
                    name: req.body.name,
                    [Op.not]: [{ uuid }],
                },
            });
            if (taskExists) {
                return res.status(400).json('task with same name exists');
            }

            await todos.update(
                {
                    name,
                    done,
                },
                {
                    where: {
                        uuid: req.params.id,
                    },
                }
            );

            res.send('patched');
        } catch (e) {
            return res.status(400).json({ message: String(e) });
        }
    }
);

module.exports = router;

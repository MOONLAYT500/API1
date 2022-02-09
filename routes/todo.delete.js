const express = require('express');
const router = express.Router();
const { param } = require('express-validator');
const { handleErrors } = require('../errorHandlers');
const { todos } = require('../models/index');

router.delete(
    '/todo/:id',
    param('id').notEmpty().withMessage('param "id" is empty'),
    handleErrors,
    async (req, res) => {
        try {
            await todos.destroy({
                where: {
                    uuid: req.params.id,
                },
            });

            res.send('deleted');
        } catch (e) {
            return res.status(400).send('cannot delete todo');
        }
    }
);

module.exports = router;

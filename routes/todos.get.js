const express = require('express');
const router = express.Router();
const { query } = require('express-validator');
const { handleErrors } = require('../errorHandlers');
const { todos } = require('../models/index');

router.get(
    '/todos',
    query('filterBy')
        .isIn(['', 'true', 'false'])
        .withMessage(
            'query "filterBy" must be in array: ["all", "true", "false"]'
        ),
    query('order')
        .isIn(['asc', 'desc'])
        .withMessage('query "order" must be in array: ["asc", "desc"]'),
    query('pp').isInt().withMessage('"pp" must be integer'),
    query('page')
        .isInt()
        .withMessage('"page" must be integer')
        .custom((value) => value >= 1)
        .withMessage('"page" cant be 0 '),
    handleErrors,
    async (req, res) => {
        try {
            let filterBy;
            if (req.query.filterBy) {
                filterBy = req.query.filterBy;
            }

            const pp = req.query.pp || 5;
            const order = req.query.order || 'desc';
            const page = req.query.page || 1;

            let recievedTodos = await todos.findAndCountAll({
                where: !filterBy ? {} : { done: filterBy },
                order: [['createdAt', order]],
                offset: pp * (page - 1),
                limit: pp,
            });

            res.send({ count: recievedTodos.length, todos: recievedTodos });
        } catch (e) {
            return res.status(400).json({ message: e });
        }
    }
);

module.exports = router;

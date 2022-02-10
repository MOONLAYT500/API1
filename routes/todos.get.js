const express = require('express');
const router = express.Router();
const { query } = require('express-validator');
const { todos } = require('../models/index');
const { authentificate } = require('../services/validationServise');
const { handleErrors } = require('../services/validationServise');
const { getId } = require('../services/userService');

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
    authentificate,
    async (req, res) => {
        try {
            const id = getId(req);

            const filterBy = req.query.filterBy;
            const pp = req.query.pp || 5;
            const order = req.query.order || 'desc';
            const page = req.query.page || 1;

            let recievedTodos = await todos.findAndCountAll({
                where: !filterBy
                    ? { user_id: id }
                    : { user_id: id, done: filterBy },
                order: [['createdAt', order]],
                offset: pp * (page - 1),
                limit: pp,
            });

            res.send({ count: recievedTodos.length, todos: recievedTodos });
        } catch (e) {
            return res.status(400).send({ message: e });
        }
    }
);

module.exports = router;

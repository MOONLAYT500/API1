const express = require('express');
const router = express.Router();
const { users } = require('../models/index');


router.delete('/register/:id', async (req, res) => {
    try {
        await users.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.send('deleted');
    } catch (e) {
        return res.status(400).json({ message: String(e) });
    }
});

module.exports = router;

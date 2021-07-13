const router = require("express").Router();
const { UserModel } = require("../models");


/*
========================================================================================================
DELETE USER
========================================================================================================
*/

router.delete('/user/:id', async(req, res) => {
    const userId = req.user.id;

    try {
        const query = {
            where: {
                id: userId
            }
        };

        await UserModel.destroy(query);
        res.status(200).json({ message: 'Account has been removed.' });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;
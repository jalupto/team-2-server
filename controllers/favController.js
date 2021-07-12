const Express = require('express');
const router = Express.Router();
let validateToken = require("../middleware/validate-token");
const { FavModel } = require("../models");



/*
=========================================
Update log
=========================================
*/

router.put('/:id', validateToken, async(req, res) => {
    const { city, hotel, hot_spot, restaurant, activity } = req.body.fav;
    const favId = req.params.id;
    const userId = req.user.id;

    const query = {
        where: {
            id: favId,
            owner_id: userId
        }
    };

    console.log(favId, userId);

    const updatedFav = {
        city: city,
        hotel: hotel,
        hot_spot: hot_spot,
        restaurant: restaurant,
        activity: activity
    };

    try {
        const update = await FavModel.update(updatedFav, query);
        res.status(200).json({
            message: 'Fav entry updated.',
            update
        });
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong!',
            error: err
        });
    }
});

/*
=========================================
Delete log
=========================================
*/

router.delete('/:id', validateToken, async(req, res) => {
    const userId = req.user.id;
    const favId = req.params.id;

    try {
        const query = {
            where: {
                id: favId,
                owner_id: userId
            }
        };

        await FavModel.destroy(query);
        res.status(200).json({ message: 'Fav entry removed.' });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;
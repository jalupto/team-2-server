const Express = require('express');
const router = Express.Router();
let validateToken = require("../middleware/validate-token");
const { FavModel } = require("../models");

/*
=========================================
Create Favorite by Cherron
=========================================
*/
router.post("/", validateToken, async (req, res) => {
    const { city, hotel, restaurant, activity } = req.body.favs;
    const userId = req.user.id;
    const favEntry = {
        city, 
        hotel,
        restaurant,
        activity,
        owner_id: userId
    }
    try {
        const newFav = await FavModel.create(favEntry);
        res.status(200).json({
            message: "Favorite saved!",
            newFav
        });
    } catch(err) {
        res.status(500).json({
            error: err,
            message: "Unable to create favorite."
        });
    }
})

/*
=========================================
View User Favorite by Cherron
=========================================
*/

router.get("/", validateToken, async (req, res) => {
    const { id } = req.user;

    try {
        const favByUser = await FavModel.findAll({
            where: {
                owner_id: id
            },
        });
        res.status(200).json(favByUser);
    } catch (err) {
        res.status(500).json({ 
            error:err,
            message: "Unable to retrieve favorites."
        });
    }
});

/*
=========================================
Update Favorite by Jared
=========================================
*/

router.put('/:id', validateToken, async(req, res) => {
    const { city, hotel, restaurant, activity } = req.body.favs;
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
Delete Favorite by Jared
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
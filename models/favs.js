const { DataTypes } = require("sequelize");
const db = require('../db');

const Favorites = db.define("favs", {
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hotel: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    restaurant: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    activity: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    owner_id: {
        type: DataTypes.INTEGER
    }
});

module.exports = Favorites;
const { DataTypes } = require("sequelize");
const db = require('../db');

const Favorites = db.define('fav', {
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hotel: {
        type: DataTypes.STRING,
        allowNull: true
    },
    hot_spot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    restaurant: {
        type: DataTypes.STRING,
        allowNull: true
    },
    events: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Favorites;
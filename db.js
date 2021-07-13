const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    "postgres://postgres:97c2dd0705204ed4a3e3fb5ef76979ce@localhost:5432/team-2-server"
);

module.exports = sequelize;

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    "postgres://postgres:/*Insert your Postgres password here*/@localhost:5432/team-2-server"
);

module.exports = sequelize;


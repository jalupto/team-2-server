const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    `postgres://postgres:${process.env.POSTGRES_PWD}@localhost:5432/team-2-server`
);

module.exports = sequelize;


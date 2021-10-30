const {Sequelize} = require('sequelize');

const db = new Sequelize("postgres://postgres:46acef601cb74c059efd3b9e39e23e9e@localhost:5432/animal-server");

module.exports = db;
const {DataTypes} = require('sequelize');
const db = require('../db');

const Animal = db.define('animal', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  legNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  predator: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Animal;
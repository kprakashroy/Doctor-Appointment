const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Appointment', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;

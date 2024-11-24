const sequelize = require('../config/database');
const Appointment = require('./Appointment');

(async () => {
  await sequelize.sync({ force: false });
  console.log('Database synchronized');
})();

module.exports = { Appointment };

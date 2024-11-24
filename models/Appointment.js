const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Appointment = sequelize.define('Appointment', {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  timeSlot: { type: DataTypes.STRING, allowNull: false },
  doctorName: { type: DataTypes.STRING, allowNull: false },
}, {
  timestamps: true,
});

module.exports = Appointment;

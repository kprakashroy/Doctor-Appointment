const { Appointment } = require('../models');

// Create an appointment
exports.createAppointment = async (req, res) => {
  try {
    const { firstName, lastName, email, timeSlot, doctorName } = req.body;

    const appointmentExists = await Appointment.findOne({ where: { timeSlot, doctorName } });
    if (appointmentExists) return res.status(400).json({ message: 'Time slot already booked' });

    const appointment = await Appointment.create({ firstName, lastName, email, timeSlot, doctorName });
    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error booking appointment', error });
  }
};

// Get details of an appointment by email
exports.getAppointmentByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const appointment = await Appointment.findOne({ where: { email } });
    if (!appointment) return res.status(404).json({ message: 'No appointment found' });

    res.status(200).json({ appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointment', error });
  }
};

// Get all appointments for a doctor
exports.getAppointmentsByDoctor = async (req, res) => {
  try {
    const { doctorName } = req.params;
    const appointments = await Appointment.findAll({ where: { doctorName } });
    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};

// Cancel an appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const { email, timeSlot } = req.body;

    const appointment = await Appointment.destroy({ where: { email, timeSlot } });
    if (!appointment) return res.status(404).json({ message: 'No appointment found' });

    res.status(200).json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling appointment', error });
  }
};

// Modify an appointment
exports.modifyAppointment = async (req, res) => {
  try {
    const { email, originalTimeSlot, newTimeSlot } = req.body;

    const appointment = await Appointment.findOne({ where: { email, timeSlot: originalTimeSlot } });
    if (!appointment) return res.status(404).json({ message: 'No appointment found' });

    const newSlotExists = await Appointment.findOne({ where: { timeSlot: newTimeSlot, doctorName: appointment.doctorName } });
    if (newSlotExists) return res.status(400).json({ message: 'New time slot is already booked' });

    appointment.timeSlot = newTimeSlot;
    await appointment.save();

    res.status(200).json({ message: 'Appointment modified successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error modifying appointment', error });
  }
};

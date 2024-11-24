const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/book', appointmentController.createAppointment);
router.get('/details/:email', appointmentController.getAppointmentByEmail);
router.get('/doctor/:doctorName', appointmentController.getAppointmentsByDoctor);
router.delete('/cancel', appointmentController.cancelAppointment);
router.put('/modify', appointmentController.modifyAppointment);

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/appointments', appointmentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const heartRateController = require('./controllers/heartRateController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '50mb' }));  // Set the limit as per your requirement
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));  // Increase for URL encoded data if necessary

// Routes
app.post('/api/heart-rate', heartRateController.processHeartRate);

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
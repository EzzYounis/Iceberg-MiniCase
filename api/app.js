require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/database');
const models = require('./models'); // Import all models and associations

app.use(express.json());

//Route for test 
app.get('/', (req, res) => {
    res.send('API is running');
});

// Connect to DB and start server
const PORT = process.env.PORT || 3000;
db.authenticate()
  .then(() => {
    console.log('Database connected successfully...');
    // Sync all models with the database (creates tables if they do not exist)
    db.sync({ alter: true })
      .then(() => {
        console.log('All models were synchronized successfully.');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
      })
      .catch(syncErr => {
        console.error('Model synchronization error:', syncErr);
      });
  })
  .catch(err => console.error('DB connection error:', err));

module.exports = app;

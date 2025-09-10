require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/database');

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
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB connection error:', err));

module.exports = app;

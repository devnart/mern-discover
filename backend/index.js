const express = require('express');
const env = require('dotenv').config();
const { errorHandler } = require('./Middleware/ErrorMiddleware');
const colors = require('colors');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', require('./router'));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})
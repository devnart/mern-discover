const express = require('express');
const env = require('dotenv').config();
const { errorHandler } = require('./Middleware/ErrorMiddleware');
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', require('./router'));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})
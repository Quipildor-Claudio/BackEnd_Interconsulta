require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongoString = 'mongodb://localhost/api_interconsulta';
const morgan = require('morgan');
const test_routes = require('./server/routes/routes');

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use('/api',test_routes);


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const logRoutes = require('./api/routes/logs');
const userRoutes = require('./api/routes/user');
const projectRoutes = require('./api/routes/projects');

mongoose.set('strictQuery', false);
mongoose.connect(
    'mongodb+srv://' +
    process.env.MONGO_ATLAS_US + ':' +
    process.env.MONGO_ATLAS_PW +
    process.env.MONGO_ATLAS_DB
);

app.use(cors());

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use('/logs', logRoutes);
app.use('/user', userRoutes);
app.use('/projects', projectRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found.');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
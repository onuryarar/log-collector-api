const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const logRoutes = require('./api/routes/logs');

mongoose.connect(
    'mongodb+srv://' +
    process.env.MONGO_ATLAS_US + ':' +
    process.env.MONGO_ATLAS_PW +
    process.env.MONGO_ATLAS_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3005',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

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
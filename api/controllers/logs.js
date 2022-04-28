const mongoose = require('mongoose');

const Log = require('../models/log');

exports.capture = (req, res, next) => {
    const siteKey = req.query.sitekey;

    if (siteKey) {
        const log = new Log({
            _id: new mongoose.Types.ObjectId(),
            sitekey: siteKey,
            ...req.body
        });
        Log.create(log)
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Successful'
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500);
            });
    } else {
        res.status(400).json({
            message: 'sitekey is required.'
        });
    }
};

exports.get_all = (req, res, next) => {
    Log.find()
        .select('-__v')
        .exec()
        .then(result => {
            const logs = {
                count: result.length,
                log: result.map(res => {
                    return {
                        ...res._doc,
                        request: {
                            type: 'GET',
                            url: process.env.URL + '/logs/' + res._id
                        }
                    };
                }),
            };
            res.status(200).json(logs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.get_single = (req, res, next) => {
    const id = req.params.logId;
    Log.findById(id)
        .select('-__v')
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: 'Log not found.'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.get_filtered = (req, res, next) => {
    Log.find(req.body)
        .select('-__v')
        .exec()
        .then(result => {
            if (result.length) {
                const logs = {
                    count: result.length,
                    log: result.map(res => {
                        return {
                            ...res._doc,
                            request: {
                                type: 'GET',
                                url: process.env.URL + '/logs/' + res._id
                            }
                        };
                    }),
                };
                res.status(200).json(logs);
            } else {
                res.status(404).json({
                    message: 'Log not found.'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};
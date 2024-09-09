const mongoose = require('mongoose');

const Project = require('../models/project');

module.exports = (req, res, next) => {
    const siteKey = req.query.sitekey;

    Project.findOne({ sitekey: siteKey })
        .select('active')
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: 'Project not found.'
                });
            }

            if (!result.active) {
                return res.status(406).json({
                    message: 'Project is not active. Log will not be processed.'
                });
            }

            next();
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};
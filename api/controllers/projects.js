const mongoose = require('mongoose');

const Project = require('../models/project');

exports.create = (req, res, next) => {
    Project.exists({ name: req.body.name })
        .then(found => {
            if (found) {
                res.status(409).json({
                    message: "Project already exists"
                });
            }
            else {
                const siteKey = crypto.randomUUID().replaceAll("-", "");

                const project = new Project({
                    _id: new mongoose.Types.ObjectId(),
                    sitekey: siteKey,
                    name: req.body.name
                });
                project.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'Successful',
                            sitekey: siteKey
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        });
};

exports.get_all = (req, res, next) => {
    Project.find()
        .select('-__v')
        .exec()
        .then(result => {
            const projects = {
                count: result.length,
                project: result.map(res => {
                    return {
                        ...res._doc
                    };
                }),
            };
            res.status(200).json(projects);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.get_single = (req, res, next) => {
    const id = req.params.projectId;
    Project.findById(id)
        .select('-__v')
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: 'Project not found.'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};
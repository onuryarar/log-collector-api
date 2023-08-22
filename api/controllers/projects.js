const Project = require('../models/project');

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
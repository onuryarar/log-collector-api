const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.register = (req, res, next) => {
    User.exists({ email: req.body.email })
        .then(found => {
            if (found) {
                res.status(409).json({
                    message: "Mail already exists"
                })
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({
                            error: err
                        });
                    }
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            surname: req.body.surname
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'Successful'
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
}

exports.login = (req, res, next) => {
    User.find({ email: req.body.email }).exec()
        .then(user => {
            if (!user.length) {
                return res.status(401).json({
                    message: 'Unauthorized'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, process.env.JWT_KEY, {
                        expiresIn: '1d'
                    })
                    return res.status(200).json({
                        message: 'Authorized',
                        token: token
                    })
                }
                res.status(401).json({
                    message: 'Unauthorized'
                })
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}
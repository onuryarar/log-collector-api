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
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err);
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
                                req.log({
                                    action: 'user.register',
                                    userId: user._id
                                });

                                res.status(201).json({
                                    message: 'Successful'
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }).exec()
        .then(async user => {
            if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }

            const token = jwt.sign({
                email: user.email,
                userId: user._id
            }, process.env.JWT_KEY, {
                expiresIn: '1d'
            });

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict'
            })

            req.log({
                action: 'user.login',
                userId: user._id
            });

            return res.status(200).json({
                message: 'Authorized'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.logout = (req, res, next) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    })

    req.log({
        action: 'user.logout',
        userId: req.user._id
    });

    res.json({
        message: 'Logged Out'
    });
}
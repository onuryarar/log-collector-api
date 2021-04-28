const Joi = require('joi');

exports.register = (req, res, next) => {
    const registerSchema = Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        name: Joi.string().required(),
        surname: Joi.string().required()
    });
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            error: error.message
        });
    }
    next();
};

exports.login = (req, res, next) => {
    const loginSchema = Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            error: error.message
        });
    }
    next();
};
const Joi = require('joi');
const { Error } = require('../../commons/errorHandling');
const validateActivateUser = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .trim()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'vn'] } })
            .required(),
        otp: Joi.number().min(4).required(),
    });
    const { email, otp } = req.body;
    try {
        await schema.validateAsync({ email, otp });
        next();
    } catch (e) {
        next(new Error(400, e.details[0].message));
    }
};

const validateResendToken = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .trim()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'vn'] } })
            .required(),
    });
    try {
        await schema.validateAsync({ email: req.body.email });
        next();
    } catch (e) {
        next(new Error(400, e.details[0].message));
    }
};

const validateForgotPassword = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .trim()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'vn'] } })
            .required(),
        activeCode: Joi.number().min(4).required(),
        password: Joi.string().trim().min(5).required(),
    });
    const { email, activeCode, password } = req.body;
    try {
        await schema.validateAsync({ email, activeCode, password });
        next();
    } catch (e) {
        next(new Error(400, e.details[0].message));
    }
};

const validateChangePassword = async (req, res, next) => {
    const schema = Joi.object({
        password: Joi.string().trim().min(5).required(),
        newPassword: Joi.string().trim().min(5).required(),
    });
    const { password, newPassword } = req.body;
    try {
        await schema.validateAsync({ password, newPassword });
        next();
    } catch (e) {
        next(new Error(400, e.details[0].message));
    }
};

const validateUpdateUser = async (req, res, next) => {
    const schema = Joi.object({
        dob: Joi.date(),
        fullname: Joi.string().trim().min(1).max(30),
    });
    const { dob, fullname } = req.body;
    try {
        await schema.validateAsync({ dob, fullname });
        next();
    } catch (e) {
        next(new Error(400, e.details[0].message));
    }
};

module.exports = {
    validateActivateUser,
    validateChangePassword,
    validateForgotPassword,
    validateResendToken,
    validateUpdateUser,
};

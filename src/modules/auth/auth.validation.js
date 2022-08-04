const Joi = require('joi');
const { Error } = require('../../commons/errorHandling');
const validateRegister = async (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().trim().min(1).max(30).required(),
        password: Joi.string().trim().min(5).required(),
        email: Joi.string()
            .trim()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'vn'] } })
            .required(),
        fullname: Joi.string(),
        dob: Joi.date(),
    });
    const { username, password, email, fullname, dob } = req.body;
    try {
        await schema.validateAsync({
            username,
            password,
            email,
            fullname,
            dob,
        });
        next();
    } catch (e) {
        next(new Error('400', e.details[0].message));
    }
};

const validateLogin = async (req, res, next) => {
    const schema = Joi.object({
        account:
            Joi.string().trim() ||
            Joi.string()
                .trim()
                .email({
                    minDomainSegments: 2,
                    tlds: { allow: ['com', 'vn'] },
                }),
        password: Joi.string().trim().min(5).required(),
    });
    const { account, password } = req.body;
    try {
        await schema.validateAsync({ account, password });
        next();
    } catch (e) {
        next(new Error('400', e.details[0].message));
    }
};

module.exports = { validateRegister, validateLogin };

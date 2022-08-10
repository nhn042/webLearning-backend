const Joi = require('joi');
const { Error } = require('../../commons/errorHandling');
const validateAddUserAlbum = async (req, res, next) => {
    const schema = Joi.object({
        account: Joi.string().trim().min(1).required(),
        albumname: Joi.string().min(1).required(),
    });
    const { account, albumname } = req.body;
    try {
        await schema.validateAsync({ account, albumname });
        next();
    } catch (e) {
        next(new Error(400, e.details[0].message));
    }
};

const validateInputAccount = async (req, res, next) => {
    const schema = Joi.object({
        account: Joi.string().trim().min(1).required(),
    });
    const { account } = req.body;
    try {
        await schema.validateAsync({ account });
        next();
    } catch (e) {
        next(new Error(400, e.details[0].message));
    }
};

module.exports = { validateAddUserAlbum, validateInputAccount };

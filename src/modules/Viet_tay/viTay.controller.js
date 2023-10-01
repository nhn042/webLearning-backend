// lấy data và tiền xử lý rồi gửi tới service
const viTayService = require('./viTay.service');
const { Error } = require('../../commons/errorHandling');

const getAll = async (req, res) => {
    try {
        return await viTayService.getAll();
    } catch (err) {
        throw err;
    }
};

const translateTayToViet = async (req, res) => {
    const query = req.query;
    console.log(query);
    try {
        const word = await viTayService.translate(query.query, 'tay');
        console.log('word', word);
        if (word === query.query) {
            return res.status(400).send({
                data: 'không lấy được data',
                success: false,
                message: 'Lấy data thất bại',
            });
        }
        return res.status(200).send({
            data: word,
            success: true,
            message: 'Lấy data thành công',
        });
    } catch (err) {
        throw err;
    }
};

const translateVietToTay = async (req, res) => {
    const query = req.query;
    console.log(33333);
    console.log(query.query)
    console.log(1111);
    try {
        return await viTayService.translate(query.query, 'viet');
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getAll,
    translateTayToViet,
    translateVietToTay,
};
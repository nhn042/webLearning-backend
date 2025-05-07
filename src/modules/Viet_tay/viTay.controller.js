// lấy data và tiền xử lý rồi gửi tới service
const viTayService = require('./viTay.service');
const { Error } = require('../../commons/errorHandling');

// const async create() {
//     const dataVi = await this.vietRepo.test();
//     const dataTay = await this.tayRepo.test();
//     let idViTest: any = '';
//     let wordVi: any = '';
//     await dataVi.forEach(async (value, index) => {
//         if (value.word === wordVi) {
//             const obj = {
//                 idVi: idViTest,
//                 idTay: dataTay[index]._id,
//             };
//             await this.viTayRepo.create(<viTayDocument>obj);
//             await this.vietRepo.delete(value._id);
//         } else {
//             const obj = {
//                 idVi: value._id,
//                 idTay: dataTay[index]._id,
//             };
//             idViTest = value._id;
//             wordVi = value.word;
//             await this.viTayRepo.create(<viTayDocument>obj);
//         }
//     });
// }

const getAll = async (req, res) => {
    try {
        const allWord = await viTayService.getAll();
        if (allWord.length === 0) {
            return res.status(400).send({
                data: 'không lấy được data',
                success: false,
                message: 'Lấy data thất bại',
            });
        }
        return res.status(200).send({
            data: allWord,
            success: true,
            message: 'Lấy data thành công',
        });
    } catch (err) {
        throw err;
    }
};

const translateSequenceTextVietToTay = async (req, res) => {
    const query = req.query;
    console.log(query.query);
    try {
        const word = await viTayService.translate(query.query, 'viet');
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
    const { query } = req.query;
    if (!query) {
        return res.status(400).send({
            data: 'không lấy được data',
            success: false,
            message: 'Lấy data thất bại',
        });
    }
    let translateWord = await viTayService.getVietToTay(query);
    translateWord = translateWord.map((value) => value.idTay.word);
    if (translateWord.length !== 0) {
        return res.status(200).send({
            data: translateWord,
            success: true,
            message: 'Lấy data thành công',
        });
    }
    const result = await viTayService.translateSequenceTextVietnamToTay(query);
    return res.status(200).send({
        data: result.listSequenceText,
        success: true,
        message: 'Lấy data thành công',
    });
};

const translateTayToViet = async (req, res) => {
    const { query } = req.query;
    let translateWord = await viTayService.getTayToViet(query);
    translateWord = translateWord.map((value) => value.idVi.word);
    if (translateWord.length !== 0) {
        return res.status(200).send({
            data: translateWord,
            success: true,
            message: 'Lấy data thành công',
        });
    }
    const result = await viTayService.translateSequenceTextTayToVietnam(query);
    console.log('result', result);
    return res.status(200).send({
        data: result.listSequenceText,
        success: true,
        message: 'Lấy data thành công',
    });
};

module.exports = {
    getAll,
    translateTayToViet,
    translateVietToTay,
    translateSequenceTextVietToTay,
};

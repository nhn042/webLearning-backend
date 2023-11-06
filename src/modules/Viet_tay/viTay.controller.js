// lấy data và tiền xử lý rồi gửi tới service
const viTayService = require('./viTay.service');
const { Error } = require('../../commons/errorHandling');

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

// const translateTayToViet = async (req, res) => {
//     const query = req.query;
//     try {
//         const word = await viTayService.translate(query.query, 'tay');
//         if (word === query.query) {
//             return res.status(400).send({
//                 data: 'không lấy được data',
//                 success: false,
//                 message: 'Lấy data thất bại',
//             });
//         }
//         return res.status(200).send({
//             data: word,
//             success: true,
//             message: 'Lấy data thành công',
//         });
//     } catch (err) {
//         throw err;
//     }
// };

// const translateVietToTay = async (req, res) => {
//     const query = req.query;
//     console.log(query.query);
//     try {
//         const word = await viTayService.translate(query.query, 'viet');
//         console.log('word', word);
//         if (word === query.query) {
//             return res.status(400).send({
//                 data: 'không lấy được data',
//                 success: false,
//                 message: 'Lấy data thất bại',
//             });
//         }
//         return res.status(200).send({
//             data: word,
//             success: true,
//             message: 'Lấy data thành công',
//         });
//     } catch (err) {
//         throw err;
//     }
// };

const translateSequenceTextVietToTay = async (req, res) => {
    const query = req.query;
    console.log(query.query);
    try {
        const word = await viTayService.translate(query.query, 'viet');
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
    console.log('translateWord', translateWord);
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
    console.log('translateWord', translateWord);
    if (translateWord.length !== 0) {
        return res.status(200).send({
            data: translateWord,
            success: true,
            message: 'Lấy data thành công',
        });
    }

    return viTayService.translateSequenceTextTayToVietnam(query);
};

module.exports = {
    getAll,
    translateTayToViet,
    translateVietToTay,
    translateSequenceTextVietToTay,
};

const viTayModel = require('./viTay.module');

const translate = async (wordSearch, language) => {
    try {
        if (language === 'viet') {
            const tayWords = await viTayModel
                .find()
                .lean()
                .populate({
                    path: 'idVi',
                    match: { word: wordSearch },
                })
                .populate({
                    path: 'idTay',
                })
                .exec();
            const word = tayWords.filter((tayWord) => {
                return tayWord.idVi;
            });
            return word;
        }
        wordSearch = `${wordSearch} `;
        const vietWords = await viTayModel
            .find()
            .lean()
            .populate({
                path: 'idTay',
                match: { word: wordSearch },
            })
            .populate({
                path: 'idVi',
            })
            .exec();
        const word = vietWords.filter((vietWord) => {
            return vietWord.idTay;
        });
        return word;
    } catch (err) {
        throw err;
    }
};

const getAllVietTay = async () => {
    return await viTayModel
        .find()
        .lean()
        .populate({
            path: 'idVi',
        })
        .populate({
            path: 'idTay',
        })
        .exec();
};

const getTaytoViet = async (wordSearch) => {
    const vietWords = await viTayModel
        .find({})
        .populate({
            path: 'idTay',
            match: { word: wordSearch },
        })
        .populate('idVi')
        .exec();
    return vietWords.filter((vietWord) => {
        return vietWord.idTay;
    });
};

module.exports = {
    translate,
    getAllVietTay,
    getTaytoViet,
};

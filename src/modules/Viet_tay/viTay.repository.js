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
    wordSearch = `${wordSearch} `;
    const vietWords = await viTayModel
        .find({})
        .populate({
            path: 'idTay',
            match: { word: wordSearch },
            select: 'word',
        })
        .populate('idVi', 'word')
        .exec();
    return vietWords.filter((vitay) => {
        return vitay.idTay;
    });
};

const getViettoTay = async (wordSearch) => {
    console.log('wordSearch', wordSearch);
    const tayWords = await viTayModel
        .find({})
        .populate({
            path: 'idVi',
            match: { word: wordSearch },
            select: 'word',
        })
        .populate('idTay', 'word')
        .exec();
    return tayWords.filter((vitay) => {
        return vitay.idVi;
    });
};

module.exports = {
    translate,
    getAllVietTay,
    getTaytoViet,
    getViettoTay,
};
